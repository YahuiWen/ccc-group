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
      action: 'getAllData',
      socketType: 'pie',
      cityName: 'all',
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

        legend: {},
            dataset: {
              source: [
                ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2-19'],
                ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1, 12, 45],
                ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 56, 78],
                ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 89, 34],
                ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1, 45, 76]
              ]
            },
            series: [{
              type: 'pie',
              radius: '20%',
              center: ['15%', '30%']
              // No encode specified, by default, it is '2012'.
            }, {
              type: 'pie',
              radius: '20%',
              center: ['75%', '30%'],
              encode: {
                itemName: 'product',
                value: '2013'
              }
            }, {
              type: 'pie',
              radius: '20%',
              center: ['25%', '75%'],
              encode: {
                itemName: 'product',
                value: '2014'
              }
            }, {
              type: 'pie',
              radius: '20%',
              center: ['75%', '75%'],
              encode: {
                itemName: 'product',
                value: '2015'
              }
            }]}
      this.chart.setOption(initOption)
    },
    getData(ret) {
      this.alLData = JSON.parse(ret)
      this.updateChart()
    },
    updateChart() {
      // const name = ''
      // const value = this.alLData
      const updateOption = {
        title: [
          {
            subtext: 'Melbourne',
            left: '15%',
            top: '39%',
            textAlign: 'center'
          },
          {
            subtext: 'Sydney',
            left: '45%',
            top: '39%',
            textAlign: 'center'
          },
          {
            subtext: 'Darwin',
            left: '75%',
            top: '39%',
            textAlign: 'center'
          },
          {
            subtext: 'Adelaide',
            left: '30%',
            top: '69%',
            textAlign: 'center'
          },
          {
            subtext: 'Perth',
            left: '60%',
            top: '69%',
            textAlign: 'center'
          },
          {
            subtext: 'Brisbane',
            left: '15%',
            top: '99%',
            textAlign: 'center'
          },
          {
            subtext: 'Hobart',
            left: '45%',
            top: '99%',
            textAlign: 'center'
          },
          {
            subtext: 'Canberra',
            left: '75%',
            top: '99%',
            textAlign: 'center'
          }
        ],
        legend: {},
        toolbar: {},
        dataset: {
          source: [
            ['topic', 'Melbourne', 'Sydney', 'Darwin', 'Adelaide', 'Perth', 'Brisbane','Hobart','Canberra' ],
            ['Medical',     355, 954,  4, 774, 75, 145, 13, 46],
            ['Education',   772, 1827, 11,  1496,  189, 50,  45, 109],
            ['Environment', 419, 4013, 3, 902,  124, 207,  34,  84],
            ['Transport',    499, 505, 13, 967, 85, 194,  19,  63],
            ['Entertainment',1186, 1385,  48, 2703, 329, 523,  38, 119]
          ]
        },
        series: [{
          type: 'pie',
          radius: '20%',
          center: ['15%', '30%'],
          label: '',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Melbourne'
          }
        }, {
          type: 'pie',
          radius: '20%',
          center: ['45%', '30%'],
          label: '',
          subtext: 'Sydney',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Sydney'
          }
        }, {
          type: 'pie',
          radius: '20%',
          subtext: 'Darwin',
          label: '',
          textAlign: 'center',
          center: ['75%', '30%'],
          encode: {
            itemName: 'topic',
            value: 'Darwin'
          }
        }, {
          type: 'pie',
          radius: '20%',
          label: '',
          center: ['30%', '60%'],
          subtext: 'Adelaide',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Adelaide'
          }
        }, {
          type: 'pie',
          radius: '20%',
          label: '',
          center: ['60%', '60%'],
          subtext: 'Perth',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Perth'
          }
        }, {
          type: 'pie',
          radius: '20%',
          center: ['15%', '80%'],
          label: '',
          subtext: 'Brisbane',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Brisbane'
          }
        }, {
          type: 'pie',
          radius: '20%',
          center: ['45%', '80%'],
          label: '',
          subtext: 'Hobart',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Holbart'
          }
        }, {
          type: 'pie',
          radius: '20%',
          center: ['75%', '80%'],
          label: '',
          subtext: 'Canberra',
          textAlign: 'center',
          encode: {
            itemName: 'topic',
            value: 'Canberra'
          }
        }]


      }
      this.chart.setOption(updateOption)
    }
  }
}
</script>
