<template>
	<view class="water-fertilizer seck-flex-y">
		<sk-navbar :auto-back="false" left-icon="" :placeholder="true" bg-color="transparent"></sk-navbar>
		<view class="bg-header">
			<u--image :showLoading="true" src="/static/img/water-fertilizer/water-fertilizer-header.png" width="100%"
				@click="click"></u--image>
		</view>
		<view class="seck-flex-fill seck-flex-y content">
			<view class="content-box" style="">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'water-fertilizer',
		data() {
			return {

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
			background-color: green;
			margin-top: 260rpx;
			z-index: 1024;
		}
	}
</style>