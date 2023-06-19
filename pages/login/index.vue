<template>
	<view class="account-login height_full">
		<view class="account-login__head flex align-center">
			<view class="login-content flex align-center">
				<u-icon name="/static/img/logo.png" size="78rpx"></u-icon>
				<u--text color="#333" align="center" margin="0 0 0 33rpx" bold size="46rpx" text="教育"></u--text>
			</view>
		</view>
		<view class="account-login__content">
			<u--form labelPosition="top" :model="form" labelWidth="200" :labelStyle="{ color: '#333', fontSize: '28rpx', margin: '10rpx 0' }">
				<u-form-item label="请输入用户名" borderBottom><u--input fontSize="36rpx" v-model="form.username" border="none" clearable></u--input></u-form-item>
				<u-form-item label="请输入密码" borderBottom>
					<input style="width: 100%;" :password="!showPassword" v-model="form.password" confirm-type="done" />
					<u-icon slot="right" class="suffix-icon" :name="showPassword ? 'eye-fill' : 'eye-off'" @click="showPassword = !showPassword"></u-icon>
				</u-form-item>
			</u--form>

			<view class="flex align-center" style="margin-top: 10rpx;">
				<checkbox color="#2EA4FE" :checked="checkbox" style="transform:scale(0.6)" @click="checkbox = !checkbox"></checkbox>
				<view @click="checkbox = !checkbox">是否记住密码</view>
			</view>
		</view>

		<view class="account-login__foot margin-top login-btn-box">
			<u-button shape="circle" :loading="loading" color="#2EA4FE" :text="loading ? '登录中...' : ' 登录 '" @tap="$u.debounce(onLogin, 300)"></u-button>
		</view>
		<!-- 消息提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { asyncRouteMap } from '@/common/router/modules/routers.js';
import { IS_CHECKED, USER_NAME, PASS_WORD } from '@/common/util/constants.js';
import apiService from '@/api/app.js'
import { mapGetters } from 'vuex'

export default {
	name: 'account-login',
	data() {
		return {
			form: {
				username: '',
				password: ''
			},
			loading: false,
			showPassword: false, // 是否显示明文
			checkbox: false
		};
	},
	computed: {
		...mapGetters({
			userInfo: 'login/userInfo'
		}),
	},
	created() {
		const isChecked = uni.getStorageSync(IS_CHECKED);
		this.checkbox = !!isChecked;
		// 获取缓存的账号密码
		if (this.checkbox) {
			this.form.username = uni.getStorageSync(USER_NAME);
			this.form.password = uni.getStorageSync(PASS_WORD);
		}
	},
	methods: {
		onLogin() {
			this.loading = true;
			if (!this.checkLoginForm()) return;
			const loginParams = {
				username: this.form.username,
				password: this.form.password,
			};
			this.$store
				.dispatch('login/mLogin', loginParams)
				.then(() => {
					// 记住密码,缓存
					if (this.checkbox) {
						uni.setStorageSync(IS_CHECKED, true);
						uni.setStorageSync(USER_NAME, this.form.username);
						uni.setStorageSync(PASS_WORD, this.form.password);
					} else {
						uni.setStorageSync(IS_CHECKED, false);
						uni.removeStorageSync(USER_NAME);
						uni.removeStorageSync(PASS_WORD);
					}
					
					// 跳转首页
					this.$refs.uToast.show({
						message: `登录成功`,
						type: 'success',
						complete() {
							uni.navigateTo({
								url: asyncRouteMap['home']
							});
						}
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		
		checkLoginForm() {
			const { username, password } = this.form;
			// 非空校验
			if (!username) {
				this.$refs.uToast.default('请输入账号');
				this.loading = false;
				return false;
			}
			if (!password) {
				this.$refs.uToast.default('请输入密码');
				this.loading = false;
				return false;
			}
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
.account-login {
	&__head {
		width: 100%;
		height: 363rpx;
		padding: 0 50rpx;
		background: url('~@/static/img/login_bg.png') no-repeat;
		background-size: 100% 100%;

		.login-content {
			position: relative;
			top: 50rpx;
		}
	}

	&__content {
		padding: 60rpx;
	}

	&__foot {
		padding: 75rpx;

		.tips {
			padding-top: 30rpx;
			color: #333;
			font-size: 24rpx;

			.file-title {
				color: #2ea4fe;
			}
		}
	}
}
</style>
