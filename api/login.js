import {
	http
} from '@/common/service/service.js'

const apiService = {
	// 登录
	loginApi(data) {
		return http.post('/login', data)
	},
	// 退出登录
	loyoutApi() {
		return http.post('/logout')
	}
};

export default apiService;
