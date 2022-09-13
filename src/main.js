import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './router'
import store from './store'

// console.log(setupRouter);



import '@/assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import * as api from '@/api/index.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  beforeCreate(){
    Vue.prototype.$api = api
    Vue.prototype.$bus = this
  },
  render: h => h(App)
})
// setupRouter(app)
app.$mount('#app')