import Request from 'luch-request'
import configService from '@/common/service/config.service.js';
import tip from '@/common/util/tip.js';
import {
	TOKEN_NAME
} from '@/common/util/constants.js'

const http = new Request()

http.setConfig((config) => {
	config.baseURL = configService.apiUrl
	// 超时时间
	config.timeout = 60000
	/* 设置全局配置 */
	config.header = {
		...config.header
	}

	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptors.request.use((config) => {
	/* 请求之前拦截器 */
	config.header = {
		...config.header,
		[TOKEN_NAME]: uni.getStorageSync(TOKEN_NAME),
	}
	// 添加时间戳
	const url = config.url;
	const t = new Date().getTime();
	config.url = url.includes("?") > 0 ? `${ url }&t=${ t }` : `${ url }?t=${ t }`;
	// 添加请求头配置
	if (config.url.startsWith('/example') || config.url.startsWith('/permission')) {
		config.header['hongan4d-origin'] = 'pc'
	}
	// 加载中提示
	const loading = config.custom.loading
	if (loading) {
		const content = typeof loading === 'string' ? {
			title: loading,
			mask: true
		} : loading
		uni.showLoading(content)
	}
	/*
	if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	   return Promise.reject(config)
	}
	*/
	return config
})

// 必须使用异步函数
http.interceptors.response.use(async (response) => {
	// 取消加载中
	if (response.config.custom.loading) {
		uni.hideLoading();
	}
	/* 请求之后拦截器 response.code !== 200 */
	const stateCode = [200, 0]
	if (stateCode.indexOf(response.data.code) === -1) { // 服务端返回的状态码不等于200，则reject()
		uni.showToast({
			title: response.data.message || response.data.msg,
			icon: 'none'
		})

		if (response.data.code === 600) {
			uni.reLaunch({
				url: '/pages/login/index'
			})
		}
		return Promise.reject(response.data.message || response.data.msg)
	}
	return response.data
}, (error) => {
	// 请求错误做点什么
	console.log("请求错误做点什么", error);
	// 取消加载中
	if (error.config.custom.loading) {
		uni.hideLoading();
	}
	if (error) {
		// console.log('error.statusCode', error.statusCode);
		switch (error.statusCode) {
			case 403:
				tip.toast('拒绝访问');
				break
			case 404:
				tip.toast('找不到请求路径')
				break
			default:
				tip.error('错误请求', () => {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				});
				break
		}
	}
	return Promise.reject(error)
})

export {
	http
}