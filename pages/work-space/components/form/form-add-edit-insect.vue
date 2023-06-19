<template>
	<view class="form-add-edit-insect height_full bg-white">
		<sk-navbar></sk-navbar>

		<view class="form-add-edit-insect__content">
			<u--form labelPosition="top" :model="form" labelWidth="200" :labelStyle="{ color: '#666', fontSize: '28rpx', margin: '10rpx 0' }">
				<u-form-item label="监测时间" borderBottom @tap="form.show.tm = true">
					<u--input v-model="form.data.tm" fontSize="26rpx" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="测站名称" borderBottom>
					<u--input fontSize="26rpx" v-model="form.name.stationGuid" disabled disabledColor="#ffffff" border="none"></u--input>
				</u-form-item>
				<u-form-item label="稻田编号" borderBottom @tap="form.show.projectGuid = true">
					<u--input v-model="form.name.projectGuid" fontSize="26rpx" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="分析结果" borderBottom @tap="form.show.analysisResults = true">
					<u--input v-model="form.name.analysisResults" fontSize="26rpx" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="虫害类型" borderBottom v-if="form.data.analysisResults === '有虫害'">
					<u--input fontSize="26rpx" v-model="form.data.description" border="none" placeholder="请输入虫害类型"></u--input>
				</u-form-item>
				<u-form-item label="处理状态" borderBottom @tap="form.show.handleResults = true">
					<u--input v-model="form.name.handleResults" fontSize="26rpx" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="相关附件" borderBottom>
					<view style="display: flex;width: 100%;align-items: center;flex-direction: row;flex-wrap: wrap;">
						<file-upload v-model="fileList" :max="9" :remove="true" :add="false" @imgDelete="deleteFile" />
						<!-- 组件是窗口级滚动，不要在scroll-view内使用 -->
						<lsj-upload
							ref="fileUploadRef"
							childId="upload2"
							:option="option"
							:size="1024"
							debug
							instantly
							width="180rpx"
							height="180rpx"
							@change="onChange"
							@progress="onprogress"
							@uploadEnd="onuploadEnd"
							@merged="callMerged"
						>
							<view class="htz-image-upload-Item htz-image-upload-Item-add">+</view>
						</lsj-upload>
					</view>
				</u-form-item>
			</u--form>
		</view>

		<view class="form-add-edit-insect__foot"><u-button color="#1890FF" text="确定" @click="showModal = true"></u-button></view>

		<u-toast ref="uToast"></u-toast>

		<!-- 监测时间 -->
		<u-datetime-picker
			:show="form.show.tm"
			closeOnClickOverlay
			mode="datetime"
			@close="form.show.tm = false"
			@cancel="form.show.tm = false"
			@confirm="handleConfirmTime"
		></u-datetime-picker>
		<!-- 稻田编号 -->
		<sk-picker :show.sync="form.show.projectGuid" title="请选择稻田编号" key-name="proname" :columns="[projectguids]" @confirm="handleField"></sk-picker>
		<!-- 分析结果 -->
		<sk-picker :show.sync="form.show.analysisResults" title="请选择分析结果" :columns="analysisArray" @confirm="handleAnalysis"></sk-picker>
		<!-- 处理状态 -->
		<sk-picker :show.sync="form.show.handleResults" title="请选择处理状态" :columns="handleArray" @confirm="handleResults"></sk-picker>
		<!-- 模态框 -->
		<sk-modal :show.sync="showModal" title="温馨提示" content="确定要提交信息吗？" @confirm="handleSubmit"></sk-modal>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { timeFormat } from '@/common/util/tools.js';
