<template>
  <div id="rose">
    <z-card :title="title">
      <template #content>
        <z-echart ref="lineEchartRef" :echartsData="echartData"></z-echart>
      </template>
    </z-card>
  </div>
</template>

<script>
import zEchart from "@/common/zEchart";
import zCard from "@/common/zCard";
import { mapGetters } from "vuex";
export default {
  name: "lineEchart",
  components: {
    zEchart,
    zCard,
  },
  data() {
    return {
      title: "分类销量的统计",
      echartData: {
        id: "lineEchartRef",
        style: { width: "600px", height: "400px" },
        option: {
          title: {
            text: "",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: ["分类销量统计"],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "分类销量统计",
              type: "line",
              stack: "Total",
              areaStyle: {},
              emphasis: {
                focus: "series",
              },
              data: [],
            },
          ],
        },
      },
    };
  },
  // props: {
  //   lineData: {
  //     type: Array,
  //     default: () => [],
  //   },
  //   xLineData:{
  //       type:Array,
  //       default:()=>[]
  //   }
  // },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$refs.lineEchartRef.showLoading();

      setTimeout(() => {
        let seriesData = [
          {
            name: "分类销量统计",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: this.handlerCategorySale,
          },
        ];
        let xAxisData = [
          {
            type: "category",
            boundaryGap: false,
            data: this.handlerCategoryName,
          },
        ];
        this.$set(this.echartData.option, "series", seriesData);
        this.$set(this.echartData.option, "xAxis", xAxisData);
        this.$refs.lineEchartRef.drawEchart();
        this.$refs.lineEchartRef.hiddenLoading();
      }, 2000);
    },
  },
  computed: {
    ...mapGetters("echart", ["handlerCategorySale", "handlerCategoryName"]),
  },
};
</script>

<style scoped lang="less"></style>
