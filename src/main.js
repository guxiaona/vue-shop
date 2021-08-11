import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import './plugins/element.js'
import axios from 'axios'
// 导入全局样式表
import './assets/css/global.css'
import 'view-design/dist/styles/iview.css'

// view ui注册
Vue.use(ViewUI)
// 挂载
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
