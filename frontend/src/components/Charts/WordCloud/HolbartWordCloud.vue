<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import resize from "@/components/Charts/mixins/resize";

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
      alLData: null,
      allWord: null,
      allValue: null
    }
  },
  created() {
    this.$socket.registerCallBack('wordData', this.getData)
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: 'getWordData',
      socketType: 'wordData',
      cityName: 'Hobart',
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

      this.chart.setOption({
        backgroundColor: '#394056',
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '70%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [12, 60],

          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,

          drawOutOfBound: false,

          // If perform layout animation.
          // NOTE disable it will lead to UI blocking when there is lots of words.
          layoutAnimation: true,

          // Global text style
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function() {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },

          // Data is an array. Each array item must have name and value property.
          data: [{
            name: 'Farrah Abraham',
            value: 177,
            // Style of single text
            textStyle: {
            }
          }]
        }]
      })
    },
    getData(ret) {
      // this.alLData = ret
      // this.updateChart()
      this.alLData = JSON.parse(ret)
      // console.log(this.alLData)
      console.log(Object.keys(this.alLData))
      console.log(Object.values(this.alLData))
      this.updateChart()
    },
    updateChart() {
      // const wordName = showData.map((item) => {
      //   return this.allWord
      // })
      // const wordValue = showData.map((item) => {
      //   return this.allValue
      // })
      const dataS = []
      for (var key in this.alLData){
        dataS.push({
              name: key,
              value: this.alLData[key]
            }
        )
      }
      const updateOption = {
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '70%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [12, 60],

          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,

          drawOutOfBound: false,

          // If perform layout animation.
          // NOTE disable it will lead to UI blocking when there is lots of words.
          layoutAnimation: true,

          // Global text style
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function() {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          // Data is an array. Each array item must have name and value property.
          data: dataS

        }]
      }
      this.chart.setOption(updateOption)
    }
  }
}
</script>
