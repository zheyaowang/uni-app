/**
 * @description 高德常用的方法
 * 
 * */

export default class GaoDeJs {
	
	/**
	 * @description 获取当前定位
	 * @param null
	 * @return longitude, longitude   { number， number } { 维度， 经度 }
	 * @example new GaoDeJs().getPosition()
	 * */
	getPosition() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: 'gcj02',
				geocode: true, // 是否解析地址信息
				accuracy: '20m', // 指定期望精度
				altitude: true, // 高度信息
				isHighAccuracy: true, // 开启高精度定位
				cacheTimeout: 1, // 定位缓存超时时间, 单位秒
				success: res => {
					resolve(res);
				},
				fail(err) {
					console.error('获取当前定位', err);
					reject(err)
				}
			});
		});
	}
}