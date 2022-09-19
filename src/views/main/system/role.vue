<template>
  <div>
    <page-content
      :contentConfig="tableConfig"
      @openClick="openClick"
    ></page-content>
    <page-model
      :modelConfig="dialogConfig"
      ref="model"
      :addOrEdit="addOrEdit"
      :modelData="allModelData"
      :otherModelData="treeModelData"
    >
      <div class="role-tree">
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :props="{
            children: 'children',
            label: 'name',
          }"
          @check="handlerCheck"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<script>
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";
import { mapState } from "vuex";
import { getMenuLeafKeys } from "@/utils/tools";
export default {
  name: "role",
  components: {
    pageSearch,
    pageContent,
    pageModel,
  },
  data() {
    return {
      tableConfig: {
        title: "角色列表",
        propList: [
          {
            prop: "name",
            label: "角色名称",
            minWidth: "100",
          },
          {
            prop: "intro",
            label: "角色权限",
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
      dialogConfig: {
        formItems: [
          {
            field: "name",
            type: "input",
            label: "角色名称",
            placeholder: "请输入角色名称",
          },
          {
            field: "intro",
            type: "input",
            label: "角色描述",
            placeholder: "请输入角色描述",
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
      treeModelData: {
        menuList: [],
      },
    };
  },
  provide() {
    return {
      AllTableData: this.tableConfig,
      AllFormData: [],
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
    openClick(changeBool, data) {
      console.log(changeBool);
      this.$refs.model.dialogVisible = true;
      console.log("row", data);
      if (changeBool) {
        console.log("修改数据");
        for (const i in data) {
          console.log(i);
          this.$set(this.allModelData, i, data[i]);
        }
        console.log(this.allModelData);
        this.$store.commit("main/EditId", data.id);
        // this.allModelData = data;
        this.addOrEdit = true;
        console.log("传给page-model的data", data);
        console.log("传给page-model的数据", this.allModelData);
      } else {
        console.log("新增数据");
        this.treeModelData.menuList = [];
        this.dialogConfig.formItems.forEach((item) => {
          this.$set(this.allModelData, item.field, "");
        });
        this.addOrEdit = false;
      }

      // 处理el-tree中选中的数据
      if (data.menuList) {
        this.treeModelData.menuList = data.menuList.map((item) => item.id);
      }
      if (this.$refs.tree) {
        const leafKeys = getMenuLeafKeys(this.treeModelData.menuList);
        this.$refs.tree.setCheckedKeys(leafKeys, false);
      } else {
        console.log("没有获取到el-tree");
        this.$nextTick(() => {
          const leafKeys = getMenuLeafKeys(this.treeModelData.menuList);
          this.$refs.tree.setCheckedKeys(leafKeys, false);
        });
      }
    },
    handlerCheck(d1, d2) {
      console.log(d1, d2);
      if (d2.halfCheckedKeys.length > 0) {
        this.treeModelData.menuList = d2.halfCheckedKeys.concat(d2.checkedKeys);
      } else {
        this.treeModelData.menuList = d2.checkedKeys;
      }
    },
  },
  mounted() {
    this.resetQueryClick();
  },
  computed: {
    ...mapState("main", ["menuList"]),
  },
};
</script>

<style scoped lang="less">
.role-tree {
  margin-left: 20px;
}
</style>
