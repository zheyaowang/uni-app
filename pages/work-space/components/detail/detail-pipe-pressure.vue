<template>
	<view class="detail-pipe-pressure height_full flex flex-direction">
		<sk-navbar :title="navbarTitle"></sk-navbar>

		<view class="detail-pipe-pressure__head">
			<u--text color="#fff" blod size="32rpx" text="压力"></u--text>
			<view class="flex align-center" style="margin: 35rpx 0">
				<u--image width="60rpx" height="56rpx" src="/static/img/work-space/detail/head_pressure_icon.png"></u--image>
				<u--text color="#fff" margin="0 20rpx" blod size="56rpx" :text="`${monitorValue || ' - '}兆帕`"></u--text>
			</view>
			<u--text color="#fff" align="right" margin="8rpx 0 0" blod size="26rpx" :text="monitorTime"></u--text>
		</view>

		<view class="detail-pipe-pressure__content flex flex-direction flex-1">
			<view class="form-content flex align-center justify-between">
				<u--text color="#666" margin="20rpx 0" size="28rpx" text="压力过程曲线"></u--text>
				<view class="range-time flex align-center justify-between" @tap="show = true">
					<view class="">{{ defaultDate[0] + ' ~ ' + defaultDate[1] }}</view>
					<u-icon name="calendar" color="#2EA4FE" size="18"></u-icon>
				</view>
			</view>
			<view class="charts-box flex-1"><qiun-data-charts type="line" :opts="opts" :chartData="chartData" /></view>
		</view>

		<!-- 时间范围 -->
		<term-picker :visable.sync="show" :defaultDate="defaultDate" themeColor="#2EA4FE" @confirm="getMonitorInfo"></term-picker>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
import { lineOptionFun } from './data.js';
import termPicker from '@/components/term-picker/term-picker.vue';
export default {
	name: 'detail-pipe-pressure',
	data() {
		return {
			id: '',
			navbarTitle: '',
			monitorValue: '',
			monitorTime: '',
			defaultDate: [timeFormat(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)), timeFormat(new Date())],
			opts: lineOptionFun('压力（兆帕）'),
			chartData: {
				categories: [],
				series: []
			},
			show: false
		};
	},
	components: { termPicker },
	onLoad(option) {
		// 获取输水管压力详情
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		this.getMonitorInfo();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取输水管压力详情
				const id = this.id;
				const [startTime, endTime] = this.defaultDate;
				const response = await apiServer.getPipePressureInfoReportApi({ id, startTime, endTime });
				if (response.code === 200) {
					const { pressValueRT, tm } = response.data;
					this.monitorValue = pressValueRT;
					this.monitorTime = timeFormat(new Date(tm), 'yyyy-MM-dd HH:mm:ss');
					this.$nextTick(() => {
						// 生成charts
						this.createCharts(response.data);
					});
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取输水管压力详情', e);
			}
		},
		createCharts({ dataList }) {
			// 生成charts
			let seriesData = [];
			let categories = [];
			for (const item of dataList) {
				const { tm, pressValue } = item;
				categories.push(timeFormat(new Date(tm), 'MM-dd'));
				seriesData.push(pressValue);
			}
			this.chartData = {
				categories,
				series: [
					{
						name: '压力',
						data: seriesData
					}
				]
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-pipe-pressure {
	&__head {
		height: 300rpx;
		padding: 40rpx 70rpx 62rpx 50rpx;
		box-sizing: border-box;
		background: url('~@/static/img/work-space/detail/detail_bg.png') no-repeat;
		background-size: 100%;
	}

	&__content {
		padding: 0 20rpx;
		.form-content {
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

		.charts-box {
		}
	}
}
</style>
