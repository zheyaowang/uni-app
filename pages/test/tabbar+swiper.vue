<template>
	<view class="seck-flex-y height_full">
		<sk-navbar/>
		<view class="search-bar width_full">
			<u-tabs :current="currentTabIndex" lineWidth="60" :list="tabsList"
				:itemStyle="{ width: '50%', height: '40px' }" @change="e => (currentTabIndex = e.index)"></u-tabs>
		</view>
		<swiper :current="currentTabIndex" @change="e => (currentTabIndex = e.detail.current)"  class="seck-flex-fill seck-flex-y padding-lr height_0 padding-top-sm"
			duration="500">
			<swiper-item v-for="item in tabsList" :key="item.value">
				<scroll-view style="height: 100%;" scroll-top="0" enableBackToTop="true" scroll-y @scrolltolower="() => {}">
					<component :is="item.componentName"></component>
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

				}
			}
		},
		methods: {

		}
	}
</script>


<style scoped lang="scss">
	.search-bar {
		background-color: #F5F5F5;
		padding: 10rpx 10rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
</style>
