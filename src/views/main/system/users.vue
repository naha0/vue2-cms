<template>
  <div>
    <page-search
      :searchItem="formItem"
      @searchQueryClick="searchQueryClick"
      @resetQueryClick="resetQueryClick"
    ></page-search>
    <page-content
      :contentConfig="tableConfig"
      @openClick="openClick"
    ></page-content>
    <page-model
      :modelConfig="dialogConfig"
      ref="model"
      :modelData="allModelData"
      @changeModel="changeModel"
      @changeModelValue="changeModelValue"
      :addOrEdit="addOrEdit"
    ></page-model>
  </div>
</template>

<script>
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";
import { mapGetters, mapState } from "vuex";
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
            slotName: "realname",
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
      allModelData: {},
      addOrEdit: false,
      offset:0
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
      console.log((this.page.currentPage - 1) * this.page.size, this.page.size);
      const pageName = this.$route.name;
      this.$store.commit("main/getSearchQuery", query);
      this.offset = (this.page.currentPage - 1) * this.page.size
      if(!this.page.size){
        this.offset = 0
        this.page.size = 10
      }
      this.$store.dispatch("main/contentListData", {
        pageName,
        queryInfo: {
          ...query,
          offset: this.offset,
          size: this.page.size,
        },
      });
    },
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
    openClick(changeBool, data) {
      console.log(changeBool);
      this.$refs.model.dialogVisible = true;
      console.log('row',data);
      if (changeBool) {
        console.log("修改数据");
        for (const i in data) {
          console.log(i);
          this.$set(this.allModelData, i, data[i]);
        }
        console.log(this.allModelData);
        this.$store.commit('main/EditId',data.id)
        // this.allModelData = data;
        this.addOrEdit = true;
        console.log("传给page-model的data", data);
        console.log("传给page-model的数据", this.allModelData);
        // 是否显示password
        let isPassword = this.$refs.model.modelConfig.formItems.find(
          (item) => item.field == "password"
        );
        isPassword.isHidden = true;
      } else {
        console.log("新增数据");
        this.dialogConfig.formItems.forEach((item) => {
          this.$set(this.allModelData, item.field, "");
        });
        this.addOrEdit = false;
        // 是否显示password
        let isPassword = this.$refs.model.modelConfig.formItems.find(
          (item) => item.field == "password"
        );
        isPassword.isHidden = false;
      }
    },
    changeModel(changeBool) {
      this.$refs.model.dialogVisible = changeBool;
    },
    changeModelValue(itemName, val) {
      console.log("user中得到model改变的值", itemName, val);
    }
  },
  computed: {
    ...mapGetters("main", ["departmentOption", "roleOption"]),
    ...mapState("main", ["menuData"]),
  },
  watch: {
    departmentOption: {
      handler(newValue, oldValue) {
        console.log("watch中监听到的数据", newValue);
        this.dialogConfig.formItems.forEach((item) => {
          if (item.field == "departmentId") {
            item.options = this.departmentOption;
          }
        });
      },
    },
    roleOption: {
      handler(newValue, oldValue) {
        console.log("watch中监听到的数据", newValue);
        this.dialogConfig.formItems.forEach((item) => {
          if (item.field == "roleId") {
            item.options = this.roleOption;
          }
        });
      },
    },
  },
  mounted(){
    this.resetQueryClick()
  }
};
</script>

<style scoped lang="less"></style>
