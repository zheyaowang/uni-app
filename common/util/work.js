import {
	ipPort
} from '@/common/util/constants.js'

/**
 * @description 检测是否为合法的ip地址
 * @param ip {  string }
 * @return Boolean
 * @example isValidIP('127.0.0.1')
 * */
export const isValidIP = (ip) => {
	const reg =
		/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	return reg.test(ip);
}

/**
 * @description 检测是否为合法的端口
 * @param port {  string | number }
 * @return Boolean
 * @example isValidPort('8080')
 * */
export const isValidPort = (port) => {
	if (!(/^[1-9]\d*$/.test(port) && 1 <= 1 * port && 1 * port <= 65535)) {
		return false
	} else {
		return true
	}
}

/**
 * @description 获取连接信息(ip, port, userCode)
 * @param ip {  string  }
 * @param port {  string  }
 * @param userCode {  string  }
 * @return String | Boolean
 * @example getConnectInfo('ip')
 * */
export const getConnectInfo = (k) => {
	const ipInfo = uni.getStorageSync(ipPort)
	if (ipInfo) {
		const temp = JSON.parse(ipInfo)
		if (temp.length) {
			const nextIpConnect = temp[0]
			return nextIpConnect[k] ? nextIpConnect[k] : undefined
		} else {
			return false
		}
	} else {
		return false
	}
}
