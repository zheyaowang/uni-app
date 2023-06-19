import {
	toDateString,
	getWhatMonth,
	getWhatDay,
	isArray,
	isString,
	isObject
} from 'xe-utils'
/**
 * @description 防抖
 * @param fn {  Function  } 目标函数
 * @param wait {  number  } 延迟时间
 * @param immediate {  boolean  } 是否第一次立即执行
 * @return function
 * @example deTap: deBounce(() => { // TODO }, 500, true)
 * */
export const debounce = (func, wait = 500, immediate = true) => {
	let timeout, args, context, timestamp, result

	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function(...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

/**
 * @description 节流
 * @param fn {  Function  } 目标函数
 * @param wait {  number  } 延迟时间
 * @return function
 * @example thTap: throttle(() => { // TODO }, 500)
 * */
export const throttle = (fn, wait = 500) => {
	var timeout;
	var previous = 0;

	return function() {
		context = this;
		args = arguments;
		if (!timeout) {
			timeout = setTimeout(function() {
				timeout = null;
				fn.apply(context, args)
			}, wait)
		}

	}
}

/**
 * @description 简述：时间格式
 * @param date: 时间 eg：new Date()
 * @param fmt：格式  eg：yyyy-MM-dd HH:mm:ss  yyyy-MM-dd
 * @return String
 * @example timeFormat(new Date(), "yyyy-MM-dd HH:mm:ss")
 * */
export function timeFormat(date, fmt = "yyyy-MM-dd") {
	if (date == null || date == '' || date == undefined)
		return "";
	// 解决ios手机时间格式化NAN问题
	if (typeof(date) == "string") {
		if (uni.getSystemInfoSync().platform == 'ios') {
			date = date.replace(/-/g, '/')
		}
		date = new Date(date)
	} else if (!(date instanceof Date)) {
		date = new Date(date)
	}
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"H+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
			"00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * @description 获取前后几个月的时间
 * @param month { number } 月份
 * @param format { string } 时间格式
 * @return String as '2022-12-08'
 * @example whichDay({ month: -4, format: 'yyyy-MM-dd' }) returnValue: '2022-08-06'
 * */
export const whichDay = ({
	month,
	format
}) => {
	const dateString = getWhatMonth(new Date(), month)
	return toDateString(dateString, format)
}

/**
 * @description 获取前后几天的时间
 * @param date { number } 天数
 * @param format { string } 时间格式
 * @return String as '2022-12-08'
 * @example whichDate({ date: -4, format: 'yyyy-MM-dd' }) returnValue: '2022-08-06'
 * */
export const whichDate = ({
	date,
	format
}) => {
	const dateString = getWhatDay(new Date(), date)
	return toDateString(dateString, format)
}

/**
 * @description 清空某个对象,常用于置空表格操作
 * @param obj
 * @return Object
 * @example clearForm({ ...item }) => { ...item }
 * */
export const clearForm = (obj) => {
	Object.keys(obj).map(k => {
		if (isArray(obj[k])) {
			obj[k] = []
		}
		if (isString(obj[k])) {
			obj[k] = ''
		}
		if (isObject(obj[k])) {
			obj[k] = {}
		}
		return obj
	})
}

/**
 * @description 复制文字
 * @param text 要复制的内容
 * @return void
 * @example copyText('要复制的数据')
 * */
export const copyText = (text) => {
	uni.setClipboardData({
		data: text,
		success() {
			uni.showToast({
				title: '已复制到剪贴板',
				icon: 'none'
			})
		}
	})
}

/**
 * @description 从数组中删除指定的元素，根据内容删除
 * @param arr { Array } 目标数组
 * @return item { String } 删除的内容
 * @example remove(['a', 'b', 'c'], 'a')
 * */
export const remove = (arr, item) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === item) {
			arr.splice(i, 1)
		}
	}
	return arr;
}

/**
 * @description 从数组中找到指定值的项
 * @param targetArray { Array } 目标数组
 * @param k { String } 要比较的键
 * @param value { String | Number } 目标值
 * @return {...item} 目标项
 * @example * const targetArray = [{ value: 2023, name: '正常' }, { value: 2020, name: '不正常' }]; findTargetItem(targetArray, value, 2023)
 * */
export const findTargetItem = (targetArray, k, value) => {
	const findResult = targetArray.find(item => {
		return item[k] === value
	})
	return findResult || '-'
}

/**
 * @description 生成前N个月的月份日期数组
 * @param targetArray { Array } 目标数组
 * @return [{value: '2023-04', text: '2023-04'}]
 * @example getMonth(12)
 * */
export function getMonth(firstMonth, needAll=true) {
	let dataArr = needAll ? [{text: '全部', value: 'all', highLight: true}] : [];
	let data = new Date();
	let year = data.getFullYear();
	data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
	for (let i = 0; i < firstMonth; i++) {
		data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
		let m = data.getMonth() + 1;
		m = m < 10 ? "0" + m : m;
		dataArr.push({value: data.getFullYear() + "-" + m, text: data.getFullYear() + "-" + m});
	}
	// return dataArr.reverse();
	return dataArr
}

/**
 * @description 返回xx年xx月中的第一天和最后一天的时间戳
 * @param date { String } 目标日期，只支持yyyy-MM-dd
 * @return [1683043200000, 1686153600000], // 开始时间，结束时间
 * @example getDateRange('2023-5-21')
 * */
export const getDateRange = (date) => {
	if(isNaN(date) && !isNaN(Date.parse(date))){
 		const tempDate = new Date(date)
 		const year = tempDate.getFullYear()
 		const month = tempDate.getMonth() + 1
 		if(month>12) {
 			month -= 12 // 月份减
 		    year++ // 年份增
 		}
 		const d = new Date(year, month, 1) // xx年xx月中的第一天
 		const last = new Date(d.getTime()-1000*60*60*24).getDate() // xx年xx月中的最后一天
 		// 月份小于 10 前添0
 		let mon
 		if(d.getMonth() < 10) {
 		    mon = "0" + d.getMonth()
 		}else {
 		    mon = d.getMonth()
 		}
 		const firstDay = d.getFullYear() + '-' + mon + '-' + "0"+ d.getDate()
 		const lastDay = d.getFullYear() + '-' + mon + '-' + last
 		// 这里是要求返回时间戳
 		return [new Date(firstDay).getTime(), new Date(lastDay).getTime()]
 	} else {
 		// console.log("所传参数不是一个日期格式")
		return void 0
 	}
}


// 生成唯一标识符号(uuid)
export const guid = () => {
	return 'xxxxxxxx-date-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).replace(/date/g, function(c) {
		return Date.parse(new Date());
	});
}