import Vue from "vue";
import VueRouter from "vue-router";
import setupPermission from './permission'


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: 'home' */ "@/views/main/index.vue"),
      children:[]
  },
];


// 动态路由只能添加一次
window.localStorage.setItem("storageAside", "0");

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.reloadRouter = function () {
  console.log('重置路由');
  router.matcher = new VueRouter({
    mode: "history",
    routes
  }).matcher
}
setupPermission(router)

console.log('不放定时器的全部',router.getRoutes());

export default router;