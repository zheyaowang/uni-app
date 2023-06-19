import App from './App'

// router
import { router, RouterMount } from '@/common/router/index.js'
Vue.use(router)

// store
import store from '@/store/index.js'
Vue.prototype.$store = store;

// uview-ui
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// tips
import tip from './common/util/tip.js'
Vue.prototype.$tip = tip;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import './uni.promisify.adaptor.js'

const app = new Vue({
	store,
  ...App
})
// #endif

// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif