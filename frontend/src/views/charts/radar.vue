<template>
  <div class="app-container">
    <chart happy height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/RadarChart'

export default {
  name: 'RadarChart',
  components: { Chart }
}
</script>

<style scoped>
.app-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
