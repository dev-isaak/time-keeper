<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { onBeforeMount, computed } from 'vue';
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

const statisticsStorage = useStatisticsStorage(),
      dateStorage = useDateStorage(),
      _props = defineProps({
                backgroundColor: String,
              }),
      props = useDefaults(_props, 'ProjectHoursChart')

const chartData = computed(() => {
  const data = statisticsStorage.projectTotalTimeList

  const datasets = [{
    label: 'hours',
    backgroundColor: props.backgroundColor, 
    data: data.map(item => item.total_hours), // Get an array of total hours
  }]

  return {
    labels: data.map(item => item.project_name), // Get an array of names
    datasets,
  }
})

const chartOptions = {
  responsive: true,
  // maintainAspectRatio: false,
  aspectRatio: 1,
  // indexAxis: 'y',
}

onBeforeMount(async() => {
  await statisticsStorage.getAllProjectsTotalHours()
})
</script>
