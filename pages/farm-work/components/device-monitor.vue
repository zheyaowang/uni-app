<template>
	<view class="seck-flex-y height_full">
		<custom-tabs class="padding-lr" :current="currentTabIndex" lineWidth="60" :list="tabsList" :itemStyle="{ height: '60px' }" @change="e => (currentTabIndex = e.index)" handleWidth pageIndex="2" ></custom-tabs>
		<view class="seck-flex-fill seck-flex-y height_0 padding-top-sm " style="">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="getData()">
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-lr-lg padding-tb-sm" v-for="(item ,index) in dataList[`list${currentTabIndex}`]" :key="index">
					<view class="box-shadow round padding-lg seck-flex-y gap-sm">
						<view v-if="item.stnm" class="seck-flex-y-center gap-sm">
							<view class="">
								<u--text :text="item.stnm" lines="1" size="15" blod color="#333"></u--text>
							</view>
							<view class="state" :style="{backgroundColor: stateStyle[item.state]}">
								{{ item.state }}
							</view>
						</view>
						<view class="seck-flex-y-center seck-flex-between">
							<view class="seck-flex-y-center gap-xs">
								<u--text text="户主/负责人名称:" lines="1" size="13" color="#666" ></u--text>
								<view>
									<u--text :text="item.responsiblePerson" lines="1" size="13" color="#222"></u--text>
								</view>
							</view>
							<view class="seck-flex-y-center gap-xs">
								<u--text text="联系方式:" lines="1" size="13" color="#666" ></u--text>
								<view>
									<u--text :text="item.responsiblePhoneNumber" lines="1" size="13" color="#222" ></u--text>
								</view>
							</view>
						</view>
						<view class="seck-flex-y-center gap-sm">
							<view><u--text text="田地编号:" lines="1" size="13" color="#666" ></u--text></view>
							<u--text :text="item.projectName" lines="1" size="13" color="#222"></u--text>
						</view>
					</view>
				</view>
				<u-loadmore v-if="dataList[`list${currentTabIndex}`].length" :status="status" @loadmore="getData()" />
				<u-empty v-if="!dataList[`list${currentTabIndex}`].length" mode="data" marginTop="100"/>
				<!--不加占位会导致高度不够也会有滚动现象-->
				<u-gap height="30rpx"></u-gap>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import CustomTabs from '@/pages/components/custom-tabs/index.vue'
	import { getDeviceData } from '@/api/farm-work.js'
	
	export default {
		components: { CustomTabs },
		data() {
			return {
				tabsList: [{
					name: '稻田水位',
					iconPath: require('@/static/img/farm-work/14-1.png'),
					selectedIconPath: require('@/static/img/farm-work/14-2.png'),
				}, {
					name: '流量监测',
					iconPath: require('@/static/img/farm-work/9-1.png'),
					selectedIconPath: require('@/static/img/farm-work/9-2.png'),
				}, {
					name: '作物展示',
					iconPath: require('@/static/img/farm-work/17-1.png'),
					selectedIconPath: require('@/static/img/farm-work/17-2.png'),
				}, {
					name: '土壤墒情',
					iconPath: require('@/static/img/farm-work/15-1.png'),
					selectedIconPath: require('@/static/img/farm-work/15-2.png'),
				}, {
					name: '田间虫害',
					iconPath: require('@/static/img/farm-work/11-1.png'),
					selectedIconPath: require('@/static/img/farm-work/11-2.png'),
				}, {
					name: '水管压力',
					iconPath: require('@/static/img/farm-work/17-1.png'),
					selectedIconPath: require('@/static/img/farm-work/17-2.png'),
				}, {
					name: '气象监测',
					iconPath: require('@/static/img/farm-work/15-1.png'),
					selectedIconPath: require('@/static/img/farm-work/15-2.png'),
				}, {
					name: '视频监控',
					iconPath: require('@/static/img/farm-work/11-1.png'),
					selectedIconPath: require('@/static/img/farm-work/11-2.png'),
				}],
				active: null, // 当前点击的横线滚动里的项的索引
				currentTabIndex: 0,
				dataList: {
					list0: [], // 稻田水位
					list1: [], // 流量监测
					list2: [], // 作物展示
					list3: [], // 土壤墒情
					list4: [], // 田间虫害
					list5: [], // 水管压力
					list6: [], // 气象监测
					list7: [], // 视频监控
				},
				stateStyle: {
					'正常': '#13C110',
					'离线': '#FA9F2C',
					'报警': '#EA5628'
				},
				stateLabel: {
					1: '正常',
					2: '离线',
					3: '报警'
				},
				status: 'loadmore',
				currentPage: 1,
				pageSize: 5,
				total: 0,
				dict: {
					0: '418744076670600453',
					1: '418745445477516549',
					2: '418745829780620549',
					3: '418746169347278085',
					4: '418746539909842181',
					5: '418746787327640837',
					6: '418747110800753925',
					7: '418747397615650053',
				},
				urlMap: [
					{ url: '/example/ProMonitor_WaterInfo/getList', method: 'post' }, // 0
					{ url: '/example/ProMonitor_FlowInfo/getList', method: 'post' }, // 1
					{ url: '/example/ProMonitor_CropGrowthInfo/getList', method: 'post' }, // 2
					{ url: '/example/ProMonitor_SoilMoistureInfo/getList', method: 'post' }, // 3
					{ url: '/example/ProMonitor_FieldPestInfo/getList', method: 'post' }, // 4
					{ url: '/example/ProMonitor_PipePressureInfo/getList', method: 'post' }, // 5
					{ url: '/example/ProMonitor_WeatherInfo/getList', method: 'post' }, // 6
					{ url: '/example/ProMonitor_Video_Info/getList', method: 'post' }, // 7
				],
			}
		},
		props: {
			activeComponentName: {
				type: String
			}
		},
		watch: {
			currentTabIndex: {
				deep: true,
				immediate: true,
				async handler(v) {
					console.log('tabIndex', v);
					// if(this.activeComponentName !== 'monitor') return		
					// 如果后期需要做成带缓存数据，把每个list的total和currentPage也存起来
					await this.refreshData()
				}
			}
		},
		methods: {
			async getData(){
				if(this.currentPage * this.pageSize > this.total && (this.currentPage * this.pageSize) - this.total > this.pageSize) {
					this.status = 'nomore'
					return
				}
				try{
					this.status = 'loading'
					const params = {
						currentPage: this.currentPage,
						pageSize: this.pageSize,
						sort: 'asc',
						sidx: 'orderindex',
						menuId: this.dict[this.currentTabIndex]
					}
					
					const { data } = await getDeviceData(params, true, this.urlMap[this.currentTabIndex])
					const { list, pagination } = data
					console.log('list', list);
					console.log('pagination', pagination);
					this.total = pagination.total
					this.currentPage += 1
					
					this.dataList[`list${this.currentTabIndex}`] = this.dataList[`list${this.currentTabIndex}`].length ? this.dataList[`list${this.currentTabIndex}`].concat(list) : list
					// console.log('this.dataList', this.dataList);
					setTimeout(()=>{
						if(this.currentPage * this.pageSize > this.total && (this.currentPage * this.pageSize) - this.total > this.pageSize) {
							this.status = 'nomore'
							console.log(`第${this.currentPage}次请求是无数据的`);
						} else {
							this.status = 'loadmore'
						}
					}, 1000)
				}catch(e){
					//TODO handle the exception
				}
			},
			// 刷新数据
			refreshData() {
				// 重置页码
				this.currentPage = 1
				// 重置数据
				this.dataList = {
					list0: [], // 稻田水位
					list1: [], // 流量监测
					list2: [], // 作物展示
					list3: [], // 土壤墒情
					list4: [], // 田间虫害
					list5: [], // 水管压力
					list6: [], // 气象监测
					list7: [], // 视频监控
				}
				this.getData()
			},
		}
	}
</script>

<style lang="scss" scoped>
.scroll-list {
	@include flex(column);
	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 4px;
		}

		&__text {
			color: #666;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
			width: 90rpx;
			white-space: nowrap;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}

.state {
	padding: 5rpx 10rpx;font-size: 12rpx;color: #fff;border-radius: 6rpx;font-weight: 300;
}
</style>