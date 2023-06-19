<template>
	<view class="upload-avatar">
		<u-upload ref="uUpload" name="file" :max-count="1" :file-list="previewList" accept="image" @afterRead="onAfterRead" @delete="onDelete"></u-upload>
		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import configService from '@/common/service/config.service.js';
export default {
	props: {
		// 默认显示的图片列表
		avatarUrl: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			previewList: []
		};
	},
	watch: {
		avatarUrl: {
			handler() {
				// 回显图片
				if (!this.avatarUrl) return;
				this.previewList = [
					{
						name: '头像',
						url: `${configService.fileUrl}${this.avatarUrl}`
					}
				];
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
							...result
						})
					);
					fileListLen++;
				}
				this.createUploadData('success', { file, lists, name });
			} catch (e) {
				//TODO handle the exception
				this.$refs.uToast.error(`文件上传失败！`);
				console.error('文件上传失败', e);
			}
		},
		uploadFilePromise(url) {
			// 上传接口
			const action = `${configService.apiUrl}/file/Uploader/userAvatar`;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: action,
					filePath: url,
					name: 'file',
					header: this.header,
					formData: this.formData,
					success: res => {
						setTimeout(() => {
							const data = JSON.parse(res.data).data;
							resolve(data);
						}, 1000);
					}
				});
			});
		},
		createUploadData(type, source) {
			// 生成需要的数据格式
			const fileList = this.previewList;
			const data = { type, source, fileList };
			this.$emit(`on-${type}`, data);
		},
	}
};
</script>

<style lang="scss" scoped>
.upload-avatar {
	/deep/ .u-upload__button,
	/deep/ .u-upload__wrap__preview {
		margin: 0;
	}
}
</style>
