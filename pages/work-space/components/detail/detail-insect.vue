<template>
	<view class="detail-insect height_full bg-white flex flex-direction">
		<sk-navbar :title="navbarTitle"></sk-navbar>

		<view class="detail-insect__head flex align-center justify-around">
			<view class="add-btn flex align-center justify-center" @tap="goToPage">
				<u-icon name="plus" size="22rpx" color="#2EA4FE"></u-icon>
				<view style="margin-left: 15rpx;">新增</view>
			</view>
			<view class="range-time flex align-center justify-between" @tap="show = true">
				<view class="">{{ defaultDate[0] + ' ~ ' + defaultDate[1] }}</view>
				<u-icon name="calendar" color="#2EA4FE" size="18"></u-icon>
			</view>
		</view>

		<view class="detail-insect__content flex flex-direction flex-1 height_0">
			<view class="table-head">
				<view class="th flex align-center justify-around">
					<view class="td text-center" v-for="item in columns" :key="item.key" :style="{ width: item.width }">{{ item.title }}</view>
				</view>
			</view>
			<view class="table-content flex-1">
				<view class="tr flex align-center justify-around" v-for="(item, index) in tableData" :key="index">
					<view class="td text-center" v-for="column in columns" :key="`${column.key}_${index}`" :style="{ width: column.width }">
						<view class="" v-if="column.slot">
							<template v-if="item[column.key]">
								<view class="table-tag" :style="createTagStyle(column.key, item)">{{ item[column.key] }}</view>
							</template>
							<template v-else>
								--
							</template>
						</view>
						<view class="" v-else>{{ createData(item, column) }}</view>
					</view>
				</view>
				<view v-if="tableData.length === 0" style="padding-top: 100rpx;"><u-empty mode="list" text="暂无数据"></u-empty></view>
			</view>
		</view>

		<!-- 时间范围 -->
		<term-picker :visable.sync="show" :defaultDate="defaultDate" themeColor="#2EA4FE" @confirm="getMonitorInfo"></term-picker>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
import termPicker from '@/components/term-picker/term-picker.vue';
import { asyncRouteMap } from '@/common/router/modules/routers.js';
import { analysisArray, handleArray } from './data.js';
const columns = [
	{ title: '时间', key: 'tm', type: 'date', format: 'MM-dd HH:mm', width: '100rpx' },
	{ title: '田地编号', key: 'projectName', width: '200rpx' },
	{ title: '分析结果', key: 'analysisResults', width: '150rpx', slot: true, align: 'center' },
	{ title: '处理结果', key: 'handleResults', width: '150rpx', slot: true, align: 'center' }
];
export default {
	name: 'detail-insect',
	data() {
		return {
			navbarTitle: '',
			show: false,
			defaultDate: [timeFormat(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)), timeFormat(new Date())],
			columns,
			tableData: [],
			projectguids: '',
			analysisArray,
			handleArray
		};
	},
	components: { termPicker },
	computed: mapGetters('app', ['allFieldList']),
	onLoad(option) {
		// 获取所有田地列表
		if (!this.allFieldList || this.allFieldList.length === 0) this.$store.dispatch('app/GetFieldList');
		// 获取田间虫害详情
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		// 获取当前测站下田间虫害详情列表
		this.getMonitorInfo();
		// 获取田间虫害测站下的田地列表
		this.getStationFieldById();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取当前测站下田间虫害详情列表
				const stationGuid = this.id;
				const [startTime, endTime] = this.defaultDate;
				const response = await apiServer.getFieldPestInfoReportApi({ stationGuid, startTime, endTime });
				if (response.code === 200) {
					this.tableData = response.data;
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取当前测站下田间虫害详情列表', e);
			}
		},
		async getStationFieldById() {
			try {
				// 获取田间虫害测站下的田地列表
				this.projectguids = '';
				const response = await apiServer.getStationFieldByIdApi(this.id);
				if (response.code === 200) {
					this.projectguids = response.data.projectguids;
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取所有田地列表', e);
			}
		},
		goToPage() {
			// 跳转到新增界面
			const id = this.id;
			const title = this.navbarTitle;
			const projectguids = this.projectguids;
			uni.navigateTo({
				url: asyncRouteMap['form-add-edit-insect'] + '?data=' + encodeURIComponent(JSON.stringify({ id, title, projectguids })),
				events: {
					'on-update': () => {
						this.getMonitorInfo();
					}
				}
			});
		},
		createData(item, column) {
			const value = item[column.key];
			return column.type === 'date' ? timeFormat(new Date(value), column.format) : value;
		},
		createTagStyle(key, item) {
			const value = key === 'analysisResults' && item[key] !== '无虫害' ? '有虫害' : item[key];
			const { color, borderColor, backgroundColor } = [...analysisArray, ...handleArray].find(v => v.label === value);
			return {
				color,
				border: borderColor ? `1rpx solid ${borderColor}` : 'none',
				backgroundColor
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-insect {
	&__head {
		padding: 20rpx;
		.add-btn {
			width: 300rpx;
			height: 60rpx;
			background: #f7f7f7;
			color: #2ea4fe;
			border: 1px dashed #83c8fc;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(46, 164, 254, 0.4);
			border-radius: 8rpx;
		}
		.range-time {
			width: 350rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 22rpx;
			background: #ffffff;
			padding: 0 10rpx 0 20rpx;
			border: 1px solid #83c8fc;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(46, 164, 254, 0.4);
			border-radius: 8rpx;
		}
	}

	&__content {
		.table-head {
			.th {
				color: #333333;
				font-weight: 500;
				font-size: 26rpx;
				padding: 30rpx 0;
			}
		}
		.table-content {
			overflow: auto;
			.tr {
				color: #333333;
				font-weight: bold;
				font-size: 24rpx;
				padding: 30rpx 0;

				&:nth-child(2n - 1) {
					background: #f5f5f5;
				}
			}

			.table-tag {
				padding: 10rpx;
				border-radius: 4rpx;
			}
		}
	}
}
</style>
