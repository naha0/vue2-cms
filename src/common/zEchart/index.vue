<template>
    <div class="echarts">
      <div :id="echartsData.id" :style="echartsData.style || defaultStyle"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import chinaMapData from './data/china.json'
  export default {
    props: {
      echartsData: {
        type: Object,
        default: () => {
          return {
            id: '',
            style: null,
            option: null,
          }
        }
      }
    },
    data() {
      return {
        defaultStyle: {width: '100%', height: '300px'}
      }
    },
    created() {
      echarts.registerMap('china', chinaMapData)
    },
    mounted() {
      this.drawEchart()
      window.addEventListener('resize',()=>{
        console.log('页面开始重绘啦');
        this.resizeEchart()
      })

    },
    methods: {
      // 获取echart节点
      getElementEchart() {
        // echarts.init(document.getElementById(this.echartsData.id)).dispose()
        return echarts.init(document.getElementById(this.echartsData.id))
      },
      // 绘制
      drawEchart() {
        let baseEchart = this.getElementEchart()
        baseEchart.setOption(this.echartsData.option)        
      },
      // 显示loading
      showLoading() {  
        let baseEchart = this.getElementEchart()
        baseEchart.showLoading()
      },
      // 隐藏loading
      hiddenLoading() {
        let baseEchart = this.getElementEchart()
        baseEchart.hideLoading()
      },
      // 重绘
      resizeEchart(){
        let baseEchart = this.getElementEchart()
        baseEchart.resize()
      }
    }
  }
  </script>
  
  <style scoped lang="less">
  .echarts {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>