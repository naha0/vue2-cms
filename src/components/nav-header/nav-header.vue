<template>
  <div class="nav-header">
    <div class="header-start">
      <i class="el-icon-s-fold iconFold"></i>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
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
    return {};
  },
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
    .iconFold {
      font-size: 20px;
    }
    .breadcrumb {
      margin-left: 20px;
    }
  }
}
</style>
