import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/login.vue')
  },
  {
    path: '/home',
    name:'home',
    component: () => import(/* webpackChunkName: 'main' */ '@/views/main/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
