<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "BarCHart",
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      alLData: null
    }
  },
  created() {
    this.$socket.registerCallBack('barData', this.getData)
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: 'getData2',
      socketType: 'barData',
      cityName: 'Melbourne',
      value: ''
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      const initOption = {
        title: {
          text: 'income vs topic'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['income', 'medical', 'education', 'environment', 'transport', 'entertainment']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['Melbourne', 'Sydney', 'Darwin', 'Adelaide', 'Perth', 'Brisbane','Hobart','Canberra']
        },
        series: [
          {
            name: 'income',
            type: 'bar',
            data: [1247047, 1161643, 581505, 343888,515328,58276,32561,102036]
          },
          {
            name: 'medical',
            type: 'bar',
            data: [355, 954,  4, 774, 75, 145, 13, 46]
          },
          {
            name: 'education',
            type: 'bar',
            data: [772, 1827, 11,  1496,  189, 50,  45, 109]
          },
          {
            name: 'environment',
            type: 'bar',
            data: [419, 4013, 3, 902,  124, 207,  34,  84]
          },
          {
            name: 'transport',
            type: 'bar',
            data: [499, 505, 13, 967, 85, 194,  19,  63]
          },
          {
            name: 'entertainment',
            type: 'bar',
            data: [1186, 1385,  48, 2703, 329, 523,  38, 119]
          }
        ]
      }
      this.chart.setOption(initOption)
    },
    getData2(ret) {
      this.alLData = ret
      this.updateChart()
    },
    updateChart() {
      // const name = this.alLData
      // const value = this.alLData
      const updateOption = {

      }
      this.chart.setOption(updateOption)
    }
  }
}
</script>

<style scoped>

</style>
