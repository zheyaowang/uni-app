<template>
	<view class="home height_full">
		<sk-navbar :auto-back="false" left-icon=""></sk-navbar>
		<view class="home__content">
			<view class="home__content-head">
				<view class="home__content-head-content">
					<view class="avatar-content flex">
						<view class="avatar-box flex align-center justify-center">
							<u--image shape="circle" width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
						</view>
						<view class="user-info-box flex-1">
							<view class="flex align-center justify-between">
								<u--text color="#fff" size="32rpx" bold :text="userInfo.user.userName"></u--text>
							</view>
							<view class="last-time flex align-center">
								<view class="">{{ userInfo.user.dept.deptName }}/</view>
								<view class="">总管理员</view>
							</view>
						</view>
						<view class="flex justify-center" @tap="goToPages('personal-info')">
							<u-icon name="arrow-right" color="#fff"></u-icon>
						</view>
						
					</view>
				</view>
			</view>
			<u-picker :show="stageShow" :columns="list" keyName="label" @confirm="select" @cancel="stageShow=false"></u-picker>
			<view class="home__content-body">
				<view class="home__content-body-info study">
					<view class="info-header flex justify-between">
						<view>学情探究</view>
						<view class="flex" @click="stageShow = true">
							<view>2022-2023学年下半年</view>
							<u-icon name="arrow-down"></u-icon>
						</view>
					</view>
					<view class="info-content flex">
						<view class="info-content-part flex-1 flex justify-center">
							<view @click="goToPages('student')">
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>学生追踪</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>班级学情</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>学生追踪</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="home__content-body-info study">
					<view class="info-header flex justify-between">
						<view>教学应用</view>
					</view>
					<view class="info-content flex">
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>批改阅卷</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>考后讲评</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								
							</view>
						</view>
					</view>
				</view>
				
				<view class="home__content-body-info study">
					<view class="info-header flex justify-between">
						<view>资源管理</view>
					</view>
					<view class="info-content flex">
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>校本资源</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>市场资源</view>
							</view>
						</view>
						<view class="info-content-part flex-1 flex justify-center">
							<view>
								<u--image width="152rpx" height="152rpx" :src="userInfo.user.avatar"></u--image>
								<view>校本题库</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 模态框 -->
		<sk-modal :show.sync="show" title="温馨提示" content="确定要退出登录吗？" @confirm="layout"></sk-modal>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { timeFormat } from '@/common/util/tools.js';
import configService from '@/common/service/config.service.js';
import { asyncRouteMap } from '@/common/router/modules/routers.js';
export default {
	name: 'my',
	data() {
		return {
			appVersion: '',
			asyncRouteMap,
			show: false,
			stageShow: false,
			list: [
                    [{
                        label: '雪月夜',
                        // 其他属性值
                        id: 2021
                        // ...
                    }, {
                        label: '冷夜雨',
                        id: 804
                    }]
                ],
		};
	},
	computed: {
		...mapGetters('login', ['userInfo']),
		formatData() {
			const { avatar, prevLogTime } = this.userInfo;
			return {
				avatar: configService.fileUrl + avatar,
				prevLogTime: timeFormat(new Date(prevLogTime), 'yyyy-MM-dd HH:mm')
			};
		}
	},
	created() {
		let appVersion = uni.$u.sys().appVersion;
		// #ifdef APP
		appVersion = uni.$u.sys().appWgtVersion;
		// #endif
		this.appVersion = appVersion;
	},
	methods: {
		goToPages(url) {
			// 跳转
			uni.navigateTo({
				url: asyncRouteMap[url]
			});
		},
		select(e) {
			console.log(e)
			this.stageShow = false
		},
		layout() {
			// 退出登录
			this.$store.dispatch('login/Logout');
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	position: relative;
	background-color: #f5f5f5;
	&__content {
		width: 100%;
		height: calc(100% - 90rpx);
		left: 0;
		position: relative;
		&-head {
			width: 100%;
			height: 265rpx;
			background: url('~@/static/img/my/my_bg.png') no-repeat;
			background-size: 100% 100%;
			position: relative;
			.avatar-content {
				width: 100%;
				padding: 30rpx;
				position: absolute;
				top: 25rpx;
				.avatar-box {
					border-radius: 50%;
					border: 2px solid #fff;
				}
				.user-info-box {
					color: #fff;
					margin-left: 30rpx;

					.last-time {
						margin-top: 20rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 40rpx;
					}
				}
			}
		}
		
		&-body {
			width: 100%;
			height: calc(100% - 240rpx);
			background: #F5F5F5;
			border-radius: 20rpx 20rpx 0 0;
			position: absolute;
			top: 240rpx;
			&-info{
				background-color: #ffffff;
				margin: 25rpx;
				border-radius: 20rpx;
				.info-header{
					padding: 20rpx;
					border-bottom: 1px solid #f3f4f6;
				}
				.info-content{
					padding: 20rpx;
					.info-content-part{
						text-align: center;
						border-right: 1px solid #f3f4f6;
						&:last-child{
							border-right: none;
						}
					}
				}
			}
		}
		&-info {
			padding: 45rpx 30rpx 45rpx 50rpx;

			.field {
				margin-top: 15rpx;
				color: #333;
			}

			.edit-btn {
				width: 120rpx;
				height: 45rpx;
				background: #0365ee;
				box-shadow: 0rpx 1rpx 15rpx 0rpx rgba(9, 61, 146, 0.2);
				border-radius: 2rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #ffffff;
				line-height: 20rpx;
			}
		}

		&-content {
			margin: 30rpx;
			padding: 10rpx 20rpx 0 30rpx;
			background: #ffffff;
			box-shadow: 0rpx 5rpx 20rpx 0rpx #e4e9f1;
			border-radius: 8rpx;

			.u-cell {
				padding: 10rpx 0;
				/deep/ .u-cell__body {
					padding: 10px 0;
				}
			}
			/deep/.no-line .u-line {
				display: none;
			}
			/deep/ .u-cell--clickable {
				background-color: #fff;
			}
			.title {
				margin-left: 20rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
			}
		}
	}
}
</style>
