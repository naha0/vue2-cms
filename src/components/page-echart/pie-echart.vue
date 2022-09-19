<template>
  <div id="pie">
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
  name: "pieEchart",
  components: { zEchart, zCard },
  data() {
    return {
      title: "分类商品数量(饼图)",
      echartData: {
        id: "pieEchartRef",
        style: { width: "600px", height: "400px" },
        option: {
          title: {
            text: "",
            subtext: "",
            left: "",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            left: "left",
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "50%",
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("echart", ["handlerCategoryCount"]),
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$refs.barEchartRef.showLoading();

      setTimeout(() => {
        let seriesData = [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.handlerCategoryCount,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ];
        this.$set(this.echartData.option, "series", seriesData);
        this.$refs.barEchartRef.drawEchart();
        this.$refs.barEchartRef.hiddenLoading();
      }, 2000);
    },
  },
};
</script>
