<template>
	<view class="component-list">
		<view class="item-content bg-white" v-for="item in list" :key="item.id" @tap="$u.debounce(goToPages(item), 300)">
			<view class="item-content__head flex align-center">
				<view class="">{{ item.markerName }}</view>
				<u-button
					:type="item.attrbuites.state === '正常' ? 'success' : item.attrbuites.state === '离线' ? 'warning' : 'error'"
					size="mini"
					class="custom-style"
					:text="item.attrbuites.state || ' -- '"
				></u-button>
			</view>
			<!-- ---------监测点信息 ---------------->
			<template v-if="layers.includes(item.markerType)">
				<!-- 稻田水位 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'paddyField'">
					<view class="info flex align-center">
						<view class="label">实时水位：</view>
						<view class="value">{{ `${item.attrbuites.z || ' -- '}m` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">水位上下限：</view>
						<view class="value">{{ `${item.attrbuites.lower || ' -- '}m ~ ${item.attrbuites.upper || ' -- '}m` }}</view>
					</view>
				</view>
				<!-- 流量监测 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'flowMonitoring'">
					<view class="info flex align-center">
						<view class="label">瞬时流量：</view>
						<view class="value">{{ `${item.attrbuites.q || ' -- '}m³/s` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">累计流量：</view>
						<view class="value">{{ `${item.attrbuites.qa || ' -- '}m³` }}</view>
					</view>
				</view>
				<!-- 作物长势 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'cropGrowth'">
					<view class="info flex align-center">
						<view class="label">透光度：</view>
						<view class="value">{{ `${item.attrbuites.leafLightTransmittance || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">生长进度：</view>
						<view class="value">{{ `${item.attrbuites.stageName || ' -- '}` }}</view>
					</view>
				</view>
				<!-- 土壤墒情 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'soil'">
					<view class="info flex align-center">
						<view class="label">温度：</view>
						<view class="value">{{ `${item.attrbuites.temp00 || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">盐度：</view>
						<view class="value">{{ `${item.attrbuites.salinity || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">湿度：</view>
						<view class="value">{{ `${item.attrbuites.mc10 || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">地表距离：</view>
						<view class="value">-0.1m</view>
					</view>
				</view>
				<!-- 视频监控 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'videosurveillance'">
					<view class="info flex align-center">
						<view class="label">状态：</view>
						<view class="value">{{ `${item.attrbuites.state || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">ID：</view>
						<view class="value">{{ `${item.attrbuites.videocode || ' -- '}` }}</view>
					</view>
				</view>
				<!-- 田间虫害 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'insect'">
					<view class="info flex align-center">
						<view class="label">分析结果：</view>
						<view class="value">{{ `${item.attrbuites.rt ? item.attrbuites.rt.analysisResults : ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">处理结果：</view>
						<view class="value">{{ `${item.attrbuites.rt ? item.attrbuites.rt.handleResults : ' -- '}` }}</view>
					</view>
				</view>
				<!-- 输水管压力 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'pipepressure'">
					<view class="info flex align-center">
						<view class="label">压力：</view>
						<view class="value">{{ `${item.attrbuites.pressValue || ' -- '}兆帕` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">预警值：</view>
						<view class="value">{{ `${item.attrbuites.warnValue || ' -- '}兆帕` }}</view>
					</view>
				</view>
				<!-- 气象监测 -->
				<view class="item-content__content flex align-center justify-between" v-if="item.markerType === 'weatherwatches'">
					<view class="info flex align-center">
						<view class="label">温度：</view>
						<view class="value">{{ `${item.attrbuites.rt ? item.attrbuites.rt.temperature : ' -- '}` }}</view>
					</view>
					<!-- <view class="info flex align-center">
						<view class="label">天气：</view>
						<view class="value"></view>
					</view> -->
					<view class="info flex align-center">
						<view class="label">湿度：</view>
						<view class="value">{{ `${item.attrbuites.rt ? item.attrbuites.rt.humidity : ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">风向：</view>
						<view class="value">{{ `${item.attrbuites.rt ? item.attrbuites.rt.windDirection : ' -- '}` }}</view>
					</view>
				</view>
			</template>
			<!-- ---------工况信息 ---------------->
			<template v-if="equiments.includes(item.markerType)">
				<view class="item-content__content flex align-center justify-between">
					<view class="info flex align-center">
						<view class="label">负责人：</view>
						<view class="value">{{ item.attrbuites.responsiblePerson || ' -- ' }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">负责人电话 ：</view>
						<view class="value">{{ item.attrbuites.responsiblePhoneNumber || ' -- ' }}</view>
					</view>
				</view>
			</template>
		</view>

		<!-- 暂无数据   -->
		<u-empty v-show="list.length === 0" mode="list" style="padding-top: 100px;"></u-empty>
	</view>
</template>
<script>
import { mapEquimentOptions, mapLayerOptions } from '../../data.js';
import { asyncRouteMap } from '@/common/router/modules/routers.js';
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	name: 'list-monitoring',
	data() {
		return {};
	},
	computed: {
		equiments() {
			// 工况设备类型
			return mapEquimentOptions.map(v => v.name);
		},
		layers() {
			// 监测点类型
			return mapLayerOptions.map(v => v.name);
		}
	},
	methods: {
		goToPages(item) {
			// 跳转详情
			const { attrbuites, detailUrl, markerName: title, markerType } = item;
			const id = attrbuites.id;
			let data = { id, title };
			if(markerType === 'weatherwatches') {
				const temperature = item.attrbuites.rt ? item.attrbuites.rt.temperature : ' -- '
				data= { ...data, temperature }
			}
			uni.navigateTo({
				url: asyncRouteMap[detailUrl] + '?data=' +  encodeURIComponent(JSON.stringify(data))
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.component-list {
	.item-content {
		padding: 30rpx;
		box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin-bottom: 20rpx;
		&__head {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			line-height: 48rpx;

			.custom-style {
				width: 72rpx;
				min-width: auto;
				height: 30rpx;
				margin: 0 15rpx;
			}
		}

		&__content {
			padding-top: 10rpx;
			.info {
				font-size: 24rpx;
				.label {
					color: #666;
				}

				.value {
					color: #333;
				}
			}
		}
	}
}
</style>
