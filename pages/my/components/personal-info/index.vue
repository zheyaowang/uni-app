<template>
	<view class="personal-info height_full">
		<sk-navbar back-native></sk-navbar>

		<view class="personal-info__content">
			<u--form :model="form" labelWidth="150px" :labelStyle="labelStyle">
				<view class="user-avatar bg-white">
					<u-form-item label="头像"><upload-avatar :avatarUrl="avatarUrl" @on-success="handleUpload" @on-delete="handleUpload"></upload-avatar></u-form-item>
				</view>
				<view class="user-info bg-white">
					<u-form-item label="用户名" borderBottom><u--input v-model="form.account" disabled disabledColor="#fff" border="none"></u--input></u-form-item>
					<u-form-item label="姓名" borderBottom><u--input v-model="form.realName" border="none"></u--input></u-form-item>
					<u-form-item label="手机号" borderBottom><u--input v-model="form.mobilePhone" type="number" border="none"></u--input></u-form-item>
					<u-form-item label="邮箱"><u--input v-model="form.email" border="none"></u--input></u-form-item>
				</view>
			</u--form>
		</view>

		<view class="personal-info__foot"><u-button type="primary" shape="circle" color="#0365EE" text="提交" @click="handleSubmit"></u-button></view>

		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import UploadAvatar from './components/upload-avatar.vue';
import apiServer from '@/api/my.js';
export default {
	name: 'personal-info',
	data() {
		return {
			labelStyle: {
				color: '#535353'
			},
			form: {
				account: '',
				realName: '',
				mobilePhone: '',
				email: ''
			},
			avatarUrl: '',
			avatarName: ''
		};
	},
	components: { UploadAvatar },
	computed: mapGetters('login', ['userInfo']),
	created() {
		// 获取用户信息
		this.getUserInfo();
	},
	methods: {
		getUserInfo() {
			try {
				// 获取用户信息
				const { account = '', realName = '', mobilePhone = '', email = '', avatar = '' } = this.userInfo || {};
				this.form = { account, realName, mobilePhone, email };
				this.avatarUrl = avatar;
				this.avatarName = this.createAvatarName(avatar);
			} catch (e) {
				//TODO handle the exception
				console.error('获取用户信息', e);
			}
		},
		handleUpload({ fileList }) {
			// 上传头像
			this.avatarUrl = fileList.length > 0 ? fileList[0].url : '';
			this.avatarName = this.avatarName = this.createAvatarName(this.avatarUrl);
			// 更新头像
			if (this.avatarName) {
				apiServer.updateUserAvatar(this.avatarName).then(response => {
					if (response.code === 200) {
						// this.$refs.uToast.success('头像更新更新成功');
					}
				});
			}
		},
		async handleSubmit() {
			// 更新信息
			apiServer.updateUserInfo(this.form).then(response => {
				if (response.code === 200) {
					this.$refs.uToast.success('个人信息更新成功');
					this.$store.dispatch('login/GetUserInfo').then(() => {
						this.getUserInfo();
						uni.navigateBack();
					});
				}
			});
		},
		createAvatarName(avatarUrl) {
			// 获取头像名称
			if (!avatarUrl) return '';
			const array = avatarUrl.split('/');
			return array.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.personal-info {
	padding: 30rpx 0;
	background-color: #f5f5f5;

	.u-form {
		/deep/ .u-form-item__body {
			padding: 20px;
			.uni-input-input {
				text-align: right;
				color: #333;
				font-weight: bold;
			}
		}

		.user-avatar {
			margin-bottom: 30rpx;
			/deep/ .u-form-item__body__right__content__slot {
				justify-content: end;
			}
		}
	}

	&__foot {
		padding: 100rpx 30rpx 0;
	}
}
</style>
