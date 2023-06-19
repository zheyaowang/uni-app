<template>
	<view class="seck-flex-y height_full">
		<sk-navbar  right-icon="search" right-icon-color="#fff" @rightClick="handleNavbarSearch" />
		<!-- seck-flex-fill seck-flex-y 自动沾满剩余高度 -->
		<view class="search-bar seck-flex-row width_full gap-sm">
			<!-- select需要有自己单独的宽度， 则需要套一层view给宽度 -->
			<sk-select v-model="paddyFieldNumber" :localdata="paddyFieldOptions" @change="paddyFieldNumberChange"
				style="background-color: #fff;width: 150rpx;" placeholder="稻田编号"/>
			<sk-select v-model="eventState" :localdata="eventStateOptions" @change="eventStateChange"
				style="background-color: #fff;width: 150rpx;" placeholder="事件状态"/>
			<sk-select v-model="monthValue" :localdata="monthOptions" @change="monthValueChange"
				style="background-color: #fff;width: 150rpx;" placeholder="选择月份"/>
		</view>
		<view class="seck-flex-fill seck-flex-y height_0 padding-top-sm">
			<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="getData()">
				<!-- 多这一层view为了加阴影效果, 外面必须要padding出空间给里面一层的盒子加阴影 -->
				<view class="padding-tb-sm padding-lr-lg" v-for="(item, index) in dataList" :key="index">
					<view class="box-shadow round">
						<view class="padding-tb-sm padding-lr-lg box-shadow-bottom seck-flex-y-center gap-sm">
							<u--image :showLoading="true" src="/static/img/farm-work/3.png" width="40rpx" height="40rpx"></u--image>
							<u--text :text="item.projectguids" lines="1" size="16" blod color="#222"></u--text>
							<view class="seck-flex-y-center gap-sm">
								<u--image :showLoading="true" src="/static/img/farm-work/4.png" width="30rpx" height="30rpx" ></u--image>
								<u--text :text="item.handlestatus === '1' ? '处理中' : '已完结'" size="13" color="#37B10C"></u--text>
							</view>
						</view>
						<!--多套一层，给padding-->
						<view class="padding-lg seck-flex-y gap-sm">
							<view class="seck-flex-y-center">
								<view>
									<u--text text="事件内容:" lines="1" size="13"  color="#666" style="width: 180rpx;"></u--text>
								</view>
								<u--text :text="item.content" lines="2" size="13" blod color="#222"></u--text>
							</view>
							<view class="seck-flex-y-center">
								<view>
									<u--text text="事件开始时间:" lines="1" size="13" color="#666" style="width: 180rpx;"></u--text>
								</view>
								<view class="seck-flex-y-center" style="padding-top: 6rpx;">
									<u--text :text="item.startdate" lines="1" size="13" color="#222"></u--text>
								</view>
							</view>
							<view class="seck-flex-y-center">
								<view>
									<u--text text="事件结束时间:" lines="1" size="13" color="#666" style="width: 180rpx;"></u--text>
								</view>
								<view class="seck-flex-y-center" style="padding-top: 6rpx;">
									<u--text :text="item.enddate" lines="1" size="13" color="#222"></u--text>
								</view>
							</view>
						</view>

						<view class="padding-tb-sm padding-lr-lg box-shadow-top seck-flex-y-center gap-sm" @click="$u.debounce(goFarmWorkDetails(item), 300, true)">
							<u--text text="查看详情" lines="1" size="13" color="#666"></u--text>
							<u-icon name="arrow-right" size="13"></u-icon>
						</view>
					</view>
				</view>
				<u-loadmore v-if="dataList.length" :status="status" @loadmore="getData()" />
				<!--因为empty有个margin-top：100的样式，会把盒子撑大, 所以要改成定位方式-->
				<u-empty v-if="!dataList.length" mode="data" marginTop="100" style="position: absolute;left: 50%; transform: translateX(-50%);"/>
				<u-gap height="15px"></u-gap>
			</scroll-view>
		</view>
		<uni-fab ref="fab" :pattern="fabConfig.pattern" :horizontal="fabConfig.horizontal" :vertical="fabConfig.vertical" @fabClick="fabClick" :popMenu="fabConfig.popMenu" />
	</view>
</template>

