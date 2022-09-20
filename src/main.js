import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@/assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import * as api from '@/api/index.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  beforeCreate(){
    Vue.prototype.$api = api
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')