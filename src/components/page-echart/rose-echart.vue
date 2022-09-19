<template>
  <div id="rose">
    <z-card :title="title">
      <template #content>
        <z-echart ref="roseEchartRef" :echartsData="echartData"></z-echart>
      </template>
    </z-card>
  </div>
</template>

<script>
import zEchart from "@/common/zEchart";
import zCard from "@/common/zCard";
import { mapGetters } from "vuex";
export default {
  name: "roseEchart",
  components: {
    zEchart,
    zCard,
  },
  data() {
    return {
      title: "分类商品数量(玫瑰图)",
      echartData: {
        id: "roseEchartRef",
        style: { width: "600px", height: "400px" },
        option: {
          legend: {
            top: "bottom",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "分类商品数量(玫瑰图)",
              type: "pie",
              radius: [10, 100],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8,
              },
              data: this.roseData,
            },
          ],
        },
      },
    };
  },
  created() {},
  mounted() {
    this.getList();
    console.log("玫瑰图", this.roseData);
  },
  methods: {
    getList() {
      this.$refs.roseEchartRef.showLoading();
      setTimeout(() => {
        // let seriesData = [
        //   {
        //     name: "分类商品数量(玫瑰图)",
        //     type: "pie",
        //     radius: [10, 100],
        //     center: ["50%", "50%"],
        //     roseType: "area",
        //     itemStyle: {
        //       borderRadius: 8,
        //     },
        //     data: this.handlerCategoryCount,
        //   },
        // ];
        // this.$set(this.echartData.option, "series", seriesData);
        this.$refs.roseEchartRef.drawEchart();
        this.$refs.roseEchartRef.hiddenLoading();
      }, 1000);
    },
  },
  // computed: {
  //   ...mapGetters("echart", ["handlerCategoryCount"]),
  // },
  props:['roseData'],
  watch:{
    roseData:{
      handler(newValue,oldValue){
        let seriesData = [
          {
            name: "分类商品数量(玫瑰图)",
            type: "pie",
            radius: [10, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: newValue,
          },
        ];
        // this.echartData.option.series[0].data = newValue
        // this.$set(this.echartData.option.series,data,newValue)
        this.$set(this.echartData.option, "series", seriesData);

      }
    }
  }
};
</script>

<style scoped lang="less"></style>
