<script setup>
import { ref, onMounted } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import {DateConverter} from '@/utils/DateConverter.js'
const dateStorage = useDateStorage()
import * as echarts from 'echarts'

const chartRef = ref(null)
const monthlyHours = ref(0)
const monthHoursFormated = ref('')

onMounted(async() => {
  const myChart = echarts.init(chartRef.value)
  const dateConvert = new DateConverter()
  await dateStorage.getCurrentMonthHours()
  monthHoursFormated.value = dateStorage.currentMonthlyHours
  // Get hour in ms
  const hourInMs = dateConvert.getMilliseconds(dateStorage.currentMonthlyHoursMs)
  // Then do the percentatge to 160h
  monthlyHours.value = hourInMs / 576000000 * 100 
  
  var option

  option = {
  title: {
    text: 'Total time this month',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: monthlyHours.value, 
          name: `${monthHoursFormated.value} h` 
        },
        {
          value: 160, // total month hours
          name: 'Total'
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
  <div ref="chartRef" class="chart"></div>
</template>

<style scope>
.chart{
  width: 300px;
  height: 400px;
}

@media(min-width:600px){
  .chart{
  width: 600px;
  height: 400px;
}
}
</style>