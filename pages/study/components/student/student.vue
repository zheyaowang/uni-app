<template>
	<view class="student height_full bg-white">
		<sk-navbar/>
		<view class="student-header">
			<view class="">
				<!-- <view class="flex-1">班级:</view> -->
				<view class="">
					<u-scroll-list :indicator="false">
						<view v-for="(item, index) in list" :key="index" class="normal">
							<u-button :class="index===current?'active':''" :text="item.value" @click="select(item,index)"></u-button>
						</view>
					</u-scroll-list>
				</view>
			</view>
			<view>
				 <u--input
				    placeholder="搜索"
					 prefixIcon="search"
				    v-model="name"
				    @change="change"
				  ></u--input>
			</view>
		</view>
		<view class="student-content"> 
			<view v-for="(item,index) in studentList" :key="index" class="info" @click="detail(item)">
				<view class="flex justify-center height_full align-center">
					<u--image shape="circle" width="75rpx" height="75rpx" src="/static/img/water-fertilizer/water-fertilizer-header.png"></u--image>
					<view style="margin-left: 15rpx; width: 150rpx;">
						<view class="name">{{ item.label }}</view>
						<view class="phone">{{ item.phone }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { asyncRouteMap } from '@/common/router/modules/routers.js';
	export default {
		data() {
			return {
				current: 0,
				list: [
					{
						label:1,
						value:"行政1班"
					},
					{
						label:2,
						value:"行政2班"
					},
					{
						label:3,
						value:"行政3班"
					},
					{
						label:11,
						value:"行政4班"
					},
					{
						label:22,
						value:"行政5班"
					},
					{
						label:33,
						value:"行政6班"
					},
				],
				name: "",
				studentList: [
					{
						label: 'wzy',
						value: 1,
						phone: '123456'
					},
					{
						label: 'wzy2',
						value: 2,
						phone: ''
					},
					{
						label: 'wzy',
						value: 1,
						phone: '123456'
					},
					{
						label: 'wzy44222222',
						value: 2,
						phone: ''
					},
					{
						label: 'wzy',
						value: 1,
						phone: '123456'
					},
					{
						label: 'wzy2',
						value: 2,
						phone: '1234562'
					},
				]
			}
		},
	
		methods: {
			select(e,i) {
				this.current = i
				console.log(e,i)
			},
			change(e) {
				console.log(e)
			},
			detail(e) {
				uni.navigateTo({
					url: asyncRouteMap['student-detail'] + '?value='+e.value
				});
			}
		},
	}
</script>


<style scoped lang="scss">
	.student{
		&-header {
			padding: 15rpx;
			.normal{
				margin-right: 10rpx;
			}
			.active{
				background-color: rgb(24, 144, 255);
				color: white;
			}
		}
		&-content {
			.info{
				padding: 10rpx;
				width: 33.333%;
				display: inline-block;
				height: 140rpx;
				border: 1px solid #ebedf0;
				.name{
					font-size: 36rpx;
					font-weight: bold;
					overflow:hidden;
					text-overflow:ellipsis;
				}
			}
		}
	}
</style>
