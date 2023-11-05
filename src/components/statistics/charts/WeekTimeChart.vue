<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

onMounted(() => {
  const myChart = echarts.init(chartRef.value)

  var option

  option = {
  title: {
    text: 'A Case of Doughnut Chart',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: 'A'
        },
        {
          value: 234,
          name: 'B'
        },
        {
          value: 1548,
          name: 'C'
        }
      ],
      radius: ['40%', '70%']
    }
  ]
};

  option && myChart.setOption(option)
})
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px"></div>
</template>
