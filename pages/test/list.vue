<template>
	<view class="water-fertilizer seck-flex-y">
		<sk-navbar placeholder></sk-navbar>
		<view class="search-bar">
			<view class="seck-flex-column">
				<view class="" style="width: 100%;display: flex; gap: 10rpx">
					<sk-select v-model="monthValue" :localdata="dateRange" @change="dateChange"
						style="width: 150rpx;background-color: #fff;" placeholder="户主姓名">
					</sk-select>
					<sk-select v-model="monthValue" :localdata="dateRange" @change="dateChange"
						style="width: 150rpx;background-color: #fff;"
						placeholder="田地编号"></sk-select>
				</view>
				<view class="" style="width: 100%;display: flex;height: 40rpx;line-height: 40rpx;margin-top: 10rpx">
					<view>
						<u--text text="用水总量:" size="20rpx" color="#666"></u--text>
					</view>
					<view style="margin: 0 10rpx">
						<u--text text="1238" size="20rpx" color="#13C110"></u--text>
					</view>
					<view>
						<u--text text="m³" size="20rpx" color="#666"></u--text>
					</view>
				</view>
			</view>
			<view style="flex: 1; margin-left: 10rpx">
				<uni-datetime-picker border :start="start" :end="end" v-model="range" type="daterange" @maskClick="maskClick" @change="deteChange" />
				<view class="" style="width: 100%;display: flex;height: 40rpx;margin-top: 10rpx"><!-- 占位 --></view>
			</view>
		</view>
		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->
		<view class="seck-flex-fill seck-flex-y padding-lr height_0">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="getMessageData()">
				<!--这一层控制盒子内外边距-->
				<view style="margin-bottom: 0rpx; padding: 20rpx 0;overflow: hidden;" v-for="(item, index) in msgList" :key="index">
					<!--这一层控制盒子flex布局-->
					<view style="display: flex;flex-direction: row; align-items: center;">
						<view class="cell-left"
							style="width: 18%; display: flex;justify-content: start;position: relative;">
							<u-avatar icon="/static/img/water-fertilizer/4.png" color="#333" fontSize="28" bg-color="transparent"
								style="box-shadow: 2rpx 6rpx 8rpx rgba(26, 26, 26, 0.2);">
							</u-avatar>
						</view>
						<view class="cell-right"
							style="width: 0 ;flex-grow: 1;display: flex;justify-content: start;position: relative;min-height: 158rpx;flex-direction: column;justify-content: center;">
							<view style="display: flex; justify-content: space-between">
								<view class="title">
									<u--text :text="item.title" :bold="true" size="16"></u--text>
								</view>
							</view>

							<view class="padding-tb-sm">
								<u--text lines="2"
									:text="item.bodyText"></u--text>
							</view>
							<u-line
								style="position: absolute;left: 0; bottom: 0;box-shadow: 2rpx 6rpx 8rpx rgba(26, 26, 26, 0.2);"></u-line>
						</view>
					</view>
				</view>
				<u-loadmore v-if="msgList.length" :status="status" @loadmore="getMessageData()" />
				<u-empty v-if="!msgList.length" mode="data" marginTop="100" />
				<u-gap height="30rpx"></u-gap>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import UniDatetimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"
	import { whichDate } from "@/common/util/tools.js"
	export default {
		name: 'water-fertilizer',
		components: {
			UniDatetimePicker
		},
		data() {
			return {
				monthValue: '',
				dateRange: [{
					text: '全部',
					value: '1'
				},{
					text: '测试',
					value: '2'
				}],
				range: [whichDate({ date: -7, format: 'yyyy-MM-dd' }), whichDate({ date: 0, format: 'yyyy-MM-dd' })],
				start: whichDate({ date: -30, format: 'yyyy-MM-dd' }), // 最小可选择的日期范围
				end: whichDate({ date: 0, format: 'yyyy-MM-dd' }), // 最大可选择的日期范围
				msgList: [
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
					{ title: 'aa', lastModifyTime: '2023-05-10', bodyText: 'sadjasiojd好地方IU是护士和呵护收到回复  但是返回对手被辅导室比较好宣传部VG地方iOS带假发手动' },
				],
				status: 'loadmore',
			};
		},
		methods: {
			dateChange(v) {
				console.log('v', v);
			},
			maskClick(v) {
				console.log('v', v);
			},
			deteChange(v) {
				console.log('v', v);
			},
			getMessageData() {

			}
		},
	}
</script>

<style lang="scss" scoped>
	.water-fertilizer {
		height: 100%;
	}

	.content {}

	.search-bar {
		@include flex(row);
		align-items: center;
		justify-content: space-between;
		height: 150rpx;
		width: 100%;
		background-color: #F5F5F5;
		padding: 0 10rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}

	// dete-range的字体大小样式
	/deep/.uni-date-x {
		font-size: 12px;
	}
</style>
