<template>
    <div class="login">
      <h1>后台管理系统</h1>
      <el-card class="box-card">
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="120px">
          <el-form-item label="用户名：" prop="name" class="rightItem">
            <el-input v-model.trim="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" class="rightItem">
            <el-input v-model="loginForm.password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item class="formFooter">
            
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="submitLogin(loginForm)"
              >登录</el-button
            >
            <el-button type="primary" @click="resetLogin(loginForm)"
              >重置</el-button
            >
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          name: "",
          password: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 6, message: "用户名为coderwhy", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, message: "密码为123456", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      submitLogin(loginForm) {
        this.$store.dispatch('getUser',loginForm)
        this.$router.push('/home')
      },
      resetLogin() {
        this.loginForm = {
          name:'',
          password:''
        }
      },
    },
  };
  </script>
  
  <style scoped lang="less">
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
  
    .box-card {
      padding: 30px 0 0;
      width: 30%;
    }
    .rightItem{
      margin-right: 40px;
    }
  
    .formFooter{
      width: 100%;
    }
  }
  </style>
  