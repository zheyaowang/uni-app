<template>
	<view class="detail-flow-monitoring height_full flex flex-direction bg-white">
		<sk-navbar :title="navbarTitle"></sk-navbar>

		<view class="detail-flow-monitoring__head">
			<u--text color="#fff" blod size="32rpx" text="瞬时流量"></u--text>
			<view class="flex align-center" style="margin: 35rpx 0">
				<u--image width="60rpx" height="56rpx" src="/static/img/work-space/detail/head_flow_icon.png"></u--image>
				<u--text color="#fff" margin="0 20rpx" blod size="56rpx" :text="`${monitorValue || ' - '}m³/s`"></u--text>
			</view>
			<u--text color="#fff" align="right" margin="8rpx 0 0" blod size="26rpx" :text="monitorTime"></u--text>
		</view>

		<view class="detail-flow-monitoring__content flex flex-direction flex-1">
			<view class="form-content flex align-center justify-between">
				<u--text color="#666" margin="20rpx 0" size="28rpx" text="流量过程曲线"></u--text>
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
	name: 'detail-flow-monitoring',
	data() {
		return {
			id: '',
			navbarTitle: '',
			monitorValue: '',
			monitorTime: '',
			defaultDate: [timeFormat(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)), timeFormat(new Date())],
			opts: lineOptionFun('流量（m³/s）', true),
			chartData: {
				categories: [],
				series: []
			},
			show: false
		};
	},
	components: { termPicker },
	onLoad(option) {
		// 获取稻田水位监测详情
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		this.getMonitorInfo();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取稻田水位监测详情
				const flowInfoGuid = this.id;
				const [startTime, endTime] = this.defaultDate;
				const response = await apiServer.getFlowInfoReportApi({ flowInfoGuid, startTime, endTime });
				if (response.code === 200) {
					const { q, tm } = response.data;
					this.monitorValue = q;
					this.monitorTime = timeFormat(new Date(tm), 'yyyy-MM-dd HH:mm:ss');
					this.$nextTick(() => {
						// 生成charts
						this.createCharts(response.data);
					});
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取稻田水位监测详情', e);
			}
		},
		createCharts({ flowDataList, stnm }) {
			// 生成charts
			let categories = [];
			let seriesDataQ = [];
			let seriesDataQA = [];
			for (const item of flowDataList) {
				const { tm, q, qa } = item;
				categories.push(timeFormat(new Date(tm), 'MM-dd'));
				seriesDataQ.push(q);
				seriesDataQA.push(qa);
			}
			this.chartData = {
				categories,
				series: [
					{
						name: '瞬时流量',
						data: seriesDataQ
					},
					{
						name: '累计流量',
						data: seriesDataQA
					}
				]
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-flow-monitoring {
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
