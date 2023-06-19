import {
	http
} from '@/common/service/service.js'

export const getPaddy = () => {
	return http.get('/system/DataInterface/306039649598439557/Actions/Response')
}

// /permission/Users/ImUser/Selector/402372803522724997
export const getHouseholdHeadName = (data) => {
	return http.post('/permission/Users/ImUser/Selector/402372803522724997', data)
}

// 用水管理 /project/ProjectWateruse/GetAll 
export const getProjectWateruse = (params, showLoading) => {
	return http.get('/project/ProjectWateruse/GetAll', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 施肥管理 /project/ProjectFertilization/GetAll
export const getProjectFertilization = (params, showLoading) => {
	return http.get('/project/ProjectFertilization/GetAll', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 用药管理 /project/ProjectPharmacy/GetAll
export const getProjectPharmacy = (params, showLoading) => {
	return http.get('/project/ProjectPharmacy/GetAll', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 用水记录详情页 /project/ProjectWateruse/Detail
export const getProjectWateruseDetails = (params, showLoading) => {
	return http.get('/project/ProjectWateruse/Detail', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 获取app施肥记录详情页 /api/project/ProjectFertilization/Detail
export const getProjectFertilizationDetails = (params, showLoading) => {
	return http.get('/project/ProjectFertilization/Detail', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}

// 获取app用药记录详情页 /api/project/ProjectPharmacy/Detail
export const getProjectPharmacyDetails = (params, showLoading) => {
	return http.get('/project/ProjectPharmacy/Detail', {
		params,
		custom: {
			loading: showLoading ? '加载中...' : null
		}
	})
}