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
				cellLists: [{
						icon: '/static/img/water-fertilizer/1.png',
						title: '用水管理',
						url: '/pages/water-fertilizer/components/use-water'
					},
					{
						icon: '/static/img/water-fertilizer/2.png',
						title: '施肥管理',
						url: '/pages/water-fertilizer/components/fertilizer'
					},
					{
						icon: '/static/img/water-fertilizer/3.png',
						title: '用药管理',
						url: '/pages/water-fertilizer/components/use-pesticide'
					}
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
