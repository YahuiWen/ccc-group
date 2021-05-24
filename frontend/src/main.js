import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss'
import '@/icons'
import 'element-ui/lib/theme-chalk/index.css'
import ClientSocketService from '@/utils/clientSocketService'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
ClientSocketService.Instance.connect()
Vue.prototype.$socket = ClientSocketService.Instance
Vue.prototype.$echarts = window.echarts
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
