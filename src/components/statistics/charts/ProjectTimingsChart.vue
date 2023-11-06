<script setup>
import { ref, onMounted } from 'vue'
import { useStatisticsStorage } from '@/stores/statisticsStorage.js'
import * as echarts from 'echarts'


const statisticsStorage = useStatisticsStorage()
const chartRef = ref(null)


onMounted(async() => {
  const myChart = echarts.init(chartRef.value)
  const data = await statisticsStorage.currentProjectTotalTimeList
  console.log(data)
  const test = await data.map(item => item.project_name )
  console.log(test)
  var option

  option = {
  xAxis: {
    data: data
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
};

  option && myChart.setOption(option)
})
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px"></div>
</template>
