<template>
  <div>
    <z-table :tableData="pageListData" @emitTableConfig="emitTableConfig" v-bind="configData.propList">

      <template #handlerBtn>
        <el-button @click="addClick">新增用户</el-button>
      </template>
      <template #enable="row">
        <el-button>{{ row.enable == 0 ? "禁用" : "启用" }}</el-button>
      </template>
      <template #createAt="row">{{ row.createAt | formatFilter}}</template>
      <template #updateAt="row">{{ row.updateAt | formatFilter }}</template>
      <template #handler="row">
        <el-button type="primary" @click="editClick(row)">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </z-table>
  </div>
</template>

<script>
import zTable from "@/common/zTable";
import { mapGetters } from "vuex";
export default {
  name: "pageContent",
  components: {
    zTable,
},
  data() {
    return {
      itemListData: [],
      configData:{}
    };
  },
  methods: {
    handlerData() {
      this.pageListData.filter((item) => {});
    },
    emitTableConfig(configData){
      console.log(configData);
      this.configData = configData
    },
    addClick(){
      this.$emit("openClick",false,{})
    },
    editClick(row){
      this.$emit("openClick",true,row)
    }
  },
  computed: {
    ...mapGetters(["pageListData"]),
  },
  created() {
    // this.getTableData()
  },
  filters: {
    formatFilter(value) {
      var data = new Date(value).toJSON();
      return new Date(+new Date(data) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  },
};
</script>

<style scoped lang="less"></style>
