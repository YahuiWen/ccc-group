<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import aus from 'echarts/map/aust.json'
import * as echarts from 'echarts'

export default {
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

  mounted() {
    this.initChart()
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
      echarts.registerMap('AUS', aus)
      const initOption = {
        title: {
          text: 'AUS INFORMATION',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function (params) {
            return params.seriesName + '<br/>' + params.name + ': ' + params.value;
          }
        },
        visualMap: {
          left: 'right',
          min: 6000,
          max: 70000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['High', 'Low'],           // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'AUS INCOME DISTRIBUTION',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
              label: {
                show: true
              }
            },
            data:[
              {name: 'New South Wales', value: 1247047},
              {name: 'Victoria', value: 1161643},
              {name: 'Queensland', value: 581505},
              {name: 'South Australia', value: 343888},
              {name: 'Western Australia', value: 515328},
              {name: 'Tasmania', value: 58276},
              {name: 'Northern Territory', value: 32561},
              {name: 'ACT', value: 102036},
              {name: 'l', value: 1023}
            ]
          }
        ]
      }
      this.chart.setOption(initOption)
    },
    getData() {
      this.updateChart()
    },
    updateChart() {
      const updateOption = {
        title: '',
      }
      this.chart.setOption(updateOption)
    }
  }
}

</script>
