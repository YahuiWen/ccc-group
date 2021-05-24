<template>
  <div class="chart-container">
<!--    <el-form ref="form" :model="form" label-width="120px"></el-form>-->
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Keyboard'

export default {
  name: 'KeyboardChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

