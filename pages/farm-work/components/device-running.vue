<template>
	<view class="seck-flex-y height_full">
		<custom-tabs class="padding-lr" :current="currentTabIndex" lineWidth="60" :list="tabsList" :itemStyle="{ height: '60px' }" @change="e => (currentTabIndex = e.index)" handleWidth pageIndex="1" ></custom-tabs>
		<view class="seck-flex-fill seck-flex-y height_0 padding-top-sm " style="">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="getData()">
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-tb-sm padding-lr-lg" v-for="(item ,index) in dataList[`list${currentTabIndex}`]" :key="index">
					<view class="box-shadow round padding-xl seck-flex-y gap-sm">
						<view class="seck-flex-y-center gap-sm">
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
									<!-- <u--text text="19971292809" lines="1" size="13" color="#222" ></u--text> -->
								</view>
							</view>
						</view>
						<view v-if="currentTabIndex === 2 || currentTabIndex === 3" class="seck-flex-y-center gap-sm">
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
					name: '一体泵',
					iconPath: require('@/static/img/farm-work/16-1.png'),
					selectedIconPath: require('@/static/img/farm-work/16-2.png'),
				}, {
					name: '水肥设备',
					iconPath: require('@/static/img/farm-work/12-1.png'),
					selectedIconPath: require('@/static/img/farm-work/12-2.png'),
				}, {
					name: '进水阀',
					iconPath: require('@/static/img/farm-work/8-1.png'),
					selectedIconPath: require('@/static/img/farm-work/8-2.png'),
				}, {
					name: '出水阀',
					iconPath: require('@/static/img/farm-work/7-1.png'),
					selectedIconPath: require('@/static/img/farm-work/7-2.png'),
				}],
				currentTabIndex: 0,
				dataList: {
					list0: [], // 一体泵
					list1: [], // 水肥设备
					list2: [], // 进水阀
					list3: [], // 出水阀
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
					0: '418436177016653061',
					1: '418436534765618437',
					2: '418436912856958213',
					3: '418437139022218501',
				},
				urlMapBackUp: {
					0: '/promonitor/PromonitorPump/GetAll',
					1: '/promonitor/PromonitorWaterfertilizerinfo/GetAll',
					2: '/promonitor/PromonitorInletvalve/GetAll',
					3: '/promonitor/PromonitorOutletsluice/GetAll',
				},
				urlMap: [
					{ url: '/example/ProMonitor_Pump/getList', method: 'post' }, // 0
					{ url: '/example/ProMonitor_WaterFertilizerInfo/getList', method: 'post' }, // 1
					{ url: '/example/ProMonitor_InletValve/getList', method: 'post' }, // 2
					{ url: '/example/ProMonitor_OutletSluice/getList', method: 'post' }, // 3
				]
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
					// if(this.activeComponentName !== 'running') return
					console.log('tabIndex', v);
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
					// console.log('list', list);
					// console.log('pagination', pagination);
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
					list0: [], // 一体泵
					list1: [], // 水肥设备
					list2: [], // 进水阀
					list3: [], // 出水阀
				}
				this.getData()
			},
		},
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
