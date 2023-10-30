<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  {{ statisticsStorage.currentProjectTotalTimeList }}
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { onBeforeMount, computed } from 'vue'
import { useDefaults } from 'vuetify'
import { useStatisticsStorage } from '@/stores/statisticsStorage.js'
import { useDateStorage } from '@/stores/dateStorage.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const statisticsStorage = useStatisticsStorage()
const dateStorage = useDateStorage()

const _props = defineProps({
  backgroundColor: String,
})

let projectsHoursList = [20, 40, 10]

const props = useDefaults(_props, 'ProjectHoursChart')


const chartData = computed( () => {
  return {
    // --------------------------------- ?????????????????????
    // https://www.chartjs.org/docs/latest/general/data-structures.html
    datasets: [
      { 
        data: [{
          'statisticsStorage.currentProjectTotalTimeList.project_name': statisticsStorage.currentProjectTotalTimeList.total_time,
        }],
        backgroundColor: props.backgroundColor
      },
    ]
  }
}
)
const chartOptions = {
  responsive: true,
  // indexAxis: 'y',
}

onBeforeMount(async() => {
  await statisticsStorage.getAllProjectsTotalHours(dateStorage.currentAllProjects)
})
</script>
