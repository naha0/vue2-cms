<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="7">
        <pie-echart></pie-echart>
      </el-col>
      <el-col :span="10">
        <map-echart></map-echart>
      </el-col>
      <el-col :span="7">
        <rose-echart :roseData="handlerCategoryCount"></rose-echart>
      </el-col>
    </el-row>
    <div class="bottomEchart">
      <el-row :gutter="20">
        <el-col :span="12">
          <line-echart></line-echart>
        </el-col>
        <el-col :span="12">
          <bar-echart></bar-echart>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import pieEchart from "@/components/page-echart/pie-echart.vue";
import barEchart from "@/components/page-echart/bar-echart.vue";
import mapEchart from "@/components/page-echart/map-echart.vue";
import roseEchart from "@/components/page-echart/rose-echart.vue";
import lineEchart from "@/components/page-echart/line-echart.vue";
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  components: {
    pieEchart,
    barEchart,
    mapEchart,
    roseEchart,
    lineEchart,
  },
  created() {
    this.$store.dispatch("echart/getDashboardMsg");
  },
  computed: {
    ...mapGetters("echart", ["handlerCategoryCount"]),
  },
};
</script>

<style scoped lang="less">
.bottomEchart {
  margin-top: 20px;
}
</style>
