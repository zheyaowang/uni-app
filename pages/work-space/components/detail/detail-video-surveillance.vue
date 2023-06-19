<template>
	<view class="detail-video-surveillance flex flex-direction height_full">
		<sk-navbar :title="navbarTitle"></sk-navbar>
		<view class="detail-video-surveillance__head bg-white">
			<view class="big-video-box">
				<video style="width: 100%;height: 100%;" :src="currentVideo.localhlsurl"></video>
			</view>
			<view class="info-content">
				<view class="video-title" style="padding: 15rpx 0 10rpx;">{{ currentVideo.videoname || '摄像机名称' }}</view>
				<view class="flex align-center justify-between">
					<view class="info flex align-center">
						<view class="label">状态：</view>
						<view class="value" style="color: #2EA4FE;">{{ `${currentVideo.videostateenumid || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">ID：</view>
						<view class="value" style="color: #333;">{{ `${currentVideo.videocode || ' -- '}` }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="video-content-label">其他视频监测点</view>
		<view class="video-content bg-white flex-1 height_0">
			<view class="small-video-item flex align-center" v-for="item in videoList" :key="item.id" @tap="handleClickVideo(item)">
				<view class="small-video-box"></view>
				<view class="info-content">
					<view class="video-title">{{ item.markerName }}</view>
					<view class="info flex align-center">
						<view class="label">状态：</view>
						<view class="value" style="color: #2EA4FE;">{{ `${item.attrbuites.videostateenumid || ' -- '}` }}</view>
					</view>
					<view class="info flex align-center">
						<view class="label">ID：</view>
						<view class="value" style="color: #333;">{{ `${item.attrbuites.videocode || ' -- '}` }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'detail-video-surveillance',
	data() {
		return {
			navbarTitle: '',
			currentVideo: {
				localhlsurl: '',
				videoname: '',
				videostateenumid: '',
				videocode: ''
			}
		};
	},
	computed: {
		...mapGetters('workSpace', ['monitorList']),
		videoList() {
			return this.monitorList.filter(v => v.markerType === 'videosurveillance');
		}
	},
	onLoad(option) {
		// 获取监测点列表
		if (this.monitorList.length === 0) this.$store.dispatch('workSpace/GetMapMonitorMarkerList');
		// 获取稻田水位监测详情
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		const currentVideo = this.monitorList.find(v => v.attrbuites.id === id);
		this.navbarTitle = title;
		this.handleClickVideo(currentVideo);
	},
	methods: {
		handleClickVideo({ attrbuites }) {
			this.currentVideo = attrbuites;
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-video-surveillance {
	.video-title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 48rpx;
	}
	.label {
		color: #4d4d4d;
	}
	.value {
		font-weight: 500;
	}
	&__head {
		height: 500rpx;
		padding: 30rpx;
		box-shadow: 0rpx 6rpx 33rpx 0rpx #e4e9f1;

		.big-video-box {
			height: 340rpx;
			border-radius: 10rpx;
			background-color: #1890ff;
		}
	}

	.video-content-label {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		padding-left: 50rpx;
		position: relative;
		&::before {
			width: 8rpx;
			height: 36rpx;
			background-color: #1890ff;
			position: absolute;
			left: 30rpx;
			top: 20rpx;
			content: '';
		}
	}

	.video-content {
		overflow: auto;
		padding: 0 30rpx;

		.small-video-item {
			padding: 30rpx 0;
			border-bottom: 1px solid #dddddd;

			.small-video-box {
				width: 230rpx;
				height: 140rpx;
				border-radius: 10rpx;
				background: url('~@/static/img/work-space/detail/small_video_bg.png') no-repeat;
				background-size: 100% 100%;
			}

			.info-content {
				margin-left: 30rpx;
			}
		}
	}
}
</style>
