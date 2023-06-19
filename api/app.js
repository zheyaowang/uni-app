import {
	http
} from '@/common/service/service.js'

const apiService = {
	// 获取所有田地列表
	getFieldListApi(data) {
		return http.post('/example/Project_Info/getList', data)
	},
	// 存客户端推送标识 /api/cid/UpdateUniAppId
	setClientId(data) {
		return http.post('/cid/UpdateUniAppId', data)
	}
	
};

export default apiService;
