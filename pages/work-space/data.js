// 工况图层切换
export const mapEquimentOptions = [{
		title: '一体泵',
		name: 'pump',
		icon: '/static/img/work-space/pump2.png',
		img: '/static/img/work-space/pump.png',
		apiName: 'getPromonitorPumpListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_pump.png',
		detailIconSelected: '/static/img/work-space/detail/detail_pump_active.png',
		detailUrl: 'detail-pump', // 详情url
	},
	{
		title: '水肥设备',
		name: 'water',
		icon: '/static/img/work-space/water2.png',
		img: '/static/img/work-space/water.png',
		apiName: 'getPromonitorWaterfertilizerinfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_water.png',
		detailIconSelected: '/static/img/work-space/detail/detail_water_active.png',
		detailUrl: 'detail-water', // 详情url
	},
	{
		title: '进水阀',
		name: 'inwater',
		icon: '/static/img/work-space/inwater2.png',
		img: '/static/img/work-space/inwater.png',
		apiName: 'getPromonitorInletvalveListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_inwater.png',
		detailIconSelected: '/static/img/work-space/detail/detail_inwater_active.png',
		detailUrl: 'detail-inwater', // 详情url
	},
	{
		title: '出水闸',
		name: 'outwater',
		icon: '/static/img/work-space/outwater2.png',
		img: '/static/img/work-space/outwater.png',
		apiName: 'getPromonitorOutletsluiceListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_outwater.png',
		detailIconSelected: '/static/img/work-space/detail/detail_outwater_active.png',
		detailUrl: 'detail-outwater', // 详情url
	}
]
// 地图主题切换
export const mapThemeOptions = [{
		title: '标准地图',
		name: 'default',
		img: '/static/img/work-space/theme_1.png',
	},
	{
		title: '影像地图',
		name: 'enableSatellite',
		img: '/static/img/work-space/theme_2.png',
	},
	{
		title: '三维地图',
		name: 'enableBuilding',
		img: '/static/img/work-space/theme_3.png',
	},
]
// 监测点图层切换
export const mapLayerOptions = [
	{
		title: '稻田水位',
		name: 'paddyField', // 标记点类型
		img: '/static/img/work-space/layer_1.png',
		icon: '/static/img/work-space/icon_1.png',
		witdh: '26rpx',
		height: '31rpx',
		apiName: 'getWaterInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_1.png',
		detailIconSelected: '/static/img/work-space/detail/detail_1_active.png',
		detailUrl: 'detail-paddy-field', // 详情url
	},
	{
		title: '流量监测',
		name: 'flowMonitoring',
		img: '/static/img/work-space/layer_2.png',
		icon: '/static/img/work-space/icon_2.png',
		witdh: '30rpx',
		height: '30rpx',
		apiName: 'getFlowInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_2.png',
		detailIconSelected: '/static/img/work-space/detail/detail_2_active.png',
		detailUrl: 'detail-flow-monitoring', // 详情url
	},
	{
		title: '作物长势',
		name: 'cropGrowth',
		img: '/static/img/work-space/layer_3.png',
		icon: '/static/img/work-space/icon_3.png',
		witdh: '36rpx',
		height: '30rpx',
		apiName: 'getCropGrowthInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_3.png',
		detailIconSelected: '/static/img/work-space/detail/detail_3_active.png',
		detailUrl: 'detail-crop-growth', // 详情url
	},
	{
		title: '土壤墒情',
		name: 'soil',
		img: '/static/img/work-space/layer_4.png',
		icon: '/static/img/work-space/icon_4.png',
		witdh: '31rpx',
		height: '30rpx',
		apiName: 'getSoilMoistureInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_4.png',
		detailIconSelected: '/static/img/work-space/detail/detail_4_active.png',
		detailUrl: 'detail-soil', // 详情url
	},
	{
		title: '视频监控',
		name: 'videosurveillance',
		img: '/static/img/work-space/layer_5.png',
		icon: '/static/img/work-space/icon_5.png',
		witdh: '26rpx',
		height: '30rpx',
		apiName: 'getVideoInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_5.png',
		detailIconSelected: '/static/img/work-space/detail/detail_5_active.png',
		detailUrl: 'detail-video-surveillance', // 详情url
	},
	{
		title: '田间虫害',
		name: 'insect',
		img: '/static/img/work-space/layer_6.png',
		icon: '/static/img/work-space/icon_6.png',
		witdh: '32rpx',
		height: '30rpx',
		apiName: 'getFieldPestInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_6.png',
		detailIconSelected: '/static/img/work-space/detail/detail_6_active.png',
		detailUrl: 'detail-insect', // 详情url
	},
	{
		title: '输水管压力',
		name: 'pipepressure',
		img: '/static/img/work-space/layer_7.png',
		icon: '/static/img/work-space/icon_7.png',
		witdh: '31rpx',
		height: '30rpx',
		apiName: 'getPipePressureInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_7.png',
		detailIconSelected: '/static/img/work-space/detail/detail_7_active.png',
		detailUrl: 'detail-pipe-pressure', // 详情url
	},
	{
		title: '气象监测',
		name: 'weatherwatches',
		img: '/static/img/work-space/layer_8.png',
		icon: '/static/img/work-space/icon_8.png',
		witdh: '38rpx',
		height: '30rpx',
		apiName: 'getWeatherInfoListApi', // 列表 api
		detailIcon: '/static/img/work-space/detail/detail_8.png',
		detailIconSelected: '/static/img/work-space/detail/detail_8_active.png',
		detailUrl: 'detail-weather-watches', // 详情url
	}
]


// 全局搜索返回的类型
export const searchResultOption = [
	{
		label: '田地',
		name: 'project',
		type: 'monitorList'
	},
	{
		label: '稻田水位',
		name: 'water',
		type: 'monitorList'
	},
	{
		label: '流量',
		name: 'flow',
		type: 'monitorList'
	},
	{
		label: '作物长势',
		name: 'cropGrowth',
		type: 'monitorList'
	},
	{
		label: '土壤墒情',
		name: 'soilMoisture',
		type: 'monitorList'
	},
	{
		label: '田间虫害',
		name: 'fieldPest',
		type: 'monitorList'
	},
	{
		label: '输水管压力',
		name: 'pipePressure',
		type: 'monitorList'
	},
	{
		label: '气象',
		name: 'weather',
		type: 'monitorList'
	},
	{
		label: '视频监控',
		name: 'video',
		type: 'monitorList'
	},
	{
		label: '一体化泵',
		name: 'pump',
		type: 'equimentList'
	},
	{
		label: '进水阀',
		name: 'inletValve',
		type: 'equimentList'
	},
	{
		label: '出水闸',
		name: 'outletSluice',
		type: 'equimentList'
	},
	{
		label: '水肥设备',
		name: 'waterFertilizer',
		type: 'equimentList'
	},
]