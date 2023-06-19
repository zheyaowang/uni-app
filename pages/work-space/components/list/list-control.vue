<template>
	<view class="list-control bg-white flex flex-direction height_full">
		<sk-navbar></sk-navbar>

		<view class="list-control__head">
			<view class="list-control__head-type flex align-center justify-between">
				<view
					class="item flex align-center justify-center"
					:class="{ 'active-type': activeType === item.label }"
					v-for="item in options"
					:key="item.label"
					@tap="handleTapType(item)"
				>
					<view style="padding: 0 30rpx;">{{ item.label }}</view>
				</view>
			</view>

			<view class="list-control__head-equiment flex align-center justify-between">
				<view
					class="item-head flex flex-direction align-center justify-center"
					v-for="item in mapEquimentOptions"
					:key="item.name"
					:class="{ 'active-head': activeMonitoring === item.name }"
					@tap="handleTapActive(item)"
				>
					<u--image width="59rpx" height="69rpx" :showLoading="false" :src="activeMonitoring === item.name ? item.detailIconSelected : item.detailIcon"></u--image>
					<view class="item-head__title">{{ item.title }}</view>
				</view>
			</view>
		</view>

		<view class="list-control__content flex-1 height_0">
			<view class="item" v-for="item in list" :key="$u.guid()">
				<view class="item-head flex align-center justify-between">
					<view class="equiment-label flex align-center">
						<view class="equiment-name">{{ item.stnm }}</view>
						<view class="equiment-state" :class="{ stop: item.state == '离线' }">{{ item.state }}</view>
					</view>
					<view class="checkbox-box"><checkbox color="#fff" :checked="item.checkbox" style="transform:scale(0.6)" @click="handleTapCheck(item)"></checkbox></view>
				</view>
				<view class="item-content flex align-center justify-between">
					<view class="flex align-center">
						<view><u--text color="#999" customStyle="fontSize: 26rpx" text="控制方式："></u--text></view>
						<u-switch v-model="item.checked" show-label :labelList="['自动', '手动']" :size="20" activeColor="#2EA3FC"></u-switch>
					</view>
					<view class="btn-group flex align-center justify-between">
						<u-button shape="circle" size="mini" :color="buttonColor" class="equipment-style" text="点击开机" @click="handleOpenClose('open', item)"></u-button>
						<u-button shape="circle" size="mini" :color="buttonColor" class="equipment-style" text="点击关机" @click="handleOpenClose('close', item)"></u-button>
					</view>
				</view>
			</view>
		</view>

		<view class="list-control__foot">
			<view class="flex align-center justify-between">
				<view class="checkbox-box flex align-center" style="margin-top: 10rpx;">
					<checkbox color="#fff" :checked="checkAll" style="transform:scale(0.6)" @click="handleTapCheckAll"></checkbox>
					<view @tap="handleTapCheckAll">{{ checkAll ? '取消全选' : '全选' }}</view>
				</view>
				<view class="btn-group flex align-center justify-between">
					<u-button shape="circle" size="mini" :color="buttonColor" class="equipment-style" text="点击全开" @click="handleOpenCloseAll('open', item)"></u-button>
					<u-button shape="circle" size="mini" :color="buttonColor" class="equipment-style" text="点击全关" @click="handleOpenCloseAll('open', item)"></u-button>
				</view>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>

		<view class="height_0">
			<!-- 模态框 -->
			<sk-modal :show.sync="show" title="温馨提示" content="是否确认对所选的设备进行远程开启/关闭操作？" @confirm="handleConfirmOpenClose"></sk-modal>
			<!-- 消息提示 -->
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapEquimentOptions } from '../../data.js';
export default {
	name: 'list-control',
	data() {
		return {
			options: [
				{
					label: '全部',
					name: ['远控', '现地', '远控现地']
				},
				{
					label: '远控',
					name: ['远控', '远控现地']
				},
				{
					label: '现地',
					name: ['现地', '远控现地']
				}
			],
			activeType: '全部',
			activeTypeName: ['远控', '现地', '远控现地'],
			mapEquimentOptions,
			activeMonitoring: 'pump',
			list: [],
			checkAll: false,
			checkList: [],
			buttonColor: 'linear-gradient(to right, #62BFF6, #526BCA)',
			show: false
		};
	},
	computed: mapGetters('workSpace', ['equimentList']),
	watch: {
		equimentList: {
			handler() {
				this.createEquimentList();
			},
			deep: true,
			immediate: true
		}
	},
	async created() {
		// 获取工况列表 工况和远控是相同设备
		if (this.equimentList.length === 0) await this.$store.dispatch('workSpace/GetMapEquimentMarkerList');
	},
	methods: {
		handleTapType({ label, name }) {
			// 切换控制方式
			if (this.activeType !== label) {
				this.checkAll = false;
				this.activeType = label;
				this.activeTypeName = name;
				this.checkList = [];
				this.createEquimentList();
			}
		},
		handleTapActive({ name }) {
			// 切换设备类型
			if (this.activeMonitoring !== name) {
				this.checkAll = false;
				this.activeMonitoring = name;
				this.checkAll = false;
				this.checkList = [];
				this.createEquimentList();
			}
		},
		handleTapCheck(item) {
			// 单个选择
			item.checkbox = !item.checkbox;
			this.checkAll = false;
			this.createCheckList();
		},
		handleTapCheckAll() {
			// 全选反选
			this.checkAll = !this.checkAll;
			let list = [];
			for (let item of this.list) {
				const { checkbox } = item;
				item.checkbox = this.checkAll;
				list.push(item);
			}
			this.list = list;
			this.createCheckList();
		},
		handleOpenClose(type) {
			// 打开关闭模态框
			this.show = true;
		},
		handleOpenCloseAll() {
			// 打开关闭模态框
			this.show = true;
		},
		handleConfirmOpenClose() {
			// 打开关闭设备
			this.show = false;
			this.$refs.uToast.default('数据暂未接入');
		},
		createEquimentList() {
			// 生成远控设备列表
			let list = [];
			const formData = {
				checked: false,
				checkbox: false
			};
			for (let item of this.equimentList) {
				const { markerType, attrbuites } = item;
				if (markerType === this.activeMonitoring && this.activeTypeName.includes(attrbuites.modelType)) {
					list.push({ ...attrbuites, ...formData });
				}
			}
			this.list = list;
		},
		createCheckList() {
			// 获取已选列表
			this.checkList = this.list.filter(v => v.checkbox);
		}
	}
};
</script>

