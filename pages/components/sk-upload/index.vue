<template>
	<view class="sk-upload">
		<u-upload
			v-bind="$attrs"
			ref="uUpload"
			:multiple="multiple"
			:name="name"
			:max-count="maxCount"
			:file-list.sync="fileListVModel"
			:accept="accept"
			:capture="capture"
			previewFullImage
			@afterRead="onAfterRead"
			@delete="onDelete"
		>
			<view class="add-btn" slot="addBtn"><slot name="addBtn"></slot></view>
		</u-upload>
		<u--text v-if="desc" :text="desc" lines="1" size="12" blod color="#999"></u--text>
	</view>
</template>

<script>
import { TOKEN_NAME } from '@/common/util/constants';
import tip from '@/common/util/tip.js';
import { getConnectInfo } from '@/common/util/work.js'
import configService from '@/common/service/config.service.js';
import { chunk, merger } from '@/api/farm-work.js'

export default {
	name: 'sk-upload',
	props: {
		// 服务器上传地址
		action: {
			type: String,
			default: `${configService.apiUrl}/file/Uploader/userAvatar`
		},
		// 上传携带的头信息
		header: {
			type: Object,
			default: () => {
				return {
					'Authorization': uni.getStorageSync(TOKEN_NAME),
					// "Content-Type": 'ASP.NET_SessionId=ck5e24sihorysim5zo1olfqm'
				};
			}
		},
		// 上传文件的字段名，供后端获取使用
		name: {
			type: String,
			default: 'file'
		},
		// 上传额外携带的参数
		formData: {
			type: Object,
			default: () => ({})
		},
		// 是否开启图片多选，部分安卓机型不支持 默认开启
		multiple: {
			type: Boolean,
			default: true
		},
		// 选择完图片是否自动上传
		autoUpload: {
			type: Boolean,
			default: true
		},
		// 最大选择图片的数量
		maxCount: {
			type: Number,
			default: 6
		},
		// 默认显示的图片列表
		fileList: {
			type: Array,
			default: () => []
		},
		// 接受的文件类型，file只支持H5（只有微信小程序才支持把accept配置为all、media）
		accept: {
			type: String,
			default: 'image', // all | media | image | file | video; file只支持H5（只有微信小程序才支持把accept配置为all、media）
		},
		// 拾取模式
		capture: {
			type: Array,
			default: () => ['album', 'camera']
		},
		desc: {
			type: String,
			default: ''
		},
	},
	computed: {
		fileListVModel: {
			get() {
				return this.fileList
			},
			set(val) {
				this.$emit('update:fileList', val)
			}
		}
	},
	methods: {
		onDelete(file) {
			this.fileListVModel.splice(file.index, 1);
			this.createUploadData('delete', file);
		},
		async onAfterRead(file) {
			// console.log('file', file);
			try {
				let fileList = [].concat(file.file);
				let fileListLen = this.fileListVModel.length;
				fileList.map(item => {
					this.fileListVModel.push({
						...item,
						status: 'uploading',
					});
				});
				for (let i = 0; i < fileList.length; i++) {
					const result = await this.uploadFilePromise(fileList[i]);
					console.log("result", result)
					let item = this.fileListVModel[fileListLen];
					this.fileListVModel.splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: 'success',
							data: result,
							url: item.thumb,
						})
					);
					fileListLen++;
				}
				this.createUploadData('success', file);
			} catch (e) {
				//TODO handle the exception
				tip.error('文件上传失败！')
			}
		},
		uploadFilePromise(file) {
			// console.log('file', file)
			// 上传接口
			// const action = `http://${getConnectInfo('ip')}:${getConnectInfo('port')}/user-platform/file/upload`
			// return new Promise((resolve, reject) => {
			// 	let a = uni.uploadFile({
			// 		url: this.action,
			// 		filePath: url,
			// 		name: this.name,
			// 		header: this.header,
			// 		formData: this.formData,
			// 		success: res => {
			// 			setTimeout(() => {
			// 				const data = JSON.parse(res.data).data;
			// 				resolve(data);
			// 			}, 1000);
			// 		}
			// 	});
			// });
			// chunk()
			const sign = this.guid()
			const data = {
				chunkNumber: 1,
				chunkSize: 52428800,
				currentChunkSize: file.size,
				totalSize: file.size,
				identifier: sign,
				filename: file.name,
				relativePath: file.name,
				totalChunks: 1,
				fileType: file.type,
				extension: file.name.split('.')[1],
			}
			const formData = Object.assign({}, this.formData, data)
			// 写的什么分片上传接口，口区
			const action = `${configService.apiUrl}/file/chunk`
			// chunk(formData)
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: action,
					filePath: file.url,
					name: this.name,
					header: this.header,
					formData: formData,
					success: (res) => {
						setTimeout(async() => {
							// console.log('data', res);
							const params = {
								identifier: sign,
								fileName: file.name,
								fileSize: file.size,
								fileType: 'png',
								extension: 'png',
								type: "annex"
							}
							const result = await merger(params)
							resolve(result.data);
						}, 1000);
					}
				});
			});
		},
		createUploadData(type, source) {
			// 生成需要的数据格式
			const fileList = this.fileListVModel;
			const data = { type, source, fileList };
			this.$emit(`on-${type}`, data);
		},
		guid() {
			return 'xxxxxxxx-date-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).replace(/date/g, function(c) {
				return Date.parse(new Date());
			});
		},
	}
};
</script>

<style></style>