<script>
	import { whichDate, getMonth } from "@/common/util/tools.js"
	import { getProRepair_YH } from '@/api/farm-work.js'
	import { mapActions } from 'vuex'
	import { getDateRange } from '@/common/util/tools.js'
	export default {
		data() {
			return {
				paddyFieldNumber: '', // 水稻田编号
				paddyFieldOptions: [
					
				], // 水稻田编号选项
				eventState: '', // 事件状态
				eventStateOptions: [
					{ text: '处理中', value: '1' },
					{ text: '已完结', value: '2' },
				], // 事件状态选项
				monthValue: '', // 选择的月份值
				monthOptions: getMonth(12), // 月份选择options
				dataList: [], // 数据列表
				status: 'loadmore',
				currentPage: 1,
				pageSize: 5,
				total: 0,
				fabConfig: {
					pattern: {
						color: '#7A7E83', // 文字默认颜色
						backgroundColor: '#fff', // 背景色
						selectedColor: '#007AFF', // 文字选中时的颜色
						buttonColor: '#007AFF', // 按钮背景色
						iconColor: '#fff',
						// icon: '', // 自定义图标，图标来自 uni-icons
					},
					horizontal: 'right', // 水平对齐方式。left:左对齐，right：右对齐
					vertical: 'bottom', // 垂直对齐方式。bottom:下对齐，top：上对齐
					popMenu: false, // 是否使用弹出菜单
					content: [] // 展开菜单内容配置项
				},
				
			}
		},
		onLoad() {
			
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过acceptDataFromOpenerPage传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				// console.log('data', data);
				
				// 调用上一页的事件
				eventChannel.emit('someEvent', {
					data: 'eventChannel'
				})
			})
		},
		mounted() {
			this.initOptionsData() // 土地编号选项
			this.$nextTick(() => {
				this.getData()
			})
		},
		methods: {
			...mapActions({
				getPaddyData: 'waterFertilizer/getPaddyData',
			}),
			// 点击导航栏右侧的搜索图标
			handleNavbarSearch() {
				// 这里相当于重置刷新的操作	
				this.resetSearch()
			},
			// 选择水稻田编号
			paddyFieldNumberChange(item) {
				this.resetSearch()
			},
			// 选择事件状态
			eventStateChange(item) {
				this.resetSearch()
			},
			// 日期弹框的遮罩层点击事件
			maskClick() {

			},
			// 月份选择
			monthValueChange(item) {
				this.resetSearch()
			},
			// 加载数据
			async getData() {
				if(this.currentPage * this.pageSize > this.total && (this.currentPage * this.pageSize) - this.total > this.pageSize) {
					this.status = 'nomore'
					return
				}
				const data = {
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					menuId: '418772878213776645',
					sidx: 'startdate',
					sort: 'desc',
					handlestatus: this.eventState, // 1:处理中； 2已完结
					startdate: getDateRange(this.monthValue), // 开始时间，结束时间
					ProjectGuid: this.paddyFieldNumber, // 稻田编号
				}
				// console.log('data', data)
				try{
					this.status = 'loading'
					const res = await getProRepair_YH(data, true)
					// console.log('res', res);
					this.dataList = this.dataList.length ? this.dataList.concat(res.data.list) : res.data.list
					this.total = res.data.pagination.total
					this.currentPage += 1
					// 请求处理完及时改变loadmore组件的状态, 加延迟为了能看清loading的效果
					setTimeout(()=>{
						if(this.currentPage * this.pageSize > this.total && (this.currentPage * this.pageSize) - this.total > this.pageSize) {
							this.status = 'nomore'
							console.log(`第${this.currentPage}次请求是无数据的`);
						} else {
							this.status = 'loadmore'
						}
					}, 1000)
					console.log('dataList', this.dataList);
				}catch(e){
					//TODO handle the exception
				}
			},
			// 悬浮按钮点击事件
			fabClick(){
				uni.navigateTo({
					url: '/pages/farm-work/components/farm-work-add',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						someEvent: (res) => {
							console.log(res.data)
						}
					},
					success(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							// id: item.id
							id: 'xuzuhuan from manage'
						})
					}
				})
			},
			// 农事详情
			goFarmWorkDetails(item) {
				uni.navigateTo({
					url: '/pages/farm-work/components/farm-work-details',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						someEvent: (res) => {
							console.log(res.data)
						}
					},
					success(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', item)
					}
				})
			},
			async initOptionsData() {
				const paddyData = await this.getPaddyData() // 获取田地编号
				this.paddyFieldOptions = paddyData.map(item => {
					return {
						text: item.ProName,
						value: item.Id,
					}
				})		
			},
			resetSearch() {
				this.currentPage = 1 // 重置页码
				this.dataList = [] // 重置数据
				this.getData()
			},
		},
		async onPullDownRefresh() {
			await this.resetSearch()
			uni.stopPullDownRefresh()
		},
	}
</script>

<style scoped lang="scss">
	.search-bar {
		background-color: #F5F5F5;
		padding: 20rpx 10rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
</style>
