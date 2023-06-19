<template>
	<view class="seck-flex-y height_full">
		<sk-navbar right-icon="calendar" right-icon-color="#fff" @rightClick="handleNavbarSearch" :title="navbarTitle"></sk-navbar>
		<view class="search-bar">
			<!-- <u--text text="1#田于2023-04-14至2023-05-01期间施肥总量：5265吨" lines="2" size="13" color="#666"></u--text> -->			
			<view v-if="range.length">
				<u--text :text="proName + ' 于 ' + range[0] + '至' + range[1] + '期间施肥总量：'" lines="2" size="13" color="#666"></u--text>	
			</view>
			<view v-else>
				<u--text :text="proName + '施肥总量：'" lines="2" size="13" color="#666"></u--text>	
			</view>
			<view class="seck-flex-y-center gap-xs">
				<u--text :text="useFertilizerTotal" lines="1" size="18" color="#13C110" lineHeight="20" style="white-space: nowrap;"></u--text>
				<u--text text="吨" lines="1" size="13" color="#666" style="white-space: nowrap;"></u--text>
			</view>	
		</view>
		<view>
			<!-- 不显示input，调用api打开 -->
			<uni-datetime-picker ref="datePickRef" border :start="start" :end="end" v-model="range" type="daterange"
				@change="dateChange">
				&nbsp
			</uni-datetime-picker>
		</view>
		<view class="seck-flex-fill seck-flex-y margin-top-sm" style="height: 0;">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y>
				<uni-table ref="table" :loading="loading" :border="false" stripe emptyText="暂无更多数据">
					<uni-tr>
						<uni-th width="190rpx" align="center">施肥时间</uni-th>
						<uni-th width="190rpx" align="center">田地编号</uni-th>
						<uni-th width="190rpx" align="center">施肥类型</uni-th>
						<uni-th width="190rpx" align="center">施肥量(吨)</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in tableData" :key="index">
						<uni-td align="center">{{ item.tm.split(' ')[0] }}</uni-td>
						<uni-td align="center">
							<view class="table-text">
								 {{ item.projectGuid }}
							</view>
						</uni-td>
						<uni-td align="center">{{ item.type }}</uni-td>
						<uni-td align="center">
							{{ item.consumptionValue }}
						</uni-td>
					</uni-tr>
				</uni-table>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import UniDatetimePicker from "@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"
	import { whichDate } from "@/common/util/tools.js"
	import { getProjectFertilizationDetails } from '@/api/water-fertilizer.js'
	import { sum } from 'xe-utils'
	
	export default {
		data() {
			return {
				loading: false,
				tableData: [],
				start: (new Date().getFullYear() + '-01-01'), // 最小可选择的日期范围
				end: whichDate({
					date: 0,
					format: 'yyyy-MM-dd'
				}), // 最大可选择的日期范围
				range: [ (new Date().getFullYear() + '-01-01'), whichDate({ date: 0, format: 'yyyy-MM-dd' })],
				navbarTitle: '', // 导航栏标题  
				proName: '', // 田地名称
				projectGuid: '', // 田地id
				useFertilizerTotal: 0, // 施肥总量
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过acceptDataFromOpenerPage传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				console.log(data.proName)
				this.navbarTitle = data.proName + ' 施肥详情'
				this.proName = data.proName // 田地名称
				this.projectGuid = data.projectGuid // 田地id
				
				this.getTableData()
				// 调用上一页的事件
				eventChannel.emit('someEvent', {
					data: 'data form use fertilizer details'
				})
			})
		},
		mounted() {
			
		},
		methods: {
			// 点击导航栏右侧日期图标, 打开选择日期的弹框
			handleNavbarSearch() {
				this.$refs.datePickRef.show()
			},
			// dateTimePick时间确定
			dateChange(v) {
				this.range = v
				this.getTableData()
			},
			// 获取表格数据
			async getTableData() {
				const params = {
					StartTime: this.range[0],
					EndTime: this.range[1],
					ProjectGuid: this.projectGuid
				}
				try{
					const { data } = await getProjectFertilizationDetails(params, true)
					console.log('data', data);
					this.useFertilizerTotal = 0
					// 没数据的情况
					if(!data.list.length) {
						this.tableData = []
						return false
					}
				
					this.tableData = data.list
					this.useFertilizerTotal = sum(data.list, 'consumptionValue')
				}catch(e){
					//TODO handle the exception
					uni.showToast({
						title: e,
						icon: "none"
					})
				}
			},
		},
		async onPullDownRefresh() {
			await this.getTableData()
			uni.stopPullDownRefresh();
		},
	}
</script>

<style scoped lang="scss">
	.search-bar {
		@include flex(row);
		align-items: center;
		flex-wrap: wrap;
		gap: 10rpx;
		width: 100%;
		background-color: #F5F5F5;
		padding: 20rpx 30rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
	// 表格下的文本过长样式
	.table-text {
		word-wrap: break-word;
		width: 80px;
		table-layout: fixed;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp: 2;
	}
</style>
