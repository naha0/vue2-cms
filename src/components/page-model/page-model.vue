<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <z-form :modelConfig="modelConfig" :modelData="modelData"></z-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handlerConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import zForm from "@/common/zForm";
import { mapState } from "vuex";
export default {
  name: "pageModel",
  components: {
    zForm,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  props: {
    // 当前dialog有哪些输入框
    modelConfig: {
      type: Object,
      default: () => {},
    },
    // 当前dialog的数据
    modelData: {
      type: Object,
      default: () => {},
    },
    addOrEdit:{
      type:Boolean,
      default:() => Boolean
    }
  },
  computed:{
    ...mapState('main',['urlName','editId'])
  },
  methods: {
    cancel() {
      this.$emit("changeModel", false);
    },
    handlerConfirm() {
      console.log("点击确定", this.modelData);
      console.log(Object.keys(this.modelData));
      if(Object.keys(this.modelData).length>0 && this.addOrEdit){
        console.log('编辑');
        let newObj = {}
        let needItem = this.modelConfig.formItems.map(item=>{
          if(item.isHidden!==true){
            return item.field
          }
        })
        for(const data in this.modelData){
          console.log(data);
          if(needItem.includes(data)){
            newObj[data] = this.modelData[data]
          }
        }
        this.$store.dispatch('main/updateData',{
          editData:newObj,
          urlName:this.urlName + '/' +this.editId
        })
      }else{
        console.log('新建');
        this.$store.dispatch('main/createData',{
          newData:this.modelData,
          urlName:this.urlName
        })
      }
      this.dialogVisible = false
    },
  },
  watch: {
    modelData: {
      handler(newValue, oldValue) {
        console.log(newValue);

        this.modelConfig.formItems.forEach((item) => {
          this.$emit('changeModelValue',item.field,newValue)
        });
        console.log("page-model中监听的数据", this.modelData);
      },
      deep: true,
    },
  },
  created() {
    console.log(this.modelConfig);
    this.$store.dispatch('main/initData')
  },
  
};
</script>

<style scoped lang="less">
.el-col /deep/ {
  width: 100%;
}
</style>
