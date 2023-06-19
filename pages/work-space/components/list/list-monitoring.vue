<template>
	<view class="list-monitoring height_full">
		<sk-navbar></sk-navbar>
		<view class="list-monitoring__head">
			<u-scroll-list :indicator="false">
				<view
					class="item-head flex flex-direction align-center justify-center"
					v-for="item in mapLayerOptions"
					:key="item.name"
					:class="{ 'active-head': activeMonitoring === item.name }"
					@tap="handleTapActive(item)"
				>
					<u--image width="59rpx" height="69rpx" :showLoading="false" :src="activeMonitoring === item.name ? item.detailIconSelected : item.detailIcon"></u--image>
					<view class="item-head__title">{{ item.title }}</view>
				</view>
			</u-scroll-list>
		</view>

		<view class="list-equiment__content"><component-list :list="list"></component-list></view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapLayerOptions } from '../../data.js';
import componentList from './component-list.vue';
export default {
	name: 'list-monitoring',
	data() {
		return {
			mapLayerOptions,
			activeMonitoring: 'paddyField',
		};
	},
	components: { componentList },
	computed: {
		...mapGetters('workSpace', ['monitorList']),
		list() {
			return this.monitorList.filter(v => v.markerType === this.activeMonitoring)
		}
	},
	created() {
		// 获取监测点列表
		if(this.monitorList.length === 0) this.$store.dispatch('workSpace/GetMapMonitorMarkerList')
	},
	methods: {
		handleTapActive({ name }) {
			this.activeMonitoring = name;
		}
	}
};
</script>

<style lang="scss" scoped>
.list-monitoring {
	padding: 20rpx;
	&__head {
		.item-head {
			margin: 10rpx 0 10rpx 30rpx;
			padding: 15rpx;
			background: #ffffff;
			box-shadow: 0rpx 5rpx 13rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 15rpx;
			margin-left: 20rpx;

			&__title {
				width: 120rpx;
				color: #666;
				text-align: center;
				font-size: 24rpx;
				margin-top: 10rpx;
			}

			&.active-head .item-head__title {
				color: #2ea4fe;
			}

			&:first-child {
				margin-left: 0;
			}
		}
	}
}
</style>
