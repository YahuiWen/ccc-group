<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from "@/components/Charts/mixins/resize";

export default {
  name: 'RoseChart',
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
    this.$socket.registerCallBack('roseData', this.getData)
  },
  mounted() {
    this.initChart()
    this.$socket.send({
      action: 'getSemData',
      socketType: 'roseData',
      cityName: 'Perth',
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
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            // ['topic', 'medical', 'education', 'entertainment', 'transport', 'environment'],
            // ['positive', 86.5, 92.1, 85.7, 83.1, 73.4],
            // ['negative', 41.1, 30.4, 65.1, 53.3, 83.8],
            // ['neutral', 24.1, 67.2, 79.5, 86.4, 65.2]
          ]
        },
        // series: [{
        //   type: 'pie',
        //   radius: [20, 70],
        //   center: ['25%', '30%'],
        //   roseType: 'radius'
        //   // No encode specified, by default, it is '2012'.
        // }, {
        //   type: 'pie',
        //   radius: [20, 70],
        //   center: ['75%', '30%'],
        //   roseType: 'radius',
        //   encode: {
        //     itemName: 'topic',
        //     value: 'education'
        //   }
        // }, {
        //   type: 'pie',
        //   radius: [20, 70],
        //   center: ['25%', '75%'],
        //   roseType: 'radius',
        //   encode: {
        //     itemName: 'topic',
        //     value: 'entertainment'
        //   }
        // }, {
        //   type: 'pie',
        //   radius: [20, 70],
        //   center: ['75%', '75%'],
        //   roseType: 'radius',
        //   encode: {
        //     itemName: 'topic',
        //     value: 'transport'
        //   }
        // }, {
        //   type: 'pie',
        //   radius: [20, 70],
        //   center: ['50%', '50%'],
        //   roseType: 'radius',
        //   encode: {
        //     itemName: 'topic',
        //     value: 'environment' }
        // }]
      }
      this.chart.setOption(initOption)
    },
    getData(ret) {
      // this.alLData = ret
      // this.updateChart()
      this.alLData = JSON.parse(ret)
      console.log(this.alLData)
      this.updateChart()
    },
    updateChart() {
      // const name = this.alLData
      // const value = this.alLData
      const updateOption = {
        title: [
          {
            subtext: 'medical',
            left: '25%',
            top: '50%',
            textAlign: 'center'
          },
          {
            subtext: 'education',
            left: '75%',
            top: '50%',
            textAlign: 'center'
          },
          {
            subtext: 'entertainment',
            left: '50%',
            top: '75%',
            textAlign: 'center'
          },
          {
            subtext: 'transport',
            left: '25%',
            top: '90%',
            textAlign: 'center'
          },
          {
            subtext: 'environment',
            left: '75%',
            top: '90%',
            textAlign: 'center'
          }
        ],
        dataset: {
          source: [
            ['topic', 'medical', 'education', 'entertainment', 'transport', 'environment'],
            ['positive', this.alLData.medical_pos, this.alLData.education_pos, this.alLData.entertainment_pos, this.alLData.transport_pos, this.alLData.environment_pos],
            ['neutral', this.alLData.medical_neu, this.alLData.education_neu, this.alLData.entertainment_neu, this.alLData.transport_neu, this.alLData.environment_neu],
            ['negative', this.alLData.medical_neg, this.alLData.education_neg, this.alLData.entertainment_neg, this.alLData.transport_neg, this.alLData.environment_neg]
          ]
        },
        series: [{
          type: 'pie',
          radius: [20, 70],
          center: ['25%', '30%'],
          roseType: 'radius',
          encode: {
            itemName: 'topic',
            value: 'medical'
          }
          // No encode specified, by default, it is '2012'.
        }, {
          type: 'pie',
          radius: [20, 70],
          center: ['75%', '30%'],
          roseType: 'radius',
          encode: {
            itemName: 'topic',
            value: 'education'
          }
        }, {
          type: 'pie',
          radius: [20, 70],
          center: ['25%', '75%'],
          roseType: 'radius',
          encode: {
            itemName: 'topic',
            value: 'entertainment'
          }
        }, {
          type: 'pie',
          radius: [20, 70],
          center: ['75%', '75%'],
          roseType: 'radius',
          encode: {
            itemName: 'topic',
            value: 'transport'
          }
        }, {
          type: 'pie',
          radius: [20, 70],
          center: ['50%', '50%'],
          roseType: 'radius',
          encode: {
            itemName: 'topic',
            value: 'environment' }
        }]
      }
      this.chart.setOption(updateOption)
    }
  }
}
</script>

