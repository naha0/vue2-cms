<template>
  <div class="zForm">
    <z-form
      @update:formData="handleValueChange"
      :formDataExample="zFormData"
    >
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="rightBtn">
          <el-button type="primary" @click="searchClick">搜索</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </div>
      </template>
    </z-form>
  </div>
</template>

<script>
import ZForm from "../../common/zForm/index.vue";
export default {
  name: "pageSearch",
  components: {
    ZForm,
  },
  data() {
    return {
      formAll: {},
      zFormData: {},
    };
  },
  props: {
    searchItem: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    handleValueChange(val) {
      // this.zFormData = val
      // this.zFormData = { ...this.zFormData,...val}
      Object.assign(this.zFormData,val)
    },
    searchClick() {
      console.log(this.zFormData);
      this.$emit('searchQueryClick',this.zFormData)
    },
    resetClick() {
      console.log('resetClick');
      this.searchItem.forEach((item) => {
        this.$set(this.zFormData,item.field,'')
      });
      this.$emit('resetQueryClick',this.zFormData)
      console.log(this.zFormData);
    },
  },
  mounted() {
    this.resetClick()
    console.log(this.zFormData);
  },
};
</script>

<style scoped lang="less">
.zForm {
  // height: 250px;
  
  background-color: #fff;
  padding: 20px 0;

  .rightBtn {
    display: flex;
    justify-content: flex-end;
    // padding-bottom: 20px;
    padding-right: 10px;
  }
}
</style>
