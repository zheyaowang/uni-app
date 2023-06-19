<template>
	<view class="consultation-service">
		<sk-navbar back-native></sk-navbar>
		<view class="consultation-service__head flex justify-center">
			<u--image src="/static/img/consultation_bg.png" width="388rpx" height="351rpx"></u--image>
		</view>

		<view class="consultation-service__content">
			<view class="consultation-item flex align-center justify-between" v-for="(item, index) in consultationOption" :key="index">
				<view class="item-label">
					<u--text :text="item.label" color="#4E5969" size="26rpx"></u--text>
				</view>
				<view class="item-value">
					<u--text mode="name" format="encrypt" :text="item.value" color="#4E5969" size="26rpx"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { consultationOption } from './data.js';
export default {
	name: 'consultation-service',
	data() {
		return {
			consultationOption
		};
	}
};
</script>

<style lang="scss" scoped>
.consultation-service {
	&__head {
		padding-top: 166rpx;
	}
	
	&__content {
		padding: 100rpx 78rpx 0 80rpx;
		
		.consultation-item {
			padding-top: 74rpx;
		}
	}
}
</style>
