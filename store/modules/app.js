import apiServer from '@/api/app.js';
const state = {
	routesTo: [], // 浏览过的路由集合
	allFieldList: [], // 列表 -所有田地
}
const getters = {
	routesTo: state => state.routesTo,
	allFieldList: state => state.allFieldList,
}
const mutations = {
	SET_ROUTE_TO: (state, route) => {
		if(state.routesTo.indexOf(route) === -1) {
			state.routesTo.push(route)
		}
	},
	SET_ALL_FIELD_LIST: (state, allFieldList) => {
		state.allFieldList = allFieldList
	},
}
const actions = {
	async GetFieldList(context) {
		try {
			// 获取所有田地列表
			const data = {
				currentPage: 1,
				menuId: "414445390184579333",
				pageSize: 10000
			}
			let list = []
			const response = await apiServer.getFieldListApi(data)
			if (response.code === 200) {
				list = response.data.list || []
			}
			context.commit('SET_ALL_FIELD_LIST', list)
		} catch (e) {
			//TODO handle the exception
			console.error('获取所有田地列表', e)
		}
	}
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
