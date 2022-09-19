<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <z-form :modelConfig="modelConfig" :modelData="modelData"></z-form>
      <slot></slot>
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
    addOrEdit: {
      type: Boolean,
      default: () => Boolean,
    },
    otherModelData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState("main", ["urlName", "editId"]),
  },
  methods: {
    cancel() {
      this.$emit("changeModel", false);
    },
    handlerConfirm() {
      console.log("点击确定", this.modelData);
      console.log(Object.keys(this.modelData));
      console.log(this.addOrEdit);
      let newObj = {};
      let needItem = this.modelConfig.formItems.map((item) => {
        if (item.isHidden !== true) {
          return item.field;
        }
      });
      for (const data in this.modelData) {
        console.log(data);
        if (needItem.includes(data)) {
          newObj[data] = this.modelData[data];
        }
      }
      if (Object.keys(this.modelData).length > 0 && this.addOrEdit) {
        console.log("编辑");

        console.log("----------------------------");
        // 判断model中是否有el-tree,然后处理修改的数据
        console.log(this.otherModelData);
        if (
          this.otherModelData &&
          this.otherModelData.hasOwnProperty("menuList")
        ) {
          console.log("这是el-tree页面");
          console.log(this.otherModelData);
          console.log({ ...newObj, ...this.otherModelData });
          this.$store.dispatch("main/updateData", {
            editData: { ...newObj, ...this.otherModelData },
            urlName: this.urlName + "/" + this.editId,
          });
        } else {
          console.log("普通页面");
          this.$store.dispatch("main/updateData", {
            editData: newObj,
            urlName: this.urlName + "/" + this.editId,
          });
        }
      } else {
        console.log("新建");
        console.log("----------------------------");
        console.log(this.otherModelData);
        // 判断model中是否有el-tree,然后处理修改的数据
        if (
          this.otherModelData &&
          this.otherModelData.hasOwnProperty("menuList")
        ) {
          console.log("这是el-tree页面");
          console.log({ ...newObj, ...this.otherModelData });
          this.$store.dispatch("main/createData", {
            newData: { ...newObj, ...this.otherModelData },
            urlName: this.urlName,
          });
        } else {
          console.log("普通页面");
          this.$store.dispatch("main/createData", {
            newData: newObj,
            urlName: this.urlName,
          });
        }
      }
      this.dialogVisible = false;
    },
  },
  watch: {
    modelData: {
      handler(newValue, oldValue) {
        console.log(newValue);

        this.modelConfig.formItems.forEach((item) => {
          this.$emit("changeModelValue", item.field, newValue);
        });
        console.log("page-model中监听的数据", this.modelData);
      },
      deep: true,
    },
  },
  created() {
    console.log(this.modelConfig);
    this.$store.dispatch("main/initData");
  },
};
</script>

<style scoped lang="less">
.el-col /deep/ {
  width: 100%;
}
</style>
