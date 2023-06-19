<template>
	<view class="detail-paddy-field height_full flex flex-direction bg-white">
		<sk-navbar :title="navbarTitle"></sk-navbar>

		<view class="detail-paddy-field__head">
			<u--text color="#fff" blod size="32rpx" text="实时水位"></u--text>
			<view class="flex align-center" style="margin: 35rpx 0">
				<u--image width="60rpx" height="56rpx" src="/static/img/work-space/detail/head_field_icon.png"></u--image>
				<u--text color="#fff" margin="0 20rpx" blod size="56rpx" :text="`${monitorValue || ' - '}m`"></u--text>
			</view>
			<u--text color="#fff" align="right" margin="8rpx 0 0" blod size="26rpx" :text="monitorTime"></u--text>
		</view>

		<view class="detail-paddy-field__content flex flex-direction flex-1">
			<u-tabs
				:list="timeRangeTabs"
				lineWidth="50rpx"
				:activeStyle="{ color: '#2EA4FE' }"
				:inactiveStyle="{ color: '#999999' }"
				:itemStyle="{ width: '30%', height: '80rpx' }"
				@click="handleClickTab"
			></u-tabs>
			<view class=""><u--text color="#666" margin="20rpx 0" size="28rpx" text="水位当日过程线"></u--text></view>
			<view class="charts-box flex-1"><qiun-data-charts type="line" :opts="opts" :chartData="chartData" /></view>
		</view>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
import { lineOptionFun } from './data.js';
export default {
	name: 'detail-paddy-field',
	data() {
		return {
			id: '',
			navbarTitle: '',
			monitorValue: '',
			monitorTime: '',
			timeRangeTabs: [
				{
					name: '今日水位',
					startTime: timeFormat(new Date()),
					endTime: timeFormat(new Date())
				},
				{
					name: '近三日水位',
					startTime: timeFormat(new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)),
					endTime: timeFormat(new Date())
				},
				{
					name: '近七日水位',
					startTime: timeFormat(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)),
					endTime: timeFormat(new Date())
				}
			],
			startTime: timeFormat(new Date()),
			endTime: timeFormat(new Date()),
			opts: lineOptionFun('水位（m）'),
			chartData: {
				categories: [],
				series: []
			}
		};
	},
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
				const waterInfoGuid = this.id;
				const startTime = this.startTime;
				const endTime = this.endTime;
				const response = await apiServer.getWaterInfoReportApi({ waterInfoGuid, startTime, endTime });
				if (response.code === 200) {
					const { z, tm } = response.data;
					this.monitorValue = z;
					this.monitorTime = timeFormat(new Date(tm), "yyyy-MM-dd HH:mm:ss");
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
		createCharts({ waterDataList, stnm }) {
			// 生成charts
			let seriesData = [];
			let categories = [];
			for (const item of waterDataList) {
				const { tm, z } = item;
				categories.push(timeFormat(new Date(tm), 'MM-dd'));
				seriesData.push(z);
			}
			this.chartData = {
				categories,
				series: [
					{
						name: this.navbarTitle,
						data: seriesData
					}
				]
			};
		},
		handleClickTab({ startTime, endTime }) {
			// 切换时间tab
			this.startTime = startTime;
			this.endTime = endTime;
			this.getMonitorInfo();
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-paddy-field {
	&__head {
		height: 300rpx;
		padding: 40rpx 70rpx 62rpx 50rpx;
		box-sizing: border-box;
		background: url('~@/static/img/work-space/detail/detail_bg.png') no-repeat;
		background-size: 100%;
	}

	&__content {
		padding: 0 20rpx;
		.u-tabs {
			border-bottom: 1rpx solid #ddd;

			/deep/ .u-tabs__wrapper__nav__line {
				bottom: -1rpx;
			}
			/deep/ .u-tabs__wrapper__nav__item__text {
				// font-weight: bold;
				font-size: 28rpx;
			}
		}

		.charts-box {
		}
	}
}
</style>
