<template>
	<view class="form-map-search flex flex-direction height_full bg-white">
		<sk-navbar rightText="搜索" rightIconColor="#fff" @rightClick="handleSearch(keyword)">
			<view class="" slot="center">
				<u-search
					borderColor="#fff"
					shape="square"
					bgColor="#fff"
					placeholder="请输入关键字"
					:showAction="false"
					clearabled
					v-model="keyword"
					searchIcon="search"
					@focus="show = true"
					@search="handleSearch(keyword)"
					@custom="handleCancel"
					@clear="(keyword = ''), (show = false)"
					@blur="keyword === '' && (show = false)"
				></u-search>
			</view>
		</sk-navbar>

		<view class="form-map-search__content search-history flex-1 heignt_0">
			<view class="search-history__head flex align-center justify-between">
				<u--text :text="show ? '搜索内容' : '搜索历史'" color="#222" size="32rpx" bold></u--text>

				<u--text text="清除搜索记录" color="#888" size="26rpx" align="right" v-show="!show" @tap="clearAllStorage"></u--text>
			</view>

			<view class="search-history__content" v-show="!show">
				<view class="history-item" v-for="item in historyRecord" :key="item.id">
					<view class="history-item__content flex align-center justify-between" @tap="handleSearch(item.label)">
						<u-icon name="/static/img/history.png" size="27rpx"></u-icon>
						<u--text :text="item.label" color="#222" size="30rpx"></u--text>
						<view @tap.stop="clearStorageById(item.id)"><u-icon name="/static/img/close.png" size="16rpx"></u-icon></view>
					</view>
					<u-line color="#ddd" margin="0 20rpx"></u-line>
				</view>
			</view>
			<view class="search-history__file_list" v-show="show">
				<view class="file-list__content" v-for="item in fileList" :key="item.id">
					<view class="file-name flex align-center justify-between" @tap="handleClickFile(item)">
						<view class="flex align-center">
							<u-icon name="search" size="40rpx"></u-icon>
							<u--text :text="item.name" color="#222" size="30rpx" margin="0 0 0 20rpx"></u--text>
						</view>
						<u-icon name="arrow-right" size="30rpx"></u-icon>
					</view>
					<u-line color="#ddd"></u-line>
				</view>
				<!-- 暂无数据   -->
				<u-empty v-show="fileList.length === 0" mode="list" style="padding-top: 100px;" text="搜索内容为空"></u-empty>
			</view>
		</view>

		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
export default {
	name: 'form-map-search',
	data() {
		return {
			keyword: '',
			historyRecord: [],
			fileList: [],
			show: false
		};
	},
	onLoad(option) {
		const storage = uni.getStorageSync('WORK_SPACE');
		this.historyRecord = storage ? JSON.parse(storage) : [];
	},
	methods: {
		async handleSearch(keyword) {
			try {
				// 搜索，并缓存 全局搜索（综合地图页）
				this.show = true;
				this.keyword = keyword;
				this.fileList = [];
				let history = [];
				const response = await apiServer.getDashboardSearchApi(keyword);
				if (response.code === 200) {
					this.fileList = response.data;
					const storage = uni.getStorageSync('WORK_SPACE');
					if (storage) history = JSON.parse(storage);
					if (keyword && !history.find(v => v.label == keyword)) {
						history.unshift({
							id: this.$u.guid(),
							label: keyword
						});
						uni.setStorageSync('WORK_SPACE', JSON.stringify(history));
					}
				}
				this.historyRecord = history;
			} catch (e) {
				//TODO handle the exception
				this.fileList = [];
				console.error('搜索，并缓存 全局搜索（综合地图页）', e);
			}
		},
		handleClickFile(item) {
			// 返回上级页面时触发的事件
			const { type, longitude, latitude, areaCoordinate } = item;
			if ((type === 'project' && (!areaCoordinate || areaCoordinate.length === 0)) || (type !== 'project' && (!longitude || !latitude))) {
				this.$refs.uToast.show({
					type: 'default',
					message: '当前测点经纬度不全'
				});
				return;
			}
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('on-search', item);
			this.handleCancel();
		},
		handleCancel() {
			// 返回
			uni.navigateBack();
		},
		clearStorageById(id) {
			// 删除单个记录
			let history = [];
			const storage = uni.getStorageSync('WORK_SPACE');
			if (!id || !storage) return;
			history = JSON.parse(storage).filter(v => v.id !== id);
			uni.setStorageSync('WORK_SPACE', JSON.stringify(history));
			this.historyRecord = history;
		},
		clearAllStorage() {
			// 清空全部缓存
			this.historyRecord = [];
			uni.removeStorageSync('WORK_SPACE');
		}
	}
};
</script>

<style lang="scss" scoped>
.form-map-search {
	padding: 30rpx 0;

	&__head {
	}

	&__content {
		padding: 30rpx;
		overflow-y: auto;

		.search-history__content {
			.history-item {
				&__content {
					padding: 36rpx 0;
					.u-text {
						padding: 0 30rpx;
					}
				}

				.u-line {
					width: calc(100% - 40rpx) !important;
				}
			}
		}

		.search-history__file_list {
			.file-list__content {
				.file-name {
					padding: 36rpx 0;
				}
			}
		}
	}
}
</style>
