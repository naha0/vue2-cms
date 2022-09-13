<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <z-form :modelConfig="modelConfig" :modelData="modelData"></z-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handlerConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import zForm from '@/common/zForm'
export default {
  name: "pageModel",
  components:{
    zForm
  },
  data() {
    return {
        dialogVisible: true,
    };
  },
  props:{
    modelConfig:{
      type:Object,
      default:()=>{}
    },
    modelData:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    cancel(){

    },
    handlerConfirm(){
      console.log('点击确定',this.modelData);
    }
  },
  watch:{
    modelData:{
      handler(newValue,oldValue){
        console.log(this.modelConfig);
        
        // this.modelConfig?.formItems.foreach(item=>{
        //   console.log(item);
        //   this.modelData[item.field] = newValue
        // })
        for(const item of this.modelConfig.formItems){
          console.log(item);
        }
        console.log(this.modelData);
        console.log(newValue,oldValue);
      },
      deep:true,
    }
  },
  created(){
    console.log(this.modelConfig);
  }
};
</script>

<style scoped lang="less">
  .el-col /deep/{
    width: 100%;
  }
</style>
