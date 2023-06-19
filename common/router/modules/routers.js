import {ROUTES_INFO} from '@/common/util/constants.js';

// 缓存自动识别的路由，在nvue页面使用
let routesInfo = [];

// #ifndef APP-NVUE
routesInfo = [...ROUTES]
uni.setStorageSync(ROUTES_INFO, ROUTES)
// #endif

// #ifdef APP-NVUE
routesInfo = uni.getStorageSync(ROUTES_INFO)
// #endif

// console.log({ROUTES})
// 动态生成路由
const asyncRoutes = routesInfo.map((v) => {
	const path = `${v.path}`;
	const params = v.path.split('/');
	const name = [...params].pop() === "index" ? params[params.length - 2 > 0 ? params.length - 2 : 0] : [...params].pop();
	const meta = {
		title: v?.style?.navigationBarTitleText || name
	}
	return {
		path,
		name,
		meta
	};
})
// console.log({ asyncRoutes })

// 动态生成路由枚举
let asyncRouteMap = {}
for (let route of asyncRoutes) {
	const {
		path,
		name
	} = route;
	asyncRouteMap[name] = path;
}
console.log('asyncRouteMap', asyncRouteMap)

// 路由
const routes = [
	...asyncRoutes,
	{
		path: "/",
		redirect: () => {
			return {
				name: 'index'
			}
		}
	},
	{
		path: '*',
		redirect: () => {
			return {
				name: '404'
			}
		}
	},
]

export {
	routes,
	asyncRoutes,
	asyncRouteMap
}
