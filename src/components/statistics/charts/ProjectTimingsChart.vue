<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStatisticsStorage } from '@/stores/statisticsStorage.js'
import * as echarts from 'echarts'

const statisticsStorage = useStatisticsStorage()

const chartRef = ref(null)
const test = ref()
const data = ref()

const names = computed(() => {
  return statisticsStorage.currentProjectListName
})

// ASYNC DATA
// https://apache.github.io/echarts-handbook/en/how-to/data/dynamic-data/#dynamic-update

onMounted(async() => {
  const myChart = echarts.init(chartRef.value)
  statisticsStorage.getAllProjectsTotalHours()
  console.log(names.value)

  var option

  option = {
  xAxis: {
    dataset: {
      source: ['test', 'test2']
    }
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
  <div ref="chartRef" style="width: 300px; height: 400px"></div>
</template>
