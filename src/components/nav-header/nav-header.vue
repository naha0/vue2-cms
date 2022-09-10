<template>
  <div class="nav-header">
    <div class="header-start">
      <i class="el-icon-s-fold iconFold"></i>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="clickParItem">{{clickParItem.name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="clickItem">{{clickItem.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <user-info></user-info>
  </div>
</template>

<script>
import User from "@/views/main/system/user.vue";
import userInfo from "./user-info.vue";
export default {
  name: "navHeader",
  components: {
    userInfo,
    User,
  },
  data() {
    return {
      clickItem:{},
      clickParItem:{}
    };
  },
  watch:{
    clickItem:{
      handler(newValue,oldValue){
        console.log(newValue);
      }
    }
  },
  created(){
    this.$bus.$on('clickItem',(val,parVal)=>{
      this.clickItem = val
      this.clickParItem = parVal

    })
  }
};
</script>

<style scoped lang="less">
.nav-header {
  height: 28px;
  padding: 12px 10px 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-start {
    display: flex;
    align-items: center;
    .iconFold {
      font-size: 20px;
    }
    .breadcrumb {
      margin-left: 20px;
    }
  }
}
</style>
