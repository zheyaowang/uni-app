import { getPaddy, getHouseholdHeadName } from '@/api/water-fertilizer.js'
const state = {
	paddyFieldNumberList: [], // 田地编号列表
	householdHeadNameList: [], //户主名称列表
}

const getters = {
	paddyFieldNumberList: state => state.paddyFieldNumberList,
	householdHeadNameList: state => state.householdHeadNameList,
}

const mutations = {
	SET_PADDY_FIELD_NUMBER_LIST: (state, data) => {
		state.paddyFieldNumberList = data
	},
	SET_HOUSEHOLD_HEAD_LIST: (state, data) => {
		state.householdHeadNameList = data
	},
}

const actions = {
	async getPaddyData({ commit, state }) {
		if(state.paddyFieldNumberList.length) {
			return state.paddyFieldNumberList
		}
		try{
			const { data } = await getPaddy()
			// console.log('res', data.data);
			commit('SET_PADDY_FIELD_NUMBER_LIST', data.data)
			return data.data
		}catch(e){
			//TODO handle the exception
		}
	},
	async getHouseholdHeadNameData({commit, state}, keyword) {
		return new Promise((resolve, reject) => {
			if(state.householdHeadNameList.length) {
				resolve(state.householdHeadNameList)
			}
			getHouseholdHeadName(keyword).then((res) => {
				commit('SET_HOUSEHOLD_HEAD_LIST', res.data.list)
				resolve(res.data.list)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}