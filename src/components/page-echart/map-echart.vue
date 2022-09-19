<template>
  <div id="map">
    <z-card :title="title">
      <template #content>
        <z-echart ref="mapEchartRef" :echartsData="echartData"></z-echart>
      </template>
    </z-card>
  </div>
</template>

<script>
import zEchart from "@/common/zEchart";
import zCard from "@/common/zCard";
import { convertData } from "./utils/convert-data";
import { mapGetters } from "vuex";
export default {
  name: "mapEchart",
  components: {
    zEchart,
    zCard,
  },
  data() {
    return {
      title: "不同城市商品销量",
      echartData: {
        id: "mapEchartRef",
        style: { width: "600px", height: "400px" },
        option: {
          backgroundColor: "#fff",
          title: {
            text: "全国销量统计",
            left: "center",
            textStyle: {
              color: "#fff",
            },
          },
          tooltip: {
            trigger: "item",
            formatter: function (params) {
              return params.name + " : " + params.value[2];
            },
          },
          visualMap: {
            min: 0,
            max: 60000,
            left: 20,
            bottom: 20,
            calculable: true,
            text: ["高", "低"],
            inRange: {
              color: [
                "rgb(70, 240, 252)",
                "rgb(250, 220, 46)",
                "rgb(245, 38, 186)",
              ],
            },
            textStyle: {
              color: "#fff",
            },
          },
          geo: {
            map: "china",
            roam: "scale",
            emphasis: {
              areaColor: "#f4cccc",
              borderColor: "rgb(9, 54, 95)",
              itemStyle: {
                areaColor: "#f4cccc",
              },
            },
          },
          series: [
            {
              name: "销量",
              type: "scatter",
              coordinateSystem: "geo",
              data: [],
              symbolSize: 12,
              emphasis: {
                itemStyle: {
                  borderColor: "#fff",
                  borderWidth: 1,
                },
              },
            },
            {
              type: "map",
              map: "china",
              geoIndex: 0,
              aspectScale: 0.75,
              tooltip: {
                show: false,
              },
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
      this.$refs.mapEchartRef.showLoading();
      setTimeout(() => {
        console.log(convertData(this.handlerAddressSale));
        let seriesData = [
          {
            name: "销量",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(this.handlerAddressSale),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
          },
          {
            type: "map",
            map: "china",
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false,
            },
          },
        ];
        this.$set(this.echartData.option, "series", seriesData);
        this.$refs.mapEchartRef.drawEchart();
        this.$refs.mapEchartRef.hiddenLoading();
      }, 1000);
    },
  },
  computed: {
    ...mapGetters("echart", ["handlerAddressSale"]),
  },
};
</script>

<style scoped lang="less"></style>
