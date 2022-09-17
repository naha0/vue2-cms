import store from "@/store";

export default function setupPermission(router) {
  console.log(221);
  router.beforeEach(async (to, from, next) => {
    // 处理数据中的children数据
    if (to.path !== "/login") {
      const token = window.localStorage.getItem("token");
      if (!token) {
        console.log(111);
        next({ path: "/login" });
      } else {
        console.log("进入routes");
        // const routes = flatRoutes(menuData.data);
        const routes = await store.dispatch("main/getAllRoute");
        console.log("routes", routes);
        // routes?.forEach((route) => {
        //   console.log(route);
        //   router.addRoute("main", route);
        //   //   router.matcher = new VueRouter().matcher;
        // });
        router.addRoute({
          path: "/:patchMatch(.*)*",
          name: "404",
          component: () =>
            import(/* webpackChunkName: '404' */ "@/views/404.vue"),
        });
        next();
      }
    } else {
      next();
    }
  });
}

var rawArray = [];
export const flatRoutes = (rawRoutes) => {
  const result = [];

  console.log(rawRoutes);
  rawRoutes.forEach((raw) => {
    if (raw.type === 2) {
      result.push(raw);
      console.log("configRoute(raw)", configRoute(raw));
      let rawResult = configRoute(raw);

      rawArray.push(rawResult);

      console.log("rawArray", rawArray);
      console.log("result", result);
      configRoute(raw);
    } else {
      flatRoutes(raw.children);
    }
  });
  let newRoutes = {};
  console.log("rawArray", rawArray);

  rawArray = rawArray.reduce((total, cur) => {
    console.log(total);
    newRoutes[cur.name] ? "" : newRoutes[cur.name] = true && total.push(cur);
    return total;
  }, []);
  console.log("rawArray", rawArray);
  return rawArray;
};

var comData = [];

export const configRoute = (config) => {
  console.log(config);
  const { url } = config;
  const urlArray = url.split("/");
  const name = urlArray[urlArray.length - 1];
  // console.log(url,name);
  // let comObj = {}
  // comObj[name] = url
  // comData.push(comObj)
  // console.log('comData',comData);
  // store.commit('getRouteCom',comData)
  return {
    path: url,
    name,
    children: [],
    component: routeMap[name],
  };
};

export const routeMap = {
  dashboard: () => import("@/views/main/analysis/dashboard.vue"),
  overview: () => import("@/views/main/analysis/overview.vue"),
  category: () => import("@/views/main/product/category.vue"),
  goods: () => import("@/views/main/product/goods.vue"),
  chat: () => import("@/views/main/story/chat.vue"),
  list: () => import("@/views/main/story/list.vue"),
  department: () => import("@/views/main/system/department.vue"),
  menu: () => import("@/views/main/system/menu.vue"),
  role: () => import("@/views/main/system/role.vue"),
  users: () => import("@/views/main/system/users.vue"),
};

// export const routeMap = (routes) =>{
//   routes.forEach((route)=>{
//     comName = Object.keys(item)[0]
//     `${comName}`: () => import(`@/views/${route[Object.keys(item)[0]]}.vue`)
//   })
// }
