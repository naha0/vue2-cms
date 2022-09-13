<template>
  <div class="content">
    <div class="header">
      <slot name="header">
        <h1>{{tableConfig.title}}</h1>
        <div class="handlerBtn">
          <slot name="handlerBtn"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData.list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="75" align="center"></el-table-column>
      <el-table-column  v-bind="item" align="center" show-overflow-tooltip v-for="item in tableConfig.propList" :key="item.prop">
        <template slot-scope="{row}">
          <slot :name="item.slotName" v-bind="row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.count">
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
export default {
  name: "zTable",
  data() {
    return {
      tableConfig: this.AllTableData,
      page:{
        size:10,
        currentPage:1
      }
    };
  },
  props: {
    tableData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  inject: ["AllTableData"],
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.page.size = val
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
    }
  },
  mounted() {
    console.log(this.tableData);
    this.$emit('emitTableConfig',this.tableConfig)
  },
  computed:{
    ...mapState({
      searchQuery:state => state.main.searchQuery,
      urlName:state => state.main.urlName
    })
  },
  watch:{
    page:{
      handler(newValue,oldValue){
        console.log(newValue);
        console.log(this.$store.state.main);
        console.log(this.searchQuery,this.urlName);
        this.$store.dispatch("contentListData",{
          pageName:this.urlName,
          queryInfo:{
            ...this.searchQuery,
            ...this.page
          }
        })

      },
      deep:true,
    }
  }
};
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  padding: 20px;
  border-top: 20px solid #f0f2f5;
  .header {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    .title {
      font-size: 18px;
      font-weight: 700;
      float: left;
    }
    .handlerBtn {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
