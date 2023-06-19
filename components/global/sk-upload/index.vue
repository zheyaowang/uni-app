<template>
	<view class="sk-upload">
		<u-upload
			v-bind="$attrs"
			ref="uUpload"
			:multiple="multiple"
			:name="name"
			:max-count="maxCount"
			:file-list="previewList"
			:accept="accept"
			previewFullImage
			@afterRead="onAfterRead"
			@delete="onDelete"
		>
			<view class="add-btn" slot="addBtn"><slot name="addBtn"></slot></view>
		</u-upload>
	</view>
</template>

<script>
import { ACCESS_TOKEN } from '@/common/util/constants';
import * as uploadFileFun from '@/common/util/download_util.js';
import tip from '@/common/util/tip.js';
import { getConnectInfo } from '@/common/util/work.js'
import configService from '@/common/service/config.service.js';

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
					'X-Access-Token': uni.getStorageSync(ACCESS_TOKEN)
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
			default: 'image'
		}
	},
	data() {
		return {
			previewList: []
		};
	},
	watch: {
		fileList: {
			handler(value) {
				// 回显图片
				if (value.length === 0) return;
				this.previewList = uploadFileFun.createUploadFileList(value);
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		onDelete(file, lists, name) {
			this.previewList.splice(file.index, 1);
			this.createUploadData('delete', { file, lists, name });
		},
		async onAfterRead(file, lists, name) {
			try {
				let fileList = [].concat(file.file);
				let fileListLen = this.previewList.length;
				fileList.map(item => {
					this.previewList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < fileList.length; i++) {
					const result = await this.uploadFilePromise(fileList[i].url);
					let item = this.previewList[fileListLen];
					this.previewList.splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: 'success',
							message: '',
							url: result
						})
					);
					fileListLen++;
				}
				this.createUploadData('success', { file, lists, name });
			} catch (e) {
				//TODO handle the exception
				tip.error('文件上传失败！')
			} 
		},
		uploadFilePromise(url) {
			// 上传接口
			const action = `http://${getConnectInfo('ip')}:${getConnectInfo('port')}/user-platform/file/upload`
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: action,
					filePath: url,
					name: this.name,
					header: this.header,
					formData: this.formData,
					success: res => {
						setTimeout(() => {
							const data = JSON.parse(res.data).data;
							resolve(uploadFileFun.createFullImgUrl(data));
						}, 1000);
					}
				});
			});
		},
		createUploadData(type, suorce) {
			// 生成需要的数据格式
			const fileList = this.previewList;
			const uploadFileUrl = uploadFileFun.createFormImagesUrl(fileList);
			const data = { type, suorce, fileList, uploadFileUrl };
			this.$emit(`on-${type}`, data);
		}
	}
};
</script>

<style></style>
