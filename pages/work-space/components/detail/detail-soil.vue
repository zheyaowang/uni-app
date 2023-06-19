<template>
	<view class="detail-soil height_full flex flex-direction">
		<sk-navbar :title="navbarTitle"></sk-navbar>

		<view class="detail-soil__content flex flex-direction flex-1">
			<view class="form-content flex align-center justify-between bg-white">
				<u--text color="#666" bold size="28rpx" text="土壤墒情曲线图"></u--text>
				<view class="range-time flex align-center justify-between" @tap="show = true">
					<view class="">{{ defaultDate[0] + ' ~ ' + defaultDate[1] }}</view>
					<u-icon name="calendar" color="#2EA4FE" size="18"></u-icon>
				</view>
			</view>
			<view class="charts-content flex flex-direction flex-1 height_0">
				<view class="chart-item flex flex-direction flex-1 height_0 bg-white" v-for="(chartData, index) in chartDatas">
					<view style="padding: 20rpx 0;">
						<u--text color="#333" bold align="center" size="28rpx" :text="`地下0.${index + 1}m曲线图`"></u--text>
					</view>
					<view class="charts-box flex-1 height_0">
						<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
					</view>
				</view>
			</view>
		</view>

		<!-- 时间范围 -->
		<term-picker :visable.sync="show" :defaultDate="defaultDate" themeColor="#2EA4FE" @confirm="getMonitorInfo"></term-picker>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
import { soilChartOpyion } from './data.js';
import termPicker from '@/components/term-picker/term-picker.vue';
export default {
	name: 'detail-soil',
	data() {
		return {
			id: '',
			navbarTitle: '',
			monitorValue: '',
			monitorTime: '',
			defaultDate: [timeFormat(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)), timeFormat(new Date())],
			opts: soilChartOpyion,
			chartDatas: [],
			show: false
		};
	},
	components: { termPicker },
	onLoad(option) {
		// 获取土壤墒情监测详情
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		this.getMonitorInfo();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取土壤墒情监测详情
				const id = this.id;
				const [startTime, endTime] = this.defaultDate;
				const response = await apiServer.getSoilMoistureInfoReportApi({ id, startTime, endTime });
				if (response.code === 200) {
					this.$nextTick(() => {
						// 生成charts
						this.createCharts(response.data);
					});
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取土壤墒情监测详情', e);
			}
		},
		createCharts({ dataList = [] }) {
			// 生成charts
			let categories = [];
			let [seriesDataTemp10, seriesDataMc10] = [[], []];
			let [seriesDataTemp20, seriesDataMc20] = [[], []];
			let [seriesDataTemp30, seriesDataMc30] = [[], []];
			let [seriesDataTemp40, seriesDataMc40] = [[], []];
			for (const item of dataList) {
				const { tm, temp10, temp20, temp30, temp40, mc10, mc20, mc30, mc40 } = item;
				categories.push(timeFormat(new Date(tm), 'MM-dd'));
				// 温度
				seriesDataTemp10.push(temp10);
				seriesDataTemp20.push(temp20);
				seriesDataTemp30.push(temp30);
				seriesDataTemp40.push(temp40);
				// 湿度
				seriesDataMc10.push(mc10);
				seriesDataMc20.push(mc20);
				seriesDataMc30.push(mc30);
				seriesDataMc40.push(mc40);
			}
			this.chartDatas = [
				{
					categories,
					series: [
						{
							name: '地下0.1m温度',
							data: seriesDataTemp10
						},
						{
							name: '地下0.1m湿度',
							data: seriesDataMc10
						}
					]
				},
				{
					categories,
					series: [
						{
							name: '地下0.2m温度',
							data: seriesDataTemp20
						},
						{
							name: '地下0.2m湿度',
							data: seriesDataMc20
						}
					]
				},
				{
					categories,
					series: [
						{
							name: '地下0.3m温度',
							data: seriesDataTemp30
						},
						{
							name: '地下0.3m湿度',
							data: seriesDataMc30
						}
					]
				},
				{
					categories,
					series: [
						{
							name: '地下0.4m温度',
							data: seriesDataTemp40
						},
						{
							name: '地下0.4m湿度',
							data: seriesDataMc40
						}
					]
				},
			]
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-soil {
	&__head {
		height: 300rpx;
		padding: 40rpx 70rpx 62rpx 50rpx;
		box-sizing: border-box;
		background: url('~@/static/img/work-space/detail/detail_bg.png') no-repeat;
		background-size: 100%;
	}

	&__content {
		
		.form-content,.chart-item {
			margin-bottom: 20rpx;
		}
		
		.form-content {
			padding: 30rpx 20rpx;
			.range-time {
				width: 350rpx;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 22rpx;
				background: #ffffff;
				padding: 0 10rpx 0 20rpx;
				border: 1px solid #83c8fc;
				box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(46, 164, 254, 0.4);
				border-radius: 8rpx;
			}
		}
	}
}
</style>
