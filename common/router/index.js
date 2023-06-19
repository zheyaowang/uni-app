import modules from './modules/index.js'
import store from '@/store/index.js'
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

//初始化
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	encodeURI: true,
	routes: [...modules] //路由表
});

const whiteList = ['/pages/components/error-page/404']
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// store.commit('app/SET_ROUTE_TO', to) // 这里可以一次性存to和from对象，组成一个[{...to}, {...from}]
	next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	// 获取工作台监测点数据  指定页面跳转到工作台才刷新数据
	// const nameList = ['login', 'water-fertilizer', 'farm-work', 'my', 'work-space']
	// if(to.name === 'work-space' && nameList.includes(from.name)) {
	// 	// 获取监测点列表
	// 	store.dispatch('workSpace/GetMapMonitorMarkerList');
	// 	// 工况列表 工况和远控是相同设备
	// 	store.dispatch('workSpace/GetMapEquimentMarkerList');
	// }
})
// export default router
export {
	router,
	RouterMount
}
