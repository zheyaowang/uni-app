import { http } from '@/common/service/service.js'

export const chunk = (params, showLoading) => {
	return http.get('/file/chunk', {
		params,
		custom: {
			loading: showLoading ? '上传中...' : null
		}
	})
}

export const merger = (data, showLoading) => {
	return http.post('/file/merge', data, {
		custom: {
			loading: showLoading ? '上传中...' : null
		},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 农事管理列表 example/ProRepair_YH/getList
export const getProRepair_YH = (data, showLoading) => {
	return http.post('/example/ProRepair_YH/getList', data, {
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 农事详情 /example/ProRepair_YH/detail/{id}
export const getProRepair_YHDetails = (id, showLoading) => {
	return http.get(`/example/ProRepair_YH/detail/${id}`, {
		custom: {
			loading: showLoading ? '加载详情中...' : null
		},
	})
}

// 更新农事 /api/example/ProRepair_YH/{id}
export const getProRepair_YH_UPDATE = (data, showLoading) => {
	return http.put(`/example/ProRepair_YH/${data.id}`, data, {
		custom: {
			loading: showLoading ? '更新中...' : null
		},
	})
}

// 更新农事 /api/example/ProRepair_YH/{id}
export const getProRepair_YH_add = (data, showLoading) => {
	return http.post(`/example/ProRepair_YH`, data, {
		custom: {
			loading: showLoading ? '新增中...' : null
		},
	})
}

// 设备安康-设备运行 & -设备监测
export const getDeviceData = (params, showLoading, queryInfo) => {
	if(queryInfo.method === 'get') {
		return http.get(queryInfo.url, {
			params,
			custom: {
				loading: showLoading ? '加载中...' : null
			}
		})
	}
	if(queryInfo.method === 'post') {
		return http.post(queryInfo.url, params, {
			custom: {
				loading: showLoading ? '加载中...' : null
			}
		})
	}
}


