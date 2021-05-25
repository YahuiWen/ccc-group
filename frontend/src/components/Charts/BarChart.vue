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
          data: ['VIC', 'NSW', 'ACT', 'QLD', 'SA', 'WA', 'TAS', 'NTE']
        },
        series: [
          {
            name: 'income',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: 'medical',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          },
          {
            name: 'education',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          },
          {
            name: 'environment',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          },
          {
            name: 'transport',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          },
          {
            name: 'entertainment',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
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
