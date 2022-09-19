import Vue from "vue";
import VueRouter from "vue-router";
import createRouterGuards from '@/router/guards'

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
    // children:[
    //   {
    //     path:'role',
    //     name:'role',
    //     component:()=>import("@/views/main/system/role.vue")
    //   }
    // ]
    children: [
      {
        path: "",
        redirect: "users",
      },
      {
        path: "users",
        name:'users',
        component: () =>
          import(
            /* webpackChunkName: 'home' */ "@/views/main/system/users.vue"
          ),
      },
      {
        path: "goods",
        name:'goods',
        component: () =>
          import(
            /* webpackChunkName: 'goods' */ "@/views/main/product/goods.vue"
          ),
      },
      {
        path:"menu",
        name:"menu",
        component:()=>import('@/views/main/system/menu.vue')
      },{
        path:"dashboard",
        name:"dashboard",
        component:()=>import('@/views/main/analysis/dashboard.vue')
      },{
        path:'role',
        name:'role',
        component:()=>import('@/views/main/system/role.vue')
      }
    ],
  },
  // {
  //   path: "/:patchMatch(.*)*",
  //   name: "404",
  //   component: () => import(/* webpackChunkName: '404' */ "@/views/404.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.addRoute('home',{
//   path: "/home/role",
//   name: "role",
//   component: () => import("@/views/main/system/role.vue"),
// });


// 解决重复登录时重复添加路由 或者 高级权限改低级权限时 某些路由已经注入的问题
// router.selfAddRoutes = (params) => {
//   const newRouter = createRouter();
//   router.matcher = newRouter.matcher;
//   // 新路由实例matcher，赋值给旧路由实例的matcher，（相当于replaceRouter）
//   if (params) {
//     router.addRoute(params);
//   }
//   router.history.setupListeners();
// };

// router.addRoute({
//   path: "/:patchMatch(.*)*",
//   name: "404",
//   component: () => import(/* webpackChunkName: '404' */ "@/views/404.vue"),
// });
// router.beforeEach(async(to, from, next) => {
  // if (to.path !== "/login") {
  //   const token = window.localStorage.getItem("token");
  //   if (!token) {
  //     console.log(111);
  //     next("/login");
  //   } else {
  //     console.log(222);
  //     await store.dispatch("getAllRoute")
  //     next();
  //   }
  // } else {
  //   next();
  // }
// });
createRouterGuards(router)
export default router;