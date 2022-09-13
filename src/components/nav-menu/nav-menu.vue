<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.png" class="img" />
      <h3 class="logo-title">Vue2 - cms</h3>
    </div>
    <div class="menu">
      <el-menu
        default-active="default"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#e7eaee"
        :collapse="!collapse"
      >
        <el-submenu :index="item.url" v-for="item in menuData" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span class="marginName">{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="subItem.url"
            v-for="subItem in item.children"
            :key="subItem.id"
            @click="clickMenu(subItem, item)"
            >{{ subItem.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { judgeName } from "@/utils/tools";
import { getMenu } from "@/api";
export default {
  name: "navMenu",
  data() {
    return {
      menuData: [],
      allRoutes: [],
    };
  },
  props:{
    collapse:Boolean
  },
  methods: {
    async getMenuData() {
      let res = await getMenu();
      // console.log(res);
      this.menuData = res.data;
      this.$store.commit("getCurrentRoute",this.$route.path)
      this.$store.commit("getMenuData", res.data);

      // this.menuData.forEach((item) => {
      //   console.log(this.$route);
      //   if (item.children.length > 0 && item.children) {
      //     item.children.forEach((child) => {
      //       if (child.type === 2) {
      //         let newUrl = this.$route.path + child.url.slice(5);
      //         console.log(654);
      //         this.$router.addRoute('home',{
      //           path:newUrl,
      //           name:child.url.split('/')[3],
      //           component:()=>import(`../../views/main/${child.url.slice(5)}.vue`)
      //         })
      //       }
      //       console.log(`@/views/main/${child.url.slice(5)}.vue`);
      //     });
      //   }
      // });
      // this.allRoutes.push();
      // this.$router.addRoute('home',{
      //   path: "/home/role",
      //   name: "role",
      //   component: () => import(`@/views/main/system/role.vue`),
      // });
      // this.$router.addRoute({
      //   path: "/:patchMatch(.*)*",
      //   name: "NotFound",
      //   component: () => import(/* webpackChunkName: '404' */ "@/views/404.vue"),
      // })
      // console.log(this.$router);
      // console.log(this.$router.getRoutes(),'nav-menu');
    },
    clickMenu(row,parRow) {
      console.log('--------------');
      console.log(row,parRow);
      console.log('--------------');
      this.$bus.$emit("clickItem", row, parRow);
      this.$store.commit("getUrlName", row.url.split("/")[3]);
      console.log(row.url);
      this.$router.push({path:row.url});
      // this.$router.push({path:'/home/role'})

    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      const keyItem =  key.split("/")[2]
      // console.log(keyItem);
      this.$bus.$emit("parClickItem", judgeName(keyItem));
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      this.$bus.$emit("parClickItem", '');
    },
  },
  created() {
    this.getMenuData();

    // console.log(this.$router.getRoutes());
  },
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  .logo {
    height: 28px;
    padding: 12px 10px 8px 20px;
    display: flex;
    align-items: center;
    background-color: #dde2e7;
    overflow: hidden;

    .img {
      height: 100%;
      margin-right: 20px;
    }

    .logo-title {
      font-weight: 600;
      font-size: 16px;
    }
  }
  .menu {
    background-color: #e7eaee;
    height: calc(100% - 50px);

    .marginName{
      margin-left: 10px;
    }
  }
}
</style>
