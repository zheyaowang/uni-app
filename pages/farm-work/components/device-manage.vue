<template>
	<view class="seck-flex-y height_full">
		<sk-navbar/>
		<view class="search-bar width_full">
			<u-tabs :current="currentTabIndex" lineWidth="60" :list="tabsList"
				:itemStyle="{ width: '50%', height: '40px' }" @change="e => (currentTabIndex = e.index)"></u-tabs>
		</view>
		<!--这里直接加padding-left,padding-right会导致两个swiper切换的时候没有间距， 要在每个swiper中加-->
		<swiper :current="currentTabIndex" @change="e => (currentTabIndex = e.detail.current)"  class="seck-flex-fill seck-flex-y height_0 padding-top-sm"
			duration="500">
			<swiper-item v-for="item in tabsList" :key="item.value">
				<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="() => {}">
					<!-- <component :is="item.componentName"></component> -->
					<device-running v-if="item.componentName === 'DeviceRunning'" ref="running" :activeComponentName="activeComponentName"></device-running>
					<device-monitor v-if="item.componentName === 'DeviceMonitor'" ref="monitor" :activeComponentName="activeComponentName"></device-monitor>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import DeviceRunning from './device-running.vue'
	import DeviceMonitor from './device-monitor.vue'
	export default {
		components: { DeviceRunning, DeviceMonitor },
		data() {
			return {
				currentTabIndex: 0,
				activeComponentName: 'running',
				tabsList: [{
						name: "运行设备",
						value: 'DeviceRunning',
						componentName: 'DeviceRunning'
					},
					{
						name: "感知监测设备",
						value: 'DeviceMonitor',
						componentName: 'DeviceMonitor'
					}
				]

			}
		},
		watch: {
			currentTabIndex: {
				deep: true,
				immediate: true,
				handler(v) {
					// console.log('tabIndex', v);
					if(v === 0) {
						this.activeComponentName = 'running'
					}
					if(v === 1) {
						this.activeComponentName = 'monitor'
					}
				}
			}
		},
		methods: {

		},
		onPullDownRefresh() {
			if(this.currentTabIndex === 0 ) {
				this.$refs.running[0].refreshData()
			}
			else {
				this.$refs.monitor[0].refreshData()
			}
			uni.stopPullDownRefresh()
		},
	}
</script>


<style scoped lang="scss">
	.search-bar {
		background-color: #F5F5F5;
		padding: 10rpx 10rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
</style>
