import {
	TOKEN_NAME,
	USER_INFO
} from "@/common/util/constants"
import api from "@/api/login.js"
import myServer from '@/api/my.js';
import {
	asyncRouteMap
} from '@/common/router/modules/routers.js';

const state = {
	token: '',
	userInfo: ''
}
const getters = {
	token: state => state.token,
	userInfo: state => {
		const userInfo = uni.getStorageSync(USER_INFO);
		state.userInfo = userInfo ? JSON.parse(userInfo) : {}
		return state.userInfo
	}
}
const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
}
const actions = {
	// 登录
	mLogin({
		commit,
		dispatch
	}, userInfo) {
		return new Promise((resolve, reject) => {
			api.loginApi(userInfo).then(response => {
				if (response.code === 200) {
					// 设置token到缓存
					const result = response.data;
					uni.setStorageSync(TOKEN_NAME, 'Bearer ' + result.token);
					// 设置token到仓库
					commit('SET_TOKEN', result.token)
					dispatch('GetUserInfo')
					resolve(response)
				} else {
					reject(response)
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	async GetUserInfo(context) {
		try {
			// 获取用户信息
			const response = await myServer.getUserInfo();
			console.log(response)
			if (response.code === 200) {
				const userInfo = response.data || {};
				uni.setStorageSync(USER_INFO, JSON.stringify(userInfo))
				context.commit('SET_USER_INFO', userInfo)
			}
		} catch (e) {
			//TODO handle the exception
			console.error('获取用户信息', e)
		}
	},
	// 退出登录
	Logout(context) {
		api.loyoutApi().then((response) => {
			if (response.code === 200) {
				uni.showToast({
					icon: 'none',
					title: '退出登录',
					success() {
						// 移除token
						context.commit('SET_TOKEN', '')
						// 移除缓存
						uni.removeStorageSync(TOKEN_NAME)
						// 返回登录页
						uni.navigateTo({
							url: asyncRouteMap['login']
						})
					}
				});

				setTimeout(() => {
					uni.hideToast();
				}, 2000)
			}
		})
	},
}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}