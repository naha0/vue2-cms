<template>
  <div class="home">
    <el-container class="main-content">
      <el-aside :width="isCollege ? '200px' : '80px'">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header></nav-header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from '@/components/nav-menu/nav-menu.vue';
  import NavHeader from '@/components/nav-header/nav-header.vue';
export default {
  name: "home",
  components:{
    NavMenu,
    NavHeader
  },
  data() {
    return {
        isCollege: true
    };
  },
  props:{

  }
}
</script>

<style scoped lang="less">
.home {
  height: 100%;

  .el-container {
    background-color: rgba(214, 220, 227, 0.596);
    height: 100%;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    // background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
