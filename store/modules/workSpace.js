import XEUtils from 'xe-utils';
import apiServer from '@/api/work-space.js';
import {
	mapEquimentOptions,
	mapLayerOptions
} from '@/pages/work-space/data.js';

const state = {
	monitorList: [], // 监测点列表
	equimentList: [], // 工况列表
}
const getters = {
	monitorList: state => state.monitorList,
	equimentList: state => state.equimentList,
}
const mutations = {
	GET_MONITOR_LIST: (state, monitorList) => {
		state.monitorList = monitorList
	},
	GET_EQUIMENT_LIST: (state, equimentList) => {
		state.equimentList = equimentList
	},
}
const actions = {
	GetMapMonitorMarkerList(context) {
		// 获取监测点列表
		const data = {
			currentPage: 1,
			pageSize: 10000,
			sort: 'asc',
			sidx: '',
			menuId: '415496982170173957'
		};
		context.dispatch('createMarkerClusterList', {
			options: mapLayerOptions,
			listName: 'monitorList',
			data
		});
	},
	GetMapEquimentMarkerList(context) {
		// 获取工况列表 工况和远控是相同设备
		context.dispatch('createMarkerClusterList', {
			options: mapEquimentOptions,
			listName: 'equimentList',
		});
	},
	async GetFieldPestInfoList(context) {
		try {
			// 获取监测点 - 田间虫害列表 用于新增田间虫害数据时，单独更新监测列表
			const monitorList = context.state.monitorList.filter(v => v.markerType !== "insect")
			const data = {
				currentPage: 1,
				pageSize: 10000,
				sort: 'asc',
				sidx: '',
				menuId: '415496982170173957'
			};
			let list = []
			const response = await apiServer.getFieldPestInfoListApi(data)
			if (response.code === 200) {
				list = createMarker(response, mapLayerOptions[5], 5)
			}
			context.commit('GET_MONITOR_LIST', [...monitorList, ...list])
		} catch (e) {
			//TODO handle the exception
		}
	},
	createMarkerClusterList(context, payLoad) {
		try {
			// 获取监测点、工况列表
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			const {
				options,
				listName,
				data
			} = payLoad
			// 整合监测点8个接口，工况4个接口
			const promise = options.map((v, k) => {
				return new Promise((resolve) => {
					apiServer[v.apiName](data)
						.then(response => {
							if (response.code === 200) {
								const list = createMarker(response, v, k)
								resolve(list);
							} else {
								resolve([]);
							}
						})
						.catch(error => {
							resolve([]);
							console.error('请求数据', `${v.title} - ${error}`);
						});
				})
			});
			// 并发请求数据
			Promise.all(promise)
				.then(response => {
					const list = XEUtils.flatten(response);
					if (listName === 'monitorList') {
						context.commit('GET_MONITOR_LIST', list)
					} else {
						context.commit('GET_EQUIMENT_LIST', list)
					}
				})
				.catch(error => {
					console.error('并发请求数据', error);
				})
				.finally(() => {
					uni.hideLoading();
				});
		} catch (e) {
			//TODO handle the exception
		}
	}
}

function createMarker(response, v, k) {
	// marker 通用配置
	const marker = {
		width: 0,
		height: 0,
		joinCluster: true,
		enableDefaultStyle: false
	};
	let list = [];
	for (let i = 0; i < response.data.list.length; i++) {
		const item = response.data.list[i];
		const {
			latitude,
			longitude,
			stnm,
			videoname,
			state
		} = item;
		if (!latitude || !longitude) continue;
		let newMarker = Object.assign({}, marker);
		// 由于后端的返回uuid（有18位）超过了uniapp中map所定义的markerId（最大9位）位数，自定义uuid
		const random = Math.floor(Math.random() * 1000000 + 1);
		const uuid = k * 1000002 + new Date().getMilliseconds() + new Date().getUTCMilliseconds() + i * random + i;

		// 将WGS-84(国际标准)转为GCJ-02(火星坐标):
		
		newMarker = {
			...newMarker,
			...lnglat,
			id: uuid,
			clusterId: uuid,
			iconPath: v.icon,
			markerType: v.name,
			markerName: v.name === 'videosurveillance' ? videoname : stnm,
			detailUrl: v.detailUrl,
			attrbuites: item,
			width: 22,
			height: 26,
			callout: {
				content: `  ${v.name === 'videosurveillance' ? videoname : stnm}  `,
				fontSize: 12,
				padding: 5,
				borderRadius: 25,
				color: state === '正常' ? '#fff' : '#FD1A01',
				bgColor: state === '正常' ? '#05BB80' : '#FFE6E6',
				display: 'ALWAYS' //常显
			}
		};
		list.push(newMarker);
	}
	return list
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}