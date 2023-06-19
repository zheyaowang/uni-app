<template>
	<view class="my height_full">
		<sk-navbar :auto-back="false" left-icon="" bg-color="transparent"></sk-navbar>
		<view class="my__content">
			<view class="my__content-head">
				<view class="my__content-head-content">
					<view class="avatar-content flex">
						<view class="avatar-box flex align-center justify-center">
							{{ formatData }}
							<u--image shape="circle" width="152rpx" height="152rpx" :src="formatData.avatar"></u--image>
						</view>
						<view class="user-info-box flex-1">
							<view class="flex align-center justify-between">
								<u--text color="#fff" size="32rpx" bold :text="userInfo.realName"></u--text>
								<u-icon name="/static/img/my/qr.png" size="30rpx"></u-icon>
							</view>
							<view class="last-time flex align-center">
								<view class="">上次登录时间：</view>
								<view class="">{{ formatData.prevLogTime }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="my__content-info bg-white">
				<view class="organize flex align-center justify-between">
					<u--text color="#333" size="32rpx" bold :text="userInfo.organize"></u--text>
					<view class="edit-btn flex align-center justify-center" @tap="goToPages('personal-info')">
						<u-icon name="/static/img/my/edit_icon.png" size="20rpx"></u-icon>
						<view style="margin-left: 10rpx;">编辑</view>
					</view>
				</view>
				<view class="field flex align-center">
					<view class="">负责田地：</view>
					<view class="">{{ '--' }}</view>
				</view>
			</view>

			<view class="my__content-content">
				<u-cell-group :border="false">
					<u-cell :url="asyncRouteMap['operation-manual']" isLink>
						<u--image slot="icon" width="41rpx" height="45rpx" src="/static/img/my/my_icon_1.png"></u--image>
						<view slot="title" class="title">使用手册</view>
					</u-cell>
					<u-cell :url="asyncRouteMap['consultation-service']" isLink>
						<u--image slot="icon" width="45rpx" height="43rpx" src="/static/img/my/my_icon_2.png"></u--image>
						<view slot="title" class="title">咨询服务</view>
					</u-cell>
					<u-cell class="no-line" :value="`V${appVersion}`">
						<u--image slot="icon" width="45rpx" height="45rpx" src="/static/img/my/my_icon_3.png"></u--image>
						<view slot="title" class="title">版本号</view>
					</u-cell>
				</u-cell-group>
			</view>

			<view class="my__content-content bg-white">
				<u-cell-group :border="false">
					<u-cell class="no-line" isLink @click="show = true">
						<u--image slot="icon" width="50rpx" height="50rpx" src="/static/img/my/my_icon_4.png"></u--image>
						<view slot="title" class="title">退出</view>
					</u-cell>
				</u-cell-group>
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
			show: false
		};
	},
	computed: {
		...mapGetters('login', ['userInfo']),
		formatData() {
			const { avatar, prevLogTime } = this.userInfo;
			console.log(this.formatData)
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
		layout() {
			// 退出登录
			this.$store.dispatch('login/Logout');
		}
	}
};
</script>

<style lang="scss" scoped>
.my {
	position: relative;
	background-color: #f5f5f5;
	&__content {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		&-head {
			width: 100%;
			height: 465rpx;
			background: url('~@/static/img/my/my_bg.png') no-repeat;
			background-size: 100% 100%;
			position: relative;
			.avatar-content {
				width: 100%;
				padding: 30rpx;
				position: absolute;
				bottom: -65rpx;
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
