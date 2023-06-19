<template>
	<view class="list-equiment height_full">
		<sk-navbar></sk-navbar>
		<view class="list-equiment__head flex align-center justify-between">
			<view
				class="item-head flex flex-direction align-center justify-center"
				v-for="item in mapEquimentOptions"
				:key="item.name"
				:class="{ 'active-head': activeMonitoring === item.name }"
				@tap="handleTapActive(item)"
			>
				<u--image width="59rpx" height="69rpx" :showLoading="false" :src="activeMonitoring === item.name ? item.detailIconSelected : item.detailIcon"></u--image>
				<view class="item-head__title">{{ item.title }}</view>
			</view>
		</view>

		<view class="list-equiment__content"><component-list :list="list"></component-list></view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapEquimentOptions } from '../../data.js';
import componentList from './component-list.vue';
export default {
	name: 'list-equiment',
	data() {
		return {
			mapEquimentOptions,
			activeMonitoring: 'pump'
		};
	},
	components: { componentList },
	computed: {
		...mapGetters('workSpace', ['equimentList']),
		list() {
			return this.equimentList.filter(v => v.markerType === this.activeMonitoring);
		}
	},
	created() {
		// 获取工况列表 工况和远控是相同设备
		if (this.equimentList.length === 0) this.$store.dispatch('workSpace/GetMapEquimentMarkerList');
	},
	methods: {
		handleTapActive({ name }) {
			this.activeMonitoring = name;
		}
	}
};
</script>

<style lang="scss" scoped>
.list-equiment {
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
				width: 130rpx;
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
