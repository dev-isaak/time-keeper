<script setup>
import { ref, onMounted } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import {DateConverter} from '@/utils/DateConverter.js'
const dateStorage = useDateStorage()
import * as echarts from 'echarts'

const chartRef = ref(null)
const weeklyHours = ref(0)
const weekHoursFormated = ref('')

onMounted(async() => {
  const myChart = echarts.init(chartRef.value)
  const dateConvert = new DateConverter()
  await dateStorage.getWeeklyHours()
  weekHoursFormated.value = dateStorage.currentWeeklyHours
  // Get hour in ms
  const hourInMs = dateConvert.getMilliseconds(dateStorage.currentWeeklyHours)
  // Then do the percentatge to 40h
  weeklyHours.value = hourInMs / 144000000 * 100 
  
  var option

  option = {
  title: {
    text: 'Total time this week',
    left: 'center',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: weeklyHours.value, 
          name: `${weekHoursFormated.value} h` 
        },
        {
          value: 40, // total weekly hours
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