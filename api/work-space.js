import {
	http
} from '@/common/service/service.js'

const apiService = {
	// 列表 - 获取稻田水位列表
	getWaterInfoListApi(data) {
		return http.post('/example/ProMonitor_WaterInfo/getList', data)
	},
	// 详情 - 获取稻田水位监测详情
	getWaterInfoReportApi(params) {
		return http.get('/promonitor/PromonitorWaterinfo/WaterMonitorReport', {
			params
		})
	},
	// 列表 - 获取流量监测列表
	getFlowInfoListApi(data) {
		return http.post('/example/ProMonitor_FlowInfo/getList', data)
	},
	// 详情 - 获取流量监测详情
	getFlowInfoReportApi(params) {
		return http.get('/promonitor/PromonitorFlowinfo/ListByFlowInfoGuid', {
			params
		})
	},
	// 列表 - 获取气象监测列表 
	getWeatherInfoListApi(data) {
		return http.post('/example/ProMonitor_WeatherInfo/getList', data)
	},
	// 详情 - 获取气象监测详情
	getWeatherInfoReportApi(params) {
		return http.get('/promonitor/PromonitorWeatherinfo/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取输水管压力列表
	getPipePressureInfoListApi(data) {
		return http.post('/example/ProMonitor_PipePressureInfo/getList', data)
	},
	// 详情 - 获取输水管压力详情
	getPipePressureInfoReportApi(params) {
		return http.get('/promonitor/PromonitorPipepressureinfo/GetData', {
			params
		})
	},
	// 列表 - 获取田间虫害列表
	getFieldPestInfoListApi(data) {
		return http.post('/example/ProMonitor_FieldPestInfo/getList', data)
	},
	// 详情-列表 - 获取测站下田间虫害详情列表
	getFieldPestInfoReportApi(params) {
		return http.get('/promonitor/PromonitorFieldpestdata/GetAll', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取田间虫害测站下的田地列表
	getStationFieldByIdApi(stationGuid) {
		return http.get('/example/ProMonitor_FieldPestInfo/' + stationGuid)
	},
	// // 详情 - 获取单个田间虫害详情数据
	// getFieldInfoByIdApi(projectGuid) {
	// 	return http.get('/example/ProMonitor_FieldPestInfo/' + projectGuid)
	// },
	// 新增、修改 - 获取田间虫害详情
	createOrEditFieldPestApi(data) {
		return http.post('/promonitor/PromonitorFieldpestdata/CreateOrEdit', data, {
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取作物长势列表
	getCropGrowthInfoListApi(data) {
		return http.post('/example/ProMonitor_CropGrowthInfo/getList', data)
	},
	// 详情 - 获取作物长势详情
	getCropGrowthInfoReportApi(params) {
		return http.get('/promonitor/PromonitorCropgrowthinfo/GetData', {
			params
		})
	},
	// 列表 - 获取土壤墒情列表
	getSoilMoistureInfoListApi(data) {
		return http.post('/example/ProMonitor_SoilMoistureInfo/getList', data)
	},
	// 详情 - 获取土壤墒情详情
	getSoilMoistureInfoReportApi(v) {
		return http.get('/promonitor/PromonitorSoilmoistureinfo/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取视频监控列表
	getVideoInfoListApi(data) {
		return http.post('/example/ProMonitor_Video_Info/getList', data)
	},
	// 列表 - 获取工况 一体泵列表
	getPromonitorPumpListApi() {
		return http.get('/promonitor/PromonitorPump/GetAll')
	},
	// 详情 - 获取工况 一体泵详情
	getPromonitorPumpDetailApi(id) {
		return http.get(`/promonitor/PromonitorPump/GetForView`, {
			params: {
				id
			},
			custom: {
				loading: '加载中'
			}
		})
	},
	// 数据 - 获取工况 一体泵数据
	getPromonitorPumpDataApi(params) {
		return http.get('/promonitor/PromonitorPump/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取工况 水肥设备列表
	getPromonitorWaterfertilizerinfoListApi() {
		return http.get('/promonitor/PromonitorWaterfertilizerinfo/GetAll')
	},
	// 详情 - 获取工况 水肥详情
	gettPromonitorWaterfertilizerDetailApi(id) {
		return http.get(`/promonitor/PromonitorWaterfertilizerinfo/GetForView`, {
			params: {
				id
			},
			custom: {
				loading: '加载中'
			}
		})
	},
	// 数据 - 获取工况 水肥数据
	gettPromonitorWaterfertilizerDataApi(params) {
		return http.get('/promonitor/PromonitorWaterfertilizerinfo/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取工况 进水阀列表
	getPromonitorInletvalveListApi() {
		return http.get('/promonitor/PromonitorInletvalve/GetAll')
	},
	// 详情 - 获取工况 进水阀详情
	getPromonitorInletvalveDetailApi(id) {
		return http.get(`/promonitor/PromonitorInletvalve/GetForView`, {
			params: {
				id
			},
			custom: {
				loading: '加载中'
			}
		})
	},
	// 数据 - 获取工况 进水阀数据
	getPromonitorInletvalveDataApi(params) {
		return http.get('/promonitor/PromonitorInletvalve/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 列表 - 获取工况 出水闸列表
	getPromonitorOutletsluiceListApi() {
		return http.get('/promonitor/PromonitorOutletsluice/GetAll')
	},
	// 详情 - 获取工况 出水闸详情
	gettPromonitorOutletsluiceDetailApi(id) {
		return http.get(`/promonitor/PromonitorOutletsluice/GetForView`, {
			params: {
				id
			},
			custom: {
				loading: '加载中'
			}
		})
	},
	// 数据 - 获取工况 出水闸数据
	gettPromonitorOutletsluiceDataApi(params) {
		return http.get('/promonitor/PromonitorOutletsluice/GetData', {
			params,
			custom: {
				loading: '加载中'
			}
		})
	},
	// 全局搜索（综合地图页）
	getDashboardSearchApi(filter) {
		return http.get('/dashboard/SearchGlobal', {
			params: {
				filter
			},
			custom: {
				loading: '加载中'
			}
		})
	},
};

export default apiService;