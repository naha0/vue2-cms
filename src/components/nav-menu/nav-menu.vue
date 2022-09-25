<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.png" class="img" />
      <h3 class="logo-title">Vue2 - cms</h3>
    </div>
    <div class="menu">
      <el-menu
        :default-active="allRoute[0].path"
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
import { mapState } from "vuex";
export default {
  name: "navMenu",
  data() {
    return {
      menuData: [],
    };
  },
  props:{
    collapse:Boolean
  },
  methods: {
    async getMenuData() {
      let res = await getMenu(this.userId);
      // console.log(res);
      this.menuData = res.data;
      this.$store.commit("main/getCurrentRoute",this.$route.path)
      this.$store.commit("main/getMenuData", res.data);
    },
    clickMenu(row,parRow) {
      console.log('--------------');
      console.log(row,parRow);
      console.log('--------------');
      this.$bus.$emit("clickItem", row, parRow);
      this.$store.commit("main/getUrlName", row.url.split("/")[3]);
      console.log(row.url);
      if(row.url==='/main/system/user'){
        row.url = '/main/system/users'
      }
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
  },
  computed:{
    ...mapState('main',['userId','allRoute'])
  }
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