<style lang="scss" scoped>
.list-control {
	&__head {
		&-type {
			border-bottom: 1rpx solid #ddd;

			.item {
				width: 33%;
				height: 80rpx;
				line-height: 80rpx;
				font-weight: bold;
				&.active-type {
					color: #1890ff;
					uni-view {
						position: relative;
						&::before {
							width: 100%;
							height: 8rpx;
							background-color: #2ea4fe;
							content: '';
							position: absolute;
							bottom: 0;
							left: 0;
						}
					}
				}
			}
		}
		&-equiment {
			padding: 0 30rpx;
			.item-head {
				margin: 20rpx 0 10rpx 30rpx;
				padding: 15rpx;
				background: #ffffff;
				box-shadow: 0rpx 5rpx 13rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 15rpx;
				margin-left: 20rpx;

				&__title {
					width: 130rpx;
					color: #666;
					text-align: center;
					font-size: 24rpx;
					margin-top: 10rpx;
				}

				&.active-head .item-head__title {
					color: #2ea4fe;
				}

				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
	.btn-group {
		.u-button {
			width: 167rpx;
			margin-left: 20rpx;
		}
	}
	/deep/ .checkbox-box .uni-checkbox-input-checked {
		background-color: #2da0f8 !important;
	}
	&__content {
		padding: 30rpx;
		overflow: auto;
		border-bottom: 1rpx solid #ddd;
		.item {
			height: 150rpx;
			box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 8rpx;
			margin-bottom: 30rpx;
			padding: 30rpx;

			&-head {
				margin-bottom: 10rpx;

				.equiment-name {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 48rpx;
				}

				.equiment-state {
					margin-left: 13rpx;
					padding: 4rpx 15rpx;
					color: #ffffff;
					background: #13c110;
					border-radius: 4rpx;
					text-align: center;
					font-size: 20rpx;
					&.stop {
						background: #ef8b09;
					}
				}
			}
		}
	}

	&__foot {
		padding: 30rpx;
	}
}
</style>
