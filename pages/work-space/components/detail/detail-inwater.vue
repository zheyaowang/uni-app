<template>
	<view class="detail-inwater height_full">
		<component-detail-equiment :navbar-title="navbarTitle" :equiment-info="equimentInfo" :equiment-data="equimentData"></component-detail-equiment>
	</view>
</template>

<script>
import apiServer from '@/api/work-space.js';
import { timeFormat } from '@/common/util/tools.js';
import componentDetailEquiment from './component-detail-equiment.vue';
export default {
	name: 'detail-inwater',
	data() {
		return {
			navbarTitle: '',
			startTime: `${timeFormat(new Date(), 'yyyy-MM')}-01`,
			endTime: timeFormat(new Date()),
			equimentInfo: {},
			equimentData: {}
		};
	},
	components: { componentDetailEquiment },
	onLoad(option) {
		const { id, title } = JSON.parse(decodeURIComponent(option.data));
		this.id = id;
		this.navbarTitle = title;
		// 获取进水阀详情
		this.getMonitorInfo();
		// 获取进水阀数据
		this.getMonitorData();
	},
	methods: {
		async getMonitorInfo() {
			try {
				// 获取进水阀详情
				const response = await apiServer.getPromonitorInletvalveDetailApi(this.id);
				if (response.code === 200) {
					this.equimentInfo = response.data;
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取进水阀详情', e);
			}
		},
		async getMonitorData() {
			try {
				// 获取进水阀数据
				const id = this.id;
				const startTime = this.startTime;
				const endTime = this.endTime;
				const response = await apiServer.getPromonitorInletvalveDataApi({ id, startTime, endTime });
				if (response.code === 200) {
					this.equimentData = response.data;
				}
			} catch (e) {
				//TODO handle the exception
				console.error('获取进水阀数据', e);
			}
		},
	}
};
</script>

<style lang="scss"></style>