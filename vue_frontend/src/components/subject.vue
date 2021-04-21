<!--
 subject bar chart
-->
<template>
  <div class = 'com-container'>
    <div class = "com-chart" ref="subject_ref"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  methods: {
    // init echart instance
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.subject_ref, 'chalk')
    },
    // get server data
    async getData () {
      // http:/127.0.0.1:8888/api/test. ajax request
      const { data: ret } = await this.$http.get('test')
      this.allData = ret
      this.allData.sort((a, b) => {
        return a.min - b.min
      })
      this.updateChart()
    },
    updateChart () {
      const subjectName = this.allData.map((item) => {
        return item.Name
      })
      const subjectValue = this.allData.map((item) => {
        return item.min
      })
      const option = {
        title: {
          text: '▋ Bar Chart',
          textStyle: {
            fontSize: 40
          },
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: subjectName

        },
        series: [
          {
            type: 'bar',
            data: subjectValue
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>

<style lang="less">

</style>
