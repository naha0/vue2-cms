<template>
  <div class="user-info">
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    ></el-avatar>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        {{ username }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided @click.native="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    loginOut(){
      window.localStorage.clear()
      this.$router.replace({path:'/login'})
      console.log(22);
    }
  },
  created() {
    this.username = window.localStorage.getItem("name");
  },
};
</script>

<style scoped lang="less">
.user-info {
  height: 100%;
  display: flex;
  align-items: center;

  .el-avatar /deep/{
    width: 35px;
    height: 35px;
    line-height: 35px;
  }
  .el-dropdown-link {
    margin-left: 15px;
  }
}
</style>
