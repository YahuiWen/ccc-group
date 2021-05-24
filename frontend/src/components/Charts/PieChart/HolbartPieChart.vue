<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
import resize from '../mixins/resize'

export default {
  mixins: [resize],
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
    this.$socket.registerCallBack('pie', this.getData)
  },
  destroyed () {
    this.$socket.unregisterCallBack('pie')
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: 'getData',
      socketType: 'pie',
      cityName: 'Holbart',
      value: ''
    })
    // this.updateChart()
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
        backgroundColor: '#394056',
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [

        ]
      }
      this.chart.setOption(initOption)
    },
    getData(ret) {
      this.alLData = JSON.parse(ret)
      this.updateChart()
    },
    updateChart() {
      const name = this.alLData.city
      // const value = this.alLData
      const title = {
        text: name,
        left: 'center',
        color: 'white'
      }
      const seriesArr = {
        name: 'topic',
        type: 'pie',
        radius: '50%',
        data: [
          { value: this.alLData.medical, name: 'medical' },
          { value: this.alLData.education, name: 'education' },
          { value: this.alLData.environment, name: 'environment' },
          { value: this.alLData.transport, name: 'transport' },
          { value: this.alLData.entertainment, name: 'entertainment' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
      const updateOption = {
        title: title,
        series: seriesArr

      }
      this.chart.setOption(updateOption)
    }
  }
}
</script>
