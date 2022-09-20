import store from "@/store";

export default function setupPermission(router) {
 router.beforeEach(async (to, from, next) => {
    if (window.localStorage.getItem("storageAside") === "0") {
        console.log("进入routes");     
        const routes = await store.dispatch("main/getAllRoute");
        router.reloadRouter()
        for(const route of routes){
          console.log(route);

          router.addRoute("main", route);
        }
        router.addRoute({
          path: "/:patchMatch(.*)*",
          name: "404",
          component: () =>
            import(/* webpackChunkName: '404' */ "@/views/404.vue"),
        });
        console.log('全部路由',router.getRoutes());
        next({...to, replace: true});
      }
    // 处理数据中的children数据
    if (to.path !== "/login") {
      const token = window.localStorage.getItem("token");
      if (!token) {
        alert("请登录")
        next({ path: "/login" });
      } else {
        next()
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
    newRoutes[cur.name] ? "" : (newRoutes[cur.name] = true && total.push(cur));
    return total;
  }, []);
  console.log("rawArray", rawArray);
  return rawArray;
};

var comData = [];

export const configRoute = (config) => {
  // 这里菜单api得到的user数据与后面调用users的数据不一样，需要把user改成users
  if (config.url == "/main/system/user") {
    config.url = "/main/system/users";
  }
  console.log(config);
  const { url } = config;
  const urlArray = url.split("/");
  const name = urlArray[urlArray.length - 1];
  return {
    path: url,
    name,
    children: [],
    component: () => import(`@/views${url}.vue`),
  };
};

