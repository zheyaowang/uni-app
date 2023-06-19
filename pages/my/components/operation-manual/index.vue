<template>
	<view class="operation-manual">
		<sk-navbar back-native></sk-navbar>
		<u-empty mode="list" text="暂无使用手册"></u-empty>
	</view>
</template>

<script>
export default {
	name: 'operation-manual',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
	.operation-manual {
		padding-top: 100rpx;
	}
</style>
