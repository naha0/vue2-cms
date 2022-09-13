<template>
  <div>
    <page-search
      :searchItem="formItem"
      @searchQueryClick="searchQueryClick"
      @resetQueryClick="resetQueryClick"
    ></page-search>
    <page-content :contentConfig="tableConfig" @openClick="openClick"></page-content>
    <page-model :modelConfig="dialogConfig" ref="model" :modelData="allModelData"></page-model>
  </div>
</template>

<script>
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

export default {
  name: "users",
  components: {
    pageContent,
    pageSearch,
    pageModel,
  },
  data() {
    return {
      formItem: [
        {
          field: "name",
          type: "input",
          label: "用户名",
          placeholder: "请输入用户名",
        },
        {
          field: "realname",
          type: "input",
          label: "真实姓名",
          rules: [],
          placeholder: "请输入真实姓名",
        },
        {
          field: "cellphone",
          type: "input",
          label: "手机号码",
          rules: [],
          placeholder: "请输入手机号码",
        },
        {
          field: "enable",
          type: "select",
          label: "用户状态",
          rules: [],
          placeholder: "请选择用户状态",
          options: [
            {
              title: "启用",
              value: "1",
            },
            {
              title: "禁用",
              value: "0",
            },
          ],
        },
        {
          field: "createTime",
          type: "datepicker",
          label: "创建时间",
          otherOptions: {
            type: "daterange",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            rangeSeparator: "-",
          },
        },
      ],
      tableConfig: {
        title: "用户列表",
        propList: [
          { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
          {
            prop: "realname",
            label: "真实姓名",
            minWidth: "100",
            slotName: "realName",
          },
          {
            prop: "cellphone",
            label: "电话号码",
            minWidth: "100",
            slotName: "cellphone",
          },
          {
            prop: "enable",
            label: "状态",
            minWidth: "100",
            slotName: "enable",
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
      dialogConfig: {
        formItems: [
          {
            field: "name",
            type: "input",
            label: "用户名",
            placeholder: "请输入用户名",
          },
          {
            field: "realname",
            type: "input",
            label: "真实姓名",
            placeholder: "请输入真实姓名",
          },
          {
            field: "password",
            type: "password",
            label: "用户密码",
            placeholder: "请输入用户密码",
            isHidden: false,
          },
          {
            field: "cellphone",
            type: "input",
            label: "电话号码",
            placeholder: "请输入电话号码",
          },
          {
            field: "departmentId",
            type: "select",
            label: "选择部门",
            placeholder: "请选择部门",
            options: [],
          },
          {
            field: "roleId",
            type: "select",
            label: "选择角色",
            placeholder: "请选择角色",
            options: [],
          },
        ],
        labelWidth: "120px",
        colLayout: {
          span: 24,
        },
        itemStyle: {
          padding: "10px 0",
        },
      },
      page: {},
      allModelData:{}
    };
  },
  provide() {
    return {
      AllFormData: this.formItem,
      AllTableData: this.tableConfig,
    };
  },
  methods: {
    searchQueryClick(query) {
      console.log(query);
      const pageName = this.$route.name;
      this.$store.commit("getSearchQuery", query);
      this.$store.dispatch("contentListData", {
        pageName,
        queryInfo: {
          ...query,
          offset: this.page.currentPage * this.page.size,
          size: this.page.size,
        },
      });
    },
    resetQueryClick() {
      const pageName = this.$route.name;
      this.$store.commit("getSearchQuery", {});
      this.$store.dispatch("contentListData", {
        pageName,
        queryInfo: {
          offset: 0,
          size: this.page.size,
        },
      });
    },
    openClick(changeBool,data){
      console.log(changeBool);
      this.$refs.model.dialogVisible = true
      if(changeBool){
        console.log('修改数据');
        console.log(data);
        this.allModelData = data
        console.log(this.allModelData);
      }else{
        console.log('新增数据');
      }
    }
  },
};
</script>

<style scoped lang="less"></style>
