<template>
	<view class="water-fertilizer seck-flex-y height_full">
		<sk-navbar placeholder></sk-navbar>
		<!-- column -->
		<view class="search-bar seck-flex-column width_full">
			<!-- select -->
			<view class="seck-flex-y-center width_full gap">
				<!-- 不用view包裹没宽度，因为sk-select组件时flex:1布局 -->
				<view>
					<sk-select
						v-model="householdHeadName"
						:localdata="householdHeadNameOptions"
						@change="householdHeadNameChange"
						style="width: 180rpx;background-color: #fff;"
						placeholder="户主姓名"
					></sk-select>
				</view>
				<view>
					<sk-select
						v-model="paddyFieldNumber"
						:localdata="paddyFieldNumberOptions"
						@change="paddyFieldNumberChange"
						style="width: 180rpx;background-color: #fff;"
						placeholder="田地编号"
					></sk-select>
				</view>
				<view style="width: 400rpx">
					<uni-datetime-picker rangeSeparator="至" :start="start" :end="end" v-model="range" type="daterange" @maskClick="maskClick" @change="dateChange" />
				</view>
			</view>
			<!-- text -->
			<view class="" style="width: 100%;display: flex;height: 40rpx;line-height: 40rpx;margin-top: 10rpx">
				<view><u--text text="施肥总量:" size="20rpx" color="#666"></u--text></view>
				<view style="margin: 0 10rpx"><u--text :text="useFertilizerTotal" size="20rpx" color="#13C110"></u--text></view>
				<view><u--text text="吨" size="20rpx" color="#666"></u--text></view>
			</view>
		</view>
		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->
		<view class="seck-flex-fill seck-flex-y padding-lr height_0 padding-top-sm bg-white">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="getMessageData()">
				<!--这一层控制盒子内外边距-->
				<view style="padding: 20rpx 0;overflow: hidden;" v-for="(item, index) in msgList" :key="index">
					<!--这一层控制盒子flex布局-->
					<view style="display: flex;flex-direction: row; align-items: center;" @tap="$u.debounce(() => goDetails(item), 300)">
						<view class="cell-left" style="width: 18%; display: flex;justify-content: start;position: relative;">
							<u-avatar
								icon="/static/img/water-fertilizer/4.png"
								color="#333"
								fontSize="28"
								bg-color="transparent"
								style="box-shadow: 2rpx 6rpx 8rpx rgba(26, 26, 26, 0.2);"
							></u-avatar>
						</view>
						<view
							class="cell-right"
							style="width: 0 ;flex-grow: 1;display: flex;justify-content: start;position: relative;min-height: 158rpx;flex-direction: column;justify-content: center;"
						>
							<view style="display: flex; justify-content: space-between;">
								<view class="title" style="display: flex;gap: 20rpx;">
									<u--text :text="item.proName" :bold="true" size="16"></u--text>
									<view><u--text :text="'[' + item.responsiblePersonName + ']'" :bold="false" size="16" color="#666" lineHeight="20"></u--text></view>
								</view>
							</view>
							<!--这里的padding根据实际展示情况更改，只有一行数据的话paddingTop, 两行及以上paddingTop + paddingBottom-->
							<view class="padding-top-sm seck-flex">
								<view><u--text lines="1" text="施肥总量:"></u--text></view>
								<view>
									<!-- 数字需要调下行高 -->
									<u--text lines="1" :text="item.consumptionValue" lineHeight="22" color="#13C110" style="margin: 0 20rpx;"></u--text>
								</view>
								<view><u--text lines="1" lineHeight="19" text="吨"></u--text></view>
							</view>
							<u-line style="position: absolute;left: 0; bottom: 0;box-shadow: 2rpx 6rpx 8rpx rgba(26, 26, 26, 0.2);"></u-line>
						</view>
					</view>
				</view>
				<!-- <u-loadmore v-if="msgList.length" :status="status" @loadmore="getMessageData()" /> -->
				<u-empty v-if="!msgList.length" mode="data" marginTop="100" />
				<u-gap height="30rpx"></u-gap>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import UniDatetimePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue';
import { whichDate } from '@/common/util/tools.js';
import { mapActions } from 'vuex';
import { getProjectFertilization } from '@/api/water-fertilizer.js';

