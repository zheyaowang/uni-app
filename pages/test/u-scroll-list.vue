<template>
	<view class="seck-flex-y height_full padding-lr">
		<u-scroll-list @right="right" @left="left" indicatorWidth="20" :indicator="false" @touchmove.stop>
			<!--这一层主要控制gap间距， 如果不想添加这个盒子，请修改u-scroll-list__scroll-view__content设置margin样式-->
		 	<view class="seck-flex-x gap-sm">
				<!-- 这一层是为了padding出空间给里面的盒子阴影位置 -->
		 		<view v-for="(item, index) in tabList" :key="index" class="padding-xs">
		 			<view @click="scrollItemClick(item, index)" class="box-shadow padding-lr-sm padding-tb-xs seck-flex-y seck-flex-items-center round" :class="{ active: active === index }">
		 				<image class="scroll-list__goods-item__image" :src="active === index ? item.selectedIconPath : item.iconPath"></image>
		 				<text class="scroll-list__goods-item__text">{{ item.label }}</text>
		 			</view>
		 		</view>
		 	</view>
		</u-scroll-list>
		<view class="seck-flex-fill seck-flex-y padding-lr height_0">
			21
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
					label: '稻田水位',
					iconPath: require('@/static/img/farm-work/14-1.png'),
					selectedIconPath: require('@/static/img/farm-work/14-2.png'),
				}, {
					label: '流量监测',
					iconPath: require('@/static/img/farm-work/9-1.png'),
					selectedIconPath: require('@/static/img/farm-work/9-2.png'),
				}, {
					label: '作物展示',
					iconPath: require('@/static/img/farm-work/17-1.png'),
					selectedIconPath: require('@/static/img/farm-work/17-2.png'),
				}, {
					label: '土壤墒情',
					iconPath: require('@/static/img/farm-work/15-1.png'),
					selectedIconPath: require('@/static/img/farm-work/15-2.png'),
				}, {
					label: '视频监控',
					iconPath: require('@/static/img/farm-work/11-1.png'),
					selectedIconPath: require('@/static/img/farm-work/11-2.png'),
				}],
				active: null, // 当前点击的横线滚动里的项的索引
			}
		},
		methods: {
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
			scrollItemClick(item, index) {
				console.log('index', index);
				this.active = index
			}
		}
	}
</script>

<style lang="scss" scoped>
.scroll-list {
	@include flex(column);
	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 4px;
		}

		&__text {
			color: #666;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
			width: 90rpx;
			white-space: nowrap;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}
.active {
	.scroll-list__goods-item__text {
		color: #2EA4FE;
	}
}
</style>
