<template>
  <div>
    <z-table
      :tableData="pageListData"
      @emitTableConfig="emitTableConfig"
      v-bind="configData.propList"
    >
      <template v-for="item in otherSlotName"  #[item.slotName]="row">
        {{row[item.slotName]}}
      </template>
      <template #handlerBtn>
        <el-button @click="addClick">新增用户</el-button>
      </template>
      <template #enable="row">
        <el-button>{{ row.enable == 0 ? "禁用" : "启用" }}</el-button>
      </template>
      <template #createAt="row">{{ row.createAt | formatFilter }}</template>
      <template #updateAt="row">{{ row.updateAt | formatFilter }}</template>
      <template #handler="row">
        <el-button type="primary" @click="editClick(row)">编辑</el-button>
        <el-button type="danger" @click="delClick(row)">删除</el-button>
      </template>
    </z-table>
  </div>
</template>

<script>
import zTable from "@/common/zTable";
import { mapGetters, mapState } from "vuex";
export default {
  name: "pageContent",
  components: {
    zTable,
  },
  data() {
    return {
      itemListData: [],
      configData: {},
      otherSlotName:[]
    };
  },
  methods: {
    handlerData() {
      this.pageListData.filter((item) => {});
    },
    emitTableConfig(configData) {
      console.log(configData);
      this.configData = configData;
    },
    addClick() {
      console.log('pageContent里面的modelConfig',this.configData);
      console.log(this.urlName);
      this.$emit("openClick", false, {});
    },
    editClick(row) {
      this.$emit("openClick", true, row);
    },
    slotName() {
      console.log(this.configData);
        this.otherSlotName = this.configData?.propList.filter((item) => {
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "enable") return false;
        if (item.slotName === "handler") return false;
        return true
      });
    },
    delClick(row){
      this.$store.dispatch('main/deleteData',{
        id:row.id,
        urlName:this.urlName
      })
    }
  },
  computed: {
    ...mapGetters('main',["pageListData"]),
    ...mapState('main',['urlName'])
  },
  mounted() {
    // this.getTableData()
    this.slotName()
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
