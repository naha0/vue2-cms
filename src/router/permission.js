import store from "@/store";

export default function setupPermission(router) {

  router.beforeEach(async (to, from, next) => {
    // 处理数据中的children数据
    if (to.path !== "/login") {
      const token = window.localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.log('返回');
        next({ path: "/login" });
      } else {
        console.log('有token，storeageAside为0');
        if (window.localStorage.getItem("storageAside") === "0" && token) {
          console.log("进入routes");
          const routes = await store.dispatch("main/getAllRoute");
          router.reloadRouter();
          for (const route of routes) {
            router.addRoute("main", route);
          }
          router.addRoute({
            path: "/:patchMatch(.*)*",
            name: "404",
            component: () =>
              import(/* webpackChunkName: '404' */ "@/views/404.vue"),
          });
          console.log("全部路由", router.getRoutes());
          next({ ...to, replace: true });
        }
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
      let rawResult = configRoute(raw);

      rawArray.push(rawResult);
      configRoute(raw);
    } else {
      flatRoutes(raw.children);
    }
  });
  let newRoutes = {};

  rawArray = rawArray.reduce((total, cur) => {
    newRoutes[cur.name] ? "" : (newRoutes[cur.name] = true && total.push(cur));
    return total;
  }, []);
  return rawArray;
};

export const configRoute = (config) => {
  // 这里菜单api得到的user数据与后面调用users的数据不一样，需要把user改成users
  if (config.url == "/main/system/user") {
    config.url = "/main/system/users";
  }
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
