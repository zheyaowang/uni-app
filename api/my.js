import {
	http
} from '@/common/service/service.js'
const baseUrl = '/permission'
const apiService = {
	// 获取用户信息
	getUserInfo(params) {
		return http.get('/getInfo', {
			params
		})
	},
	// 更新用户信息
	updateUserInfo(data) {
		return http.put(baseUrl + '/Users/Current/BaseInfo', data)
	},
	// 更新用户头像
	updateUserAvatar(name) {
		return http.put(baseUrl + `/Users/Current/Avatar/${name}`)
	},
};

export default apiService;