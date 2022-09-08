<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.png" class="img" />
      <h3 class="logo-title">Vue2 - cms</h3>
    </div>
    <div class="menu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#e7eaee"
      >
        <el-submenu :index="item.url" v-for="item in menuData" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
              :index="subItem.url"
              v-for="subItem in item.children"
              :key="subItem.id"
              >{{ subItem.name }}</el-menu-item
            >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getMenu } from "@/api";
export default {
  name: "navMenu",
  data() {
    return {
      menuData: [],
    };
  },
  methods: {
    async getMenuData() {
      let res = await getMenu();
      console.log(res);
      this.menuData = res.data;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.getMenuData();
  },
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  .logo {
    height: 28px;
    padding: 12px 10px 8px 10px;
    display: flex;
    align-items: center;
    background-color: #dde2e7;

    .img {
      height: 100%;
      margin-right: 20px;
    }

    .logo-title {
      font-weight: 600px;
      font-size: 16px;
    }
  }
  .menu {
    background-color: #e7eaee;
    height: calc(100% - 50px);
  }
}
</style>
