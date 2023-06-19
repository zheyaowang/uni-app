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
				<view class="study-panel__info">
					<view class="flex">
						<view v-for="(item,index) in menuList" :key="index" class="menu-normal flex-1 text-center" :class="index===menuCurrent?'menu-active':''" @click="menuSelect(item,index)" >
							{{ item.label }}
						</view>
					</view>
					<view class="bg-white" style="padding: 15rpx;">
						<view class="flex">
							<view class="flex-1 flex">
								<view class="flex justify-center align-center card-info blue">
									<u--image shape="circle" width="100rpx" height="100rpx" src=""></u--image>
									<view style="margin-left: 35rpx" class="flex-1">
										<view class="title">5</view>
										<view class="grade">日常练习</view>
									</view>
								</view>
							</view>
							<view class="flex-1 flex">
								<view class="flex justify-center align-center card-info orange">
									<u--image shape="circle" width="100rpx" height="100rpx" src=""></u--image>
									<view style="margin-left: 35rpx" class="flex-1">
										<view class="title">0</view>
										<view class="grade">考试测试</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="test-panel bg-white">
					<view class="test-panel__title flex justify-between">
						<view style="font-weight: bold;">测试总览</view>
						<view>筛选</view>
					</view>
					<view v-for="item in list" :key="item">
						<view class="time">{{ item.time }}</view>
						<view class="card">
							<view>
								<u-tag text="物理" plain shape="circle"></u-tag>
							</view>
							
						</view>
					</view>
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
				menuCurrent: 0,
				subjectList: [
					{
						label: '全部',
						value: "all"
					},
					{
						label: '物理',
						value: "wl"
					}
				],
				menuList: [
					{
						label: '成绩总览'
					},
					{
						label: '总分分析'
					}
				],
				list: [
					{
						time: '2023-05-04 17:00:00'
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
			},
			menuSelect(e,i) {
				this.menuCurrent = i
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
			.study-panel__info{
				margin-top: 20rpx;
				.menu-normal{
					height: 60rpx;
					line-height: 60rpx;
					background-color: white;
				}
				.menu-active{
					background-color: rgb(24, 144, 255);
					color: white;
				}
				.card-info{
					width: 100%;
					margin: 15rpx;
					padding:  15rpx;
					border-radius: 10rpx;
					.title{
						font-size: 36rpx;
						font-weight: bold;
					}
				}
			}
			.test-panel{
				margin-top: 20rpx;
				.test-panel__title{
					padding: 15rpx;
				}
			}
		}
		.blue{
			border: 1px solid #66b0ff;
		}
		.orange{
			border: 1px solid #ffca08;
		}
	}

</style>
