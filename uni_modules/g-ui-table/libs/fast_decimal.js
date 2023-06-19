import Decimal from 'decimal.js';
import * as fmfs from './format.js'
/**
 * 校验是否为数字
 * 重写Number校验，仅允许[Number,String]类型通过
 * @param {*Any} data 需要校验的数字
 */
export function isNumber(data) {
	const type = Object.prototype.toString.call(data)
	return ['[object Number]', '[object String]'].includes(type) && !isNaN(data) && data !== ''
}
/**
 * 快速相加
 * @param {*Any} data 需要相加的数据
 */
export function add(params,  precision = 2, round = 'ROUND_HALF_UP') {
	let res = 0
	params.forEach(item => {
		const value = isNumber(item) ? item : 0
		res = Decimal(res).add(Decimal(value)).toString()
	})
	return fmfs.number(res, precision, round)
}
/**
 * 快速相减
 * @param {*Any} data 需要相减的数据
 */
export function sub(params,  precision = 2, round = 'ROUND_HALF_UP') {
	let res = isNumber(params[0]) ? params[0] : 0
	const subtractArr = params.slice(1)
	subtractArr.forEach(item => {
		const value = isNumber(item) ? item : 0
		res = Decimal(res).sub(Decimal(value)).toString()
	})
	return fmfs.number(res, precision, round)
}
/**
 * 快速相乘
 * @param {*Any} data 需要相乘的数据
 */
export function mul(params, precision = 2, round = 'ROUND_HALF_UP') {
	let res = 1
	params.forEach(item => {
		const value = isNumber(item) && item != 0 ? item : 1
		res = Decimal(res).mul(Decimal(value)).toString()
	})
	return fmfs.number(res, precision, round)
}
/**
 * 快速递除
 * @param {*Any} data 需要递除的数据
 */
export function div(params, precision = 2, round = 'ROUND_HALF_UP') {
	let res = isNumber(params[0]) ? params[0] : 0
	const divisorArr = params.slice(1)
	divisorArr.forEach(item => {
		const value = isNumber(item) && item != 0 ? item : 1
		res = Decimal(res).div(Decimal(value)).toString()
	})
	return fmfs.number(res, precision, round)
}
/**
 * 转换为百分比-保留2位小数
 * @param {*Any} data 需要相除的数据
 * @param {*Number} precision 保留小数位数
 */
export function percent(params, precision = 2, round = 'ROUND_HALF_UP', symbol = '%') {
	let res = div(params, precision, round)
	res = Decimal(res).mul(100)
	return `${fmfs.number(res, precision, round)}${symbol}`
}
