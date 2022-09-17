<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-row :gutter="20">
      <el-form
        :inline="true"
        :model="formData"
        class="demo-form-inline"
        :label-width="labelWidth"
        ref="form"
      >
        <el-col
          v-for="(item, index) in formList"
          :key="index"
          v-bind="colLayout"
        >
        <template v-if="item.type == 'input' || item.type == 'password'">
          <el-form-item :label="item.label" v-if="!item.isHidden">
              <el-input
                v-model="formData[`${item.field}`]"
                :placeholder="item.placeholder"
                style="width: 100%"
              ></el-input>
          </el-form-item>
        </template>
          
          <el-form-item :label="item.label" v-else-if="item.type == 'select'">
            <el-select
              v-model="formData[`${item.field}`]"
              :placeholder="item.placeholder"
              style="width: 100%"
            >
              <el-option
                v-for="option in item.options"
                :value="option.value"
                :key="option.value"
                >{{ option.title }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="item.label"
            v-else-if="item.type == 'datepicker'"
          >
            <el-date-picker
              v-model="formData[`${item.field}`]"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="daterange"
              v-bind="item.otherOptions"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "zForm",
  data() {
    return {
      formList: this.AllFormData,
      formData: {},
      labelWidth: "120px",
      colLayout: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      },
    };
  },
  props: {
    modelConfig: {
      type: Object,
      default: () => {},
    },
    modelData: {
      type: Object,
      default: () => {},
    },
  },
  inject: ["AllFormData"],
  methods: {
    // handleValueChange(value, field) {
    //   console.log(value, field);
    // },
  },
  watch: {
    formData: {
      handler(newValue, oldValue) {
        console.log("newValue", newValue);
        this.$emit("update:formData", newValue);
      },
      deep: true,
    },
  },
  created() {
    this.$nextTick(() => {
      if (this.modelData && this.modelConfig) {
        this.formData = this.modelData;
        console.log("modelConfig", this.modelConfig);
        const { colLayout, labelWidth, formItems, itemStyle } =
          this.modelConfig;
        this.colLayout = colLayout;
        this.formList = formItems;
        console.log(colLayout, formItems);
      }
    });
  },
};
</script>

<style scoped lang="less">
.form {
  height: 100%;

  .el-form-item {
    flex: 1;
    display: flex;
  }
  .el-form-item /deep/ .el-form-item__content {
    width: 100%;
  }
  .header {
    margin-bottom: 40px;
  }
  .footer {
    // width: 200px;
    margin: 20px 0;
  }
}
</style>
