<template>
	<view class="detail-equiment height_full flex flex-direction">
		<!-- <sk-navbar :title="navbarTitle" right-icon="grid"></sk-navbar> -->
		<sk-navbar :title="navbarTitle"></sk-navbar>
		<view class="detail-equiment__head bg-white">
			<view class="detail-equiment__title flex align-center">
				<view class="label-icon"></view>
				<u--text color="#333" size="34rpx" bold text="运行统计"></u--text>
			</view>
			<view class="detail-equiment__head-content">
				<text>该设备于{{ startTime }}至{{ endTime }} 期间总共开机</text>
				<text class="all-time time-flow">{{ equimentData.openTime || 0 }}</text>
				<text>小时，总流量</text>
				<text class="all-flow time-flow">{{ equimentData.qa || 0 }}</text>
				<text>m³</text>
			</view>
		</view>

		<view class="detail-equiment__base bg-white">
			<view class="detail-equiment__title flex align-center">
				<view class="label-icon"></view>
				<u--text color="#333" size="34rpx" bold text="基础信息"></u--text>
			</view>
			<view class="detail-equiment__base-content">
				<u-row customStyle="margin-bottom: 21rpx" gutter="20rpx">
					<u-col span="4">
						<view class="info">
							<u--text color="#333" size="28rpx" text="设备编号"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.stcd"></u--text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="info">
							<u--text color="#333" size="28rpx" text="操作模式"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.modelType"></u--text>
						</view>
					</u-col>
					<u-col span="4">
						<view class="info">
							<u--text color="#333" size="28rpx" text="当前模式"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.model"></u--text>
						</view>
					</u-col>
				</u-row>
				<u-row customStyle="margin-bottom: 21rpx" gutter="20rpx">
					<u-col span="4">
						<view class="info">
							<u--text color="#333" size="28rpx" text="负责人"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.responsiblePerson"></u--text>
						</view>
					</u-col>
					<u-col :span="showFileNumber ? 4 : 8">
						<view class="info">
							<u--text color="#333" size="28rpx" text="负责人电话"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.responsiblePhoneNumber"></u--text>
						</view>
					</u-col>
					<u-col span="4" v-if="showFileNumber">
						<view class="info">
							<u--text color="#333" size="28rpx" text="田地编号"></u--text>
							<u--text color="#000" size="32rpx" bold margin="15rpx 0 0" :text="equimentInfo.projectName"></u--text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>

		<view class="detail-equiment__chart bg-white flex flex-direction flex-1 height_0">
			<view class="detail-equiment__title flex align-center">
				<view class="label-icon"></view>
				<u--text color="#333" size="34rpx" bold text="运行曲线"></u--text>
			</view>
			<view class="detail-equiment__chart-content flex flex-direction flex-1 height_0">
				<view class="charts-box flex-1 height_0"><qiun-data-charts type="line" :opts="statusOpts" :chartData="chartData" /></view>
				<view class="charts-box flex-1 height_0"><qiun-data-charts type="line" :opts="flowOpts" :chartData="chartData" /></view>
			</view>
		</view>
	</view>
</template>

<script>
import { timeFormat } from '@/common/util/tools.js';
import { seriesMock, lineOptionFun } from './data.js';
export default {
	props: {
		// 标题
		navbarTitle: {
			type: String,
			defaul: ''
		},
		// 基础信息中是否展示《田地编号》, 默认展示
		showFileNumber: {
			type: Boolean,
			default: true
		},
		// 设备信息
		equimentInfo: {
			type: Object,
			default: () => ({})
		},
		// 设备数据
		equimentData: {
			type: Object,
			default: () => ({})
		}
	},
	name: 'detail-equiment',
	data() {
		return {
			startTime: `${timeFormat(new Date(), 'yyyy-MM')}-01`,
			endTime: timeFormat(new Date()),
			statusOpts: lineOptionFun('开/关'),
			flowOpts: lineOptionFun('m³'),
			chartData: {}
		};
	},
	mounted() {
		this.createCharts('开关');
		// this.createCharts('累计流量');
	},
	methods: {
		createCharts(name) {
			// 生成charts
			let seriesData = [];
			let categories = [];

			for (const item of seriesMock) {
				const { tm, z } = item;
				categories.push(timeFormat(new Date(tm), 'MM-dd'));
				seriesData.push(z);
			}
			this.chartData = {
				categories,
				series: [
					{
						name,
						data: seriesData
					}
				]
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-equiment {
	background-color: #f5f5f5;

	&__title {
		padding: 20rpx;
		.label-icon {
			width: 24rpx;
			height: 28rpx;
			margin-right: 15rpx;
			background: url('~@/static/img/work-space/detail/label_icon.png') no-repeat;
			background-size: 100%;
		}
	}

	&__head {
		margin-bottom: 10rpx;
		padding: 0 20rpx 20rpx;
		&-content {
			color: #333;
			font-size: 30rpx;
			line-height: 45rpx;

			.time-flow {
				font-size: 40rpx;
				font-weight: bold;
				padding: 0 10rpx;
				font-family: DIN;
			}

			.all-time {
				color: #07cd48;
			}

			.all-flow {
				color: #1890ff;
			}
		}
	}

	&__base {
		padding: 0 5rpx 20rpx;
		margin-bottom: 10rpx;
		.info {
			height: 169rpx;
			background: #f5f5f5;
			box-sizing: border-box;
			padding: 20rpx 20rpx;
		}
	}

	&__chart {
		padding: 0 20rpx 20rpx;
		margin-bottom: 10rpx;

		.charts-box {
			box-sizing: border-box;
		}
	}
}
</style>
