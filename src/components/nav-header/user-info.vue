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
        <el-dropdown-item divided>退出</el-dropdown-item>
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
  methods: {},
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
  .el-dropdown-link {
    margin-left: 15px;
  }
}
</style>
