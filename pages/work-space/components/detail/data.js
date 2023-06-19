// 稻田水位，流量，压力，作物长势曲线图
export function lineOptionFun(title, showLegend = false) {
	return {
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [20, 10, 20, 15],
		enableScroll: false,
		dataLabel: false,
		dataPointShape: false,
		legend: {
			show: showLegend
		},
		xAxis: {
			disableGrid: true,
			labelCount: 3
		},
		yAxis: {
			gridType: "dash",
			showTitle: true,
			data: [{
				title,
				axisLine: false,
				titleOffsetY: -5,
				titleOffsetX: 5
			}]
		},
		extra: {
			line: {
				type: "curve",
				width: 2,
				activeType: "hollow",
			}
		}
	}
}

// 土壤墒情曲线图
export const soilChartOpyion = {
	color: ["#36A3F7", "#FEA716"],
	enableScroll: false,
	dataLabel: false,
	dataPointShape: false,
	legend: {
		show: true
	},
	xAxis: {
		disableGrid: true,
		labelCount: 3
	},
	yAxis: {
		gridType: "dash",
		showTitle: true,
		data: [{
			title: '温度(℃）',
			axisLine: false,
			titleOffsetY: -5
		}, {
			title: '湿度(%）',
			axisLine: false,
			position: 'right',
			titleOffsetY: -5
		}]
	},
	extra: {
		line: {
			type: "curve",
			width: 2,
			activeType: "hollow",
		}
	}
}

// 分析结果类型
export const analysisArray = [{
		label: '有虫害',
		value: '有虫害',
		color: '#F1570D',
		backgroundColor: '#FEEDE5',
		borderColor: '#E4BCA9'
	},
	{
		label: '无虫害',
		value: '无虫害',
		color: '#01AB3D',
		backgroundColor: '#D7FCE4',
		borderColor: '#01AB3D'
	}
];
// 处理状态类型
export const handleArray = [{
		label: '--',
		value: null,
		color: '#333',
		backgroundColor: '',
		borderColor: ''
	},
	{
		label: '未处理',
		value: '未处理',
		color: '#F1570D',
		backgroundColor: '#FEEDE5',
		borderColor: '#E4BCA9'
	},
	{
		label: '处理中',
		value: '处理中',
		color: '#2979ff',
		backgroundColor: '#E2F1FF',
		borderColor: '#2b85e4'
	},
	{
		label: '已处理',
		value: '已处理',
		color: '#01AB3D',
		backgroundColor: '#D7FCE4',
		borderColor: '#01AB3D'
	}
];

export const seriesMock =[]