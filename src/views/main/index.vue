<template>
  <div class="home">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '200px' : '60px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header style="height:48px">
          <nav-header @clickFold="clickFold" :collapse="isCollapse"></nav-header>
        </el-header>
        <el-main style="padding:0 20px 20px 20px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from '@/components/nav-menu/nav-menu.vue';
  import NavHeader from '@/components/nav-header/nav-header.vue';
export default {
  name: "main",
  components:{
    NavMenu,
    NavHeader
  },
  data() {
    return {
        isCollapse: true
    };
  },
  methods:{
    clickFold(foldBool){
      console.log(foldBool);
      this.isCollapse = foldBool
    }
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