export default {
	name: 'water-fertilizer',
	components: {
		UniDatetimePicker
	},
	data() {
		return {
			householdHeadName: undefined, // 户主姓名
			householdHeadNameOptions: [{ text: 'xuzuhuan', value: 1 }], // 户主姓名选项
			paddyFieldNumberOptions: [{ text: 'xuzuhuan', value: 1 }], // 土地编号选项
			paddyFieldNumber: undefined, // 田地编号
			dateRange: [
				{
					text: '全部',
					value: '1'
				},
				{
					text: '测试',
					value: '2'
				}
			],
			// range: [whichDate({
			// 	date: -7,
			// 	format: 'yyyy-MM-dd'
			// }), whichDate({
			// 	date: 0,
			// 	format: 'yyyy-MM-dd'
			// })],
			range: [],
			start: whichDate({
				date: -30,
				format: 'yyyy-MM-dd'
			}), // 最小可选择的日期范围
			end: whichDate({
				date: 30,
				format: 'yyyy-MM-dd'
			}), // 最大可选择的日期范围
			msgList: [], // 数据列表
			useFertilizerTotal: 0, // 用水总量
			status: 'loadmore'
		};
	},
	mounted() {
		this.initOptionsData(); // 户主姓名选项， 土地编号选项
		this.getMessageData(); // 列表信息
	},
	methods: {
		...mapActions({
			getPaddyData: 'waterFertilizer/getPaddyData',
			getHouseholdHeadNameData: 'waterFertilizer/getHouseholdHeadNameData'
		}),
		maskClick(v) {
			console.log('v', v);
		},
		// 时间改变事件
		dateChange(v) {
			this.range = v;
			this.getMessageData();
		},
		// 户主姓名改变事件
		householdHeadNameChange(v) {
			this.getMessageData();
		},
		// 土地编号选择事件
		paddyFieldNumberChange(v) {
			this.getMessageData();
		},
		async getMessageData() {
			const params = {
				ProjectGuid: this.paddyFieldNumber, // 田地编号
				ResponsiblePersonId: this.householdHeadName, // 户主姓名
				StartTime: this.range[0],
				EndTime: this.range[1]
			};
			try {
				const { data } = await getProjectFertilization(params, true);
				// 没数据的情况
				if (!data.length) {
					this.msgList = [];
					return false;
				}
				this.useFertilizerTotal = 0;
				for (let i = 0; i < data.length; i++) {
					// console.log('data[i]', data[i]);
					this.msgList =
						data[i].detailList.length &&
						data[i].detailList.map(item => {
							this.useFertilizerTotal += item.consumptionValue; // 累加施肥总量
							return {
								...item,
								proName: data[i].proName,
								responsiblePersonName: data[i].responsiblePersonName
							};
						});
					// console.log(this.msgList)
				}
			} catch (e) {
				//TODO handle the exception
				uni.showToast({
					title: e,
					icon: null
				});
			}
		},
		goDetails(item) {
			console.log('item', item);
			uni.navigateTo({
				url: '/pages/water-fertilizer/components/fertilizer-details',
				events: {
					// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
					someEvent: res => {
						console.log(res.data);
					}
				},
				success(res) {
					res.eventChannel.emit('acceptDataFromOpenerPage', item);
				}
			});
		},
		async initOptionsData() {
			// 获取户主姓名集合
			this.getHouseholdHeadNameData({ keyword: '' }).then(res => {
				this.householdHeadNameOptions = res.map(item => {
					return {
						text: item.fullName,
						value: item.id
					};
				});
			});

			const paddyData = await this.getPaddyData(); // 获取田地编号
			this.paddyFieldNumberOptions = paddyData.map(item => {
				return {
					text: item.ProName,
					value: item.Id
				};
			});
		}
	},
	async onPullDownRefresh() {
		await this.getMessageData();
		uni.stopPullDownRefresh();
	}
};
</script>

<style lang="scss" scoped>
.search-bar {
	background-color: #fff;
	padding: 20rpx 10rpx;
	margin-bottom: 5rpx;
	box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(0,0,0,0.1);
}

// dete-range的字体大小样式
/deep/.uni-date-x {
	font-size: 24rpx;
}
// holderPlace text
/deep/.uni-date__x-input {
	font-size: 24rpx;
}

/deep/ .uni-select,
/deep/ .uni-date .uni-date-x--border {
	font-size: 24rpx;
}
/deep/ .uni-select {
	&,
	.uni-select__input-box {
		height: 60rpx;
	}
}

/deep/ .uni-date {
	.uni-date__x-input,
	.range-separator {
		height: 58rpx;
		line-height: 58rpx;
	}
	.uni-icons {
		font-size: 32rpx !important;

		&.icon-calendar {
			display: none;
		}
	}
}
</style>