import configService from '@/common/service/config.service.js';
import apiServer from '@/api/work-space.js';
import { TOKEN_NAME } from '@/common/util/constants';
import { analysisArray, handleArray } from '../detail/data.js';
import FileUpload from '@/pages/components/sk-file-upload/index.vue';
import LsjUpload from '@/uni_modules/lsj-upload/components/lsj-upload/lsj-upload.vue';
export default {
	name: 'form-add-edit-insect',
	data() {
		return {
			form: {
				name: {
					stationGuid: '',
					projectGuid: '',
					analysisResults: '有虫害',
					handleResults: '--'
				},
				data: {
					tm: timeFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
					stationGuid: '',
					projectGuid: '',
					analysisResults: '有虫害',
					description: '',
					handleResults: '--',
					profile: ''
				},
				show: {
					tm: false,
					projectGuid: false,
					analysisResults: false,
					handleResults: false
				}
			},
			analysisArray: [analysisArray],
			handleArray: [handleArray],
			projectguids: [],
			showModal: false,
			option: {
				url: `${configService.apiUrl}/file/chunk`,
				// 上传附件的key
				name: 'file',
				// 根据你接口需求自定义请求头,默认不要写content-type,让浏览器自适配
				header: {
					Authorization: uni.getStorageSync(TOKEN_NAME)
				},
				// 根据你接口需求自定义body参数
				formData: {},
				mergeUrl: `${configService.apiUrl}/file/merge`
			},
			fileList: []
		};
	},
	components: { FileUpload, LsjUpload },
	computed: mapGetters('app', ['allFieldList']),
	async onLoad(option) {
		// 获取所有田地列表
		if (!this.allFieldList || this.allFieldList.length === 0) await this.$store.dispatch('app/GetFieldList');
		const { id, title, projectguids } = JSON.parse(decodeURIComponent(option.data));
		this.form.name.stationGuid = title;
		this.form.data.stationGuid = id;
		// 当前测站下的田地
		this.projectguids = JSON.parse(projectguids).map(v => {
			const item = this.allFieldList.find(e => e.id == v);
			return item;
		});
	},
	methods: {
		handleConfirmTime({ value }) {
			// 监测时间
			this.form.data.tm = timeFormat(new Date(value), 'yyyy-MM-dd HH:mm:ss');
			this.form.show.tm = false;
		},
		handleField(e) {
			// 选择稻田编号
			const { value = [] } = e;
			this.form.name.projectGuid = value[0].proname;
			this.form.data.projectGuid = value[0].id;
			this.form.show.projectGuid = false;
		},
		handleAnalysis(e) {
			// 选择分析结果
			const { value = [] } = e;
			this.form.name.analysisResults = value[0].label;
			this.form.data.analysisResults = value[0].value;
			this.form.show.analysisResults = false;
		},
		handleResults(e) {
			// 选择处理状态
			const { value = [] } = e;
			this.form.name.handleResults = value[0].label;
			this.form.data.handleResults = value[0].value;
			this.form.show.handleResults = false;
		},
		// 文件选择回调
		onChange(files) {
			this.progress = 0;
			console.log('当前选择的文件列表：', JSON.stringify([...files.values()]));
			const fileList = JSON.stringify([...files.values()]);
			if (!JSON.parse(fileList).length) return false;
			// #ifdef APP-PLUS
			this.showLoading = plus.nativeUI.showWaiting(`上传中, \n 进度：${this.progress}`);
			// #endif
		},
		// 上传进度回调
		onprogress(item) {
			console.log('onprogressCB', item);
			const { totalChunks, chunkNumber } = item;
			this.progress = (((chunkNumber / totalChunks) * 100) / 3).toFixed(2) + '%';

			// #ifdef APP-PLUS
			this.showLoading.setTitle(`上传中, \n 进度：${this.progress}`);

			// 不知道为啥每个切片会请求三回， 所以这里处理了下
			if (chunkNumber === totalChunks * 3) {
				this.showLoading.setTitle(`上传完成`);
				setTimeout(() => {
					this.showLoading.close();
				}, 500);
			}
			// #endif
		},
		// 某文件(切片)上传结束回调(成功失败都回调)
		onuploadEnd(item) {
			console.log(`${item.name}已上传结束，上传状态=${item.type}`);
		},
		// 切片组装回调
		callMerged(res) {
			// console.log('callMerged----------', res);
			const { data } = JSON.parse(res);
			console.log('callMerged----------', data);
			this.fileList.push(configService.fileUrl + data.url); // 这里的视频无法预览，是因为接口返回 的 地址有问题
		},
		deleteFile(e) {
			console.log('删除文件', e);
			const { del } = e;
			const defaltUrl = '/api/file/Image/annex/';
			const fileUrl = del.substring(del.indexOf(defaltUrl) + defaltUrl.length);
			this.fileList.filter(v => !v.includes(fileUrl));
		},
		handleSubmit() {
			// 提交
			let data = { ...this.form.data };
			const { projectGuid, analysisResults, description = '--' } = data;
			const defaltUrl = '/api/file/Image/annex/';
			const fileList = this.fileList.map(v => {
				const url = v.substring(configService.fileUrl.length);
				const fileId = v.substring(v.indexOf(defaltUrl) + defaltUrl.length);
				return { url, fileId };
			});
			const profile = JSON.stringify(fileList);
			if (!projectGuid) {
				this.$refs.uToast.default('请选择稻田');
				return;
			}
			if (!!profile) data.profile = profile;
			data.analysisResults = analysisResults === '有虫害' ? description : analysisResults;
			apiServer.createOrEditFieldPestApi(data).then(() => {
				// 更新数据列表
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.emit('on-update');
				uni.navigateBack();
				// 更新监测点-田间虫害测站列表
				this.$store.dispatch('workSpace/GetFieldPestInfoList');
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.form-add-edit-insect {
	padding: 30rpx;
	position: relative;

	&__foot {
		width: 100%;
		padding: 40rpx 30rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		box-shadow: 0rpx 2rpx 9rpx 0rpx rgba(6, 60, 98, 0.19);
	}

	.htz-image-upload-Item {
		width: 160rpx;
		height: 160rpx;
		margin: 13rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.htz-image-upload-Item-add {
		font-size: 105rpx;
		text-align: center;
		border: 1px dashed #d9d9d9;
		color: #d9d9d9;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
