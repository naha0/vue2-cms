<template>
  <div>
    <page-content :contentConfig="tableConfig">
      <template #oldPrice="row">{{ "¥ " + row.oldPrice }}</template>
      <template #newPrice="row">{{ "¥ " + row.newPrice }}</template>
      <template #imgUrl="row">
        <el-image
          style="width: 70px; height: 70px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template>
    </page-content>
  </div>
</template>

<script>
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
export default {
  name: "goods",
  components: {
    pageSearch,
    pageContent,
  },
  data() {
    return {
      tableConfig: {
        title: "商品列表",
        propList: [
          {
            prop: "name",
            label: "商品名称",
            minWidth: "100",
          },
          {
            prop: "oldPrice",
            label: "原价",
            minWidth: "100",
            slotName: "oldPrice",
          },
          {
            prop: "newPrice",
            label: "现价",
            minWidth: "100",
            slotName: "newPrice",
          },
          {
            prop: "desc",
            label: "描述",
            minWidth: "100",
          },
          {
            prop: "imgUrl",
            label: "图片",
            minWidth: "100",
            slotName: "imgUrl",
          },
          {
            prop: "address",
            label: "地址",
            minWidth: "100",
          },
          {
            prop: "createAt",
            label: "创建时间",
            minWidth: "100",
            slotName: "createAt",
          },
          {
            prop: "updateAt",
            label: "更新时间",
            minWidth: "100",
            slotName: "updateAt",
          },
          {
            prop: "",
            label: "操作",
            minWidth: "120",
            slotName: "handler",
          },
        ],
        showIndexColumn: true,
        showSelectColumn: true,
      },
      page: {},
    };
  },
  provide() {
    return {
      AllTableData: this.tableConfig,
    };
  },
  methods: {
    resetQueryClick(resetData) {
      console.log("点击了重置");
      const pageName = this.$route.name;
      this.$store.commit("main/getSearchQuery", resetData);
      console.log(resetData);
      this.$store.dispatch("main/contentListData", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
  mounted() {
    this.resetQueryClick();
  },
};
</script>

<style scoped lang="less"></style>
