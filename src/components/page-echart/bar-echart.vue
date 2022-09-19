<template>
  <div id="app">
    <z-card :title="title">
      <template #content>
        <z-echart ref="barEchartRef" :echartsData="echartData"></z-echart>
      </template>
    </z-card>
  </div>
</template>

<script>
import zEchart from "@/common/zEchart";
import zCard from "@/common/zCard";
import { mapGetters } from "vuex";

export default {
  name: "barEchart",
  components: { zEchart, zCard },
  data() {
    return {
      title: "分类商品数量(饼图)",
      echartData: {
        id: "barEchartRef",
        style: { width: "600px", height: "400px" },
        option: {
          title: {
            text: "支持鼠标的滚动与缩放",
          },
          tooltip: {},
          legend: {
            data: ["销量"],
          },
          xAxis: {
            data: [],
            axisLabel: {
              inside: true,
              color: "#fff",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            z: 10,
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#999",
            },
          },
          series: [
            {
              name: "销量",
              type: "bar",

              data: [],
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$refs.barEchartRef.showLoading();
      setTimeout(() => {
        let xAxisData = this.handlerCategoryName;
        let seriesData = [
          {
            name: "销量",
            type: "bar",

            data: this.handlerCategoryFavor,
          },
        ];
        this.$set(this.echartData.option.xAxis, "data", xAxisData);
        this.$set(this.echartData.option, "series", seriesData);
        this.$refs.barEchartRef.drawEchart();
        this.$refs.barEchartRef.hiddenLoading();
      }, 1000);
    },
  },
  computed: {
    ...mapGetters("echart", ["handlerCategoryName", "handlerCategoryFavor"]),
  },
  created() {
    console.log(this.handlerCategoryName);
  },
};
</script>
