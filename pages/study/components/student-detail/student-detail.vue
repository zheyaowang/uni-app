<template>
	<view class="student-detail height_full">
		<sk-navbar/>
		<view class="student-detail__header bg-white flex"> 
			<view class="flex justify-center height_full align-center">
				<u--image shape="circle" width="100rpx" height="100rpx" src="/static/img/water-fertilizer/water-fertilizer-header.png"></u--image>
				<view style="margin-left: 35rpx; width: 400rpx;">
					<view class="name">陈一帆</view>
					<view class="grade">2020级教学部 行政1班</view>
				</view>
			</view>
		</view>
		<view class="student-detail__content flex-1">
			<!-- <view v-if="" class="flex justify-center height_full aligindexn-center">
				暂无数据
			</view> -->
			<view class="height_full">
				<view v-for="(item,index) in subjectList" :key="index" class="normal" :class="index===current?'active':''" @click="select(item,index)">
					{{ item.label }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				current: 0,
				subjectList: [
					{
						label: '全部',
						value: "all"
					},
					{
						label: '物理',
						value: "wl"
					}
				]
			}
		},
		onLoad(option) {
			this.value = option.value
			console.log(444, this.value)
		},
		methods: {
			select(e,i) {
				this.current = i
			}
		}
	}
</script>

<style scoped lang="scss">
	.student-detail{
		display: flex;
		flex-direction: column;
		&__header {
			padding: 30rpx;
			.name{
				font-size: 40rpx;
				font-weight: bold;
			}
			.grade{
				color: #ccc;
			}
		}
		&__content {
			padding: 20rpx;
			.normal{
				display: inline-block;
				padding: 5rpx 15rpx;
				margin-right: 10rpx;
			}
			.active{
				background-color: rgb(24, 144, 255);
				border-radius: 10%;
				color: white;
			}
		}
	}

</style>
