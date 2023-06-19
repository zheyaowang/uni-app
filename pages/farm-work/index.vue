<template>
	<view class="water-fertilizer seck-flex-y">
		<sk-navbar :auto-back="false" left-icon="" :placeholder="true" bg-color="transparent"></sk-navbar>
		<view class="bg-header">
			<u--image :showLoading="true" src="/static/img/water-fertilizer/water-fertilizer-header.png" width="100%"></u--image>
		</view>
		<view class="seck-flex-fill seck-flex-y content">
			<view class="content-box" style="">
				<u-cell-group :border="false">
					<u-cell v-for="(item, index) in cellLists" :key="index" :icon="item.icon"
						:title="item.title" :border="false" center isLink :iconStyle="{ width: '50rpx', height: '50rpx' }"
						:titleStyle="{ marginLeft: '25rpx', fontWeight: 550 }" size="large"
						:url="item.url"></u-cell>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'water-fertilizer',
		data() {
			return {
				cellLists: [
					{
						icon: '/static/img/farm-work/1.png',
						title: '农事管理',
						url: '/pages/farm-work/components/farm-work-manage'
					},
					{
						icon: '/static/img/farm-work/2.png',
						title: '设备安康管理',
						url: '/pages/farm-work/components/device-manage'
					},
					// {
					// 	icon: '/static/img/farm-work/2.png',
					// 	title: '设备安康管理nvue测试页',
					// 	url: '/pages/farm-work/components/test'
					// }
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.water-fertilizer {
		height: 100%;
		position: relative;
	}

	.bg-header {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}

	.content {
		padding: 0 40rpx;

		&-box {
			width: 100%;
			height: 400rpx;
			margin-top: 260rpx;
			z-index: 1024;
		}
	}

	/deep/.u-cell {
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	}
</style>
