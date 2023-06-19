<template>
	<view class="web-view-content">
		<sk-navbar :title="title"></sk-navbar>
		<web-view name="webview" :src="src"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			src: ''
		};
	},
	onLoad(option) {
		// 生成WebView url
		this.createWebViewUrl(option);
		// 发送数据 message
		this.createWebViewMessage();
		// 解决navbar遮挡问题
		let height = 0; //定义动态的高度变量
		let statusbar = 44;
		let safeAreaTop = 0;
		uni.getSystemInfo({
			// 获取当前设备的具体信息
			success: sysinfo => {
				height = sysinfo.windowHeight;
				safeAreaTop = sysinfo.safeArea.top;
			}
		});
		// #ifdef H5
		this.createH5WebViewStyle(statusbar, height);
		// #endif
		// #ifdef APP-PLUS
		this.createAppWebViewStyle(statusbar + safeAreaTop, height);
		// #endif
	},
	onUnload() {
		//每次销毁监听，不然重复监听
		uni.$off('webview-message');
	},
	methods: {
		createWebViewMessage() {
			// 发送数据
			uni.$on('webview-message', data => {
				// #ifdef H5
				this.postMessageH5(data);
				// #endif
				// #ifdef APP-PLUS
				this.postMessageApp(data);
				// #endif
			});
		},
		postMessageH5(data = '') {
			data = typeof data === 'string' ? data : JSON.stringify(data);
			setTimeout(() => {
				const webview = document.getElementsByTagName('iframe')['webview'].contentWindow;
				webview.postMessage(data);
			}, 200);
		},
		postMessageApp(data = '') {
			data = typeof data === 'string' ? data : JSON.stringify(data);
			let currentWebview = this.$scope.$getAppWebview();
			setTimeout(() => {
				const webview = currentWebview.children()[0];
				webview.evalJS(`requestData(${data})`);
			}, 1000);
		},
		createWebViewUrl({item}) {
			// 生成WebView url
			const { title, url } = JSON.parse(decodeURIComponent(item));
			this.title = title;
			this.src = url;
		},
		createH5WebViewStyle(statusbar, height) {
			// H5 端设置WebView 样式，解决navbar遮挡问题
			setTimeout(() => {
				const iframeDom = document.getElementsByTagName('iframe')['webview'];
				iframeDom.style.top = statusbar + 'px';
				iframeDom.style.height = height - statusbar + 'px';
			}, 200);
		},
		createAppWebViewStyle(statusbar, height) {
			// app 端设置WebView 样式，解决navbar遮挡问题
			const currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
			// 如页面初始化调用需要写延迟
			setTimeout(() => {
				const wv = currentWebview.children()[0];
				wv.setStyle({
					top: statusbar + 'px',
					height: height - statusbar + 'px'
				});
			}, 200);
		}
	}
};
</script>

<style></style>
