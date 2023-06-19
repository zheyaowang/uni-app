<script>
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js';
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		checkUpdate(); // 检测升级
		// getCid() // 获取设备cid，用作于后台推送消息的参数
		plus.screen.lockOrientation('portrait-primary'); // 禁止横屏
		plus.key.addEventListener('backbutton', this.backListener, false);
		// #endif
	},
	beforeDestroy() {
		// #ifdef APP-PLUS
		plus.key.removeEventListener('backbutton', this.backListener);
		// #endif
	},
	methods: {
		backListener() {
			// app系统关闭
			const path = ['pages/login/index', 'pages/work-space/index', 'pages/water-fertilizer/index', 'pages/farm-work/index', 'pages/my/index'];
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			if (path.includes(page.route)) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要退出当前系统吗？',
					success: function(res) {
						if (res.confirm) {
							// 退出当前应用，改方法只在App中生效
							plus.runtime.quit();
						}
					}
				});
			} else {
				uni.navigateBack();
			}
		}
	}
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
@import '@/common/styles/index.scss';
/*每个页面公共css */
</style>
