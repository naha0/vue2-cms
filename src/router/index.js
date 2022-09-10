import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

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
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: 'home' */ "@/views/main/index.vue"),
  },
  {
    path: "/:patchMatch(.*)*",
    name: "404",
    component: () => import(/* webpackChunkName: '404' */ "@/views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.log(111);
      next("/login");
    } else {
      console.log(222);
      next();
      console.log(store.state.main);
      // if (store.state.main.menuData) {
      //   console.log('进入menu');
      //   const firstMenu = store.state.main.menuData;
      //   console.log(firstMenu);
      //   firstMenu.forEach((item) => {
      //     console.log(item);
      //     console.log(this.$route);
      //     if (item.children.length > 0 && item.children) {
      //       item.children.forEach((child) => {
      //         if (child.type === 2) {
      //           let newUrl = this.$route.path + child.url.slice(5);
      //           this.$router.addRoute("home", {
      //             path: newUrl,
      //             name: child.url.split("/")[3],
      //             component: () =>
      //               import(`@/views/main/${child.url.slice(5)}.vue`),
      //           });
      //         }
      //         console.log(`@/views/main/${child.url.slice(5)}.vue`);
      //       });
      //     }
      //   });
      // }
      // routes.push({
      //   path:'/role',
      //   name:"role",
      //   component:() => import('../views/main/system/role.vue')
      // });
      // 加入动态路由后，进行跳转
      // debugger
      next()
    }
  } else {
    next();
  }
});

export default router;
