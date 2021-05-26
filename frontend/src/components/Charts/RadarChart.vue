<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
import resize from './mixins/resize'

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
      chart: null
    }
  },

  mounted() {
    console.log('radar chart')
    this.initChart()
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

      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          text: 'AQI - 雷达图',
          left: 'center',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          bottom: 5,
          data: ['Melbourne', 'Sydney', 'Darwin', 'Adelaide', 'Perth', 'Brisbane','Holbart','Canberra'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 20,
        //     dimension: 6,
        //     inRange: {
        //         colorLightness: [0.5, 0.8]
        //     }
        // },
        radar: {
          indicator: [
            {name: 'AQI', max: 300},
            {name: 'PM2.5', max: 250},
            {name: 'PM10', max: 300},
            {name: 'CO', max: 5},
            {name: 'NO2', max: 200},
            {name: 'SO2', max: 100}
          ],
          shape: 'circle',
          splitNumber: 5,
          name: {
            textStyle: {
              color: 'rgb(238, 197, 102)'
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [
          {
            name: '北京',
            type: 'radar',
            // lineStyle: normal: {width: 1, opacity: 0.5},
            data: [[55,9,56,0.46,18,6,1]],
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          {
            name: '上海',
            type: 'radar',
            // lineStyle: lineStyle,
            data: [[91,71,121,1.374,43,18,19]],
            symbol: 'none',
            itemStyle: {
              color: '#B3E4A1'
            },
            areaStyle: {
              opacity: 0.05
            }
          },
          {
            name: '广州',
            type: 'radar',
            // lineStyle: lineStyle,
            data: [[116,87,131,1.47,84,40,14]],
            symbol: 'none',
            itemStyle: {
              color: 'rgb(238, 197, 102)'
            },
            areaStyle: {
              opacity: 0.05
            }
          }
        ]
      })
    }
  }
}
</script>
