<template>
	<view class="detail-weather-watches height_full flex flex-direction">
		<sk-navbar :title="navbarTitle"></sk-navbar>
		<view class="detail-weather-watches__head flex justify-center">
			<view class="weather-head">
				<view class="address-box flex align-center">
					<u-icon name="map" color="#fff" size="30rpx"></u-icon>
					<u--text color="#fff" margin="0 0 0 15rpx" size="30rpx" :text="navbarTitle || ' -- '"></u--text>
				</view>
				<view class="flex">
					<view class=""><u--text color="#fff" size="160rpx" :text="`${temperature || ' -- '}`"></u--text></view>
					<view class=""><u--text color="#fff" size="60rpx" text="℃"></u--text></view>
				</view>
			</view>
		</view>
		<view class="detail-weather-watches__content flex flex-direction flex-1 height_0">
			<view class="table-head">
				<view class="th flex align-center justify-around">
					<view class="td text-center" v-for="item in columns" :key="item.key" :style="{ width: item.width }">{{ item.title }}</view>
				</view>
			</view>
			<view class="table-content flex-1">
				<view class="tr flex align-center justify-around" v-for="(item, index) in tableData" :key="index">
					<view class="td text-center" v-for="column in columns" :key="`${column.key}_${index}`" :style="{ width: column.width }">{{ createData(item, column) }}</view>
				</view>
				<view class="tr" v-if="tableData.length === 0"><u-empty mode="list" textColor="#fff" iconColor="#fff" text="暂无数据"></u-empty></view>
			</view>
		</view>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
const columns = [
	{ title: '时间', key: 'tm', type: 'date', format: 'MM-dd HH:mm', width: '100rpx' },
	{ title: '气温', key: 'temperature', width: '100rpx' },
	{ title: '风力', key: 'maxWindSpeed', width: '100rpx' },
	{ title: '降雨', key: 'rainDaily', width: '100rpx' },
	{ title: '湿度', key: 'humidity', width: '100rpx' },
	{ title: '风向', key: 'windDirection', width: '100rpx' }
];
export default {
	name: 'detail-weather-watches',
	data() {
		return {
			navbarTitle: '',
			temperature: '',
			tableData: [],
			columns
		};
	},
	onLoad(option) {
		// 获取田间虫害详情
		const { id, title, temperature } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		this.temperature = temperature;
		this.getMonitorInfo();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取气象监测详情
				const id = this.id;
				// const startTime = timeFormat(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000));
				const startTime = '2023-01-01'
				const endTime = timeFormat(new Date());
				const response = await apiServer.getWeatherInfoReportApi({ id, startTime, endTime });
				if (response.code === 200) {
					this.tableData = response.data;
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取气象监测详情', e);
			}
		},
		createData(item, column) {
			const value = item[column.key];
			return column.type === 'date' ? timeFormat(new Date(value), column.format) : value;
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-weather-watches {
	background: url('~@//static/img/work-space/detail/weather_bg.png') no-repeat;
	background-size: 100% 100%;

	.weather-head {
		padding: 80rpx 0;

		.address-box {
			margin-bottom: 20rpx;
		}
	}
	&__content {
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ffffff;
		line-height: 35rpx;
		padding: 0 20rpx;

		.tr,
		.th {
			padding: 20rpx 0;
			background: rgba(252, 252, 253, 0.3);
			border-radius: 10rpx;
			margin-bottom: 20rpx;
		}

		.th {
			padding: 30rpx 0;
		}

		.table-content {
			overflow: auto;
		}
	}
}
</style>
