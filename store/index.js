import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//modules使用context实现模块化导入
const modulesFiles = require.context('./modules', true, /\.js$/) 

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})
export default store

