<template>
  <div class="nav-header">
    <div class="header-start">
      <i :class="collapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="changeFold"></i>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="parClickItem">{{openParClickItem}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="clickItem">{{clickItem.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <user-info></user-info>
  </div>
</template>

<script>
import User from "@/views/main/system/users.vue";
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
      parClickItem:{},
      openParClickItem:'',
      foldBool:true,
      menuItem:[]
    };
  },
  props:{
    collapse:Boolean
  },
  methods:{
    changeFold(){
      this.foldBool = !this.foldBool
      console.log(this.foldBool);
      this.$emit('clickFold',this.foldBool)
    }
  },
  created(){
    this.$bus.$on('clickItem',(val,parVal)=>{
      this.clickItem = val
      this.parClickItem = parVal
    })
    this.$bus.$on("parClickItem",(val)=>{
      this.openParClickItem = val
    });
  },
  watch:{
    openParClickItem:{
      handler(newValue,oldValue){
        console.log(newValue,oldValue);
        if(newValue!==oldValue){
          this.clickItem = ''
        }
      }
    },
    'clickItem.name':{
      handler(newValue,oldValue){
        console.log('clickItem',this.clickItem);
        console.log('this.parClickItem',this.parClickItem);
        this.parClickItem.children.map(item=>{
          this.menuItem.push(item.name)
        })
        console.log(this.menuItem,oldValue);
        console.log(this.menuItem.includes(oldValue));
        if(this.menuItem.includes(oldValue)){
          console.log('包含');

        }else{
          this.openParClickItem = this.parClickItem.name
          this.clickItem = this.clickItem
          console.log('不包含');
        }
        this.menuItem = []
      },
    }
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
    font-size: 20px;
    
    .breadcrumb {
      margin-left: 20px;
    }
  }
}
</style>
