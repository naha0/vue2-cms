<template>
  <div>
    <page-content :contentConfig="tableConfig">
      <template #name="row">{{row.name}}</template>
    </page-content>
  </div>
</template>

<script>
import pageContent from "@/components/page-content/page-content.vue";
import { mapState,mapGetters } from "vuex";
export default {
  name: "memu",
  components: {
    pageContent,
  },
  data() {
    return {
      tableConfig: {
        title: "菜单列表",
        propList: [
          { prop: "name", label: "用户名", minWidth: "100",slotName:'name' },
          {
            prop: "type",
            label: "类型",
            minWidth: "100",
          },
          {
            prop: "url",
            label: "菜单url",
            minWidth: "100",
          },
          { prop: "icon", label: "菜单icon", minWidth: "100" },
          { prop: "permission", label: "按钮权限", minWidth: "100" },
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
        showIndexColumn: false,
        showSelectColumn: false,
        childrenProps: {
          rowKey: "id",
          treeProp: {
            children: "children",
          },
        },
      },
      isCount:false
    };
  },
  provide(){
    return{
      AllTableData:this.tableConfig
    }
  },
  methods:{
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
    handleNodeClick(data) {
        console.log(data);
      }
  },
  mounted(){
    console.log(this.pageListData);
    this.resetQueryClick()
  },
  computed:{
    ...mapState('main',['menuData']),
    ...mapGetters('main',['pageListData'])
  },
  watch:{
    pageListData:{
      handler(newValue,oldValue){
        this.isCount??false
        console.log(newValue);
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
