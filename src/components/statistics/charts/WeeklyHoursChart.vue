<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { useDefaults } from 'vuetify'
import { onMounted, computed } from 'vue';
import { useStatisticsStorage } from '@/stores/statisticsStorage.js'
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

const _props = defineProps({
  backgroundColor: String,
})

const props = useDefaults(_props, 'WeeklyHoursChart')

const data = [8, 7, 8, 9, 3, 0, 0 ] // array con los datos
const chartData = computed(() => {
  const datasets = [{
    label: 'hours',
    data: data.map(item => item), // Get an array of total hours
  }]

  return {
    labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Sn'],
    datasets,
  }
})
const chartOptions = {
  responsive: true,
  indexAxis: 'y',
  aspectRatio: 1,
  elements: {
    bar: {
      backgroundColor: props.backgroundColor,
      borderRadius: '3',
      borderSkipped: 'start'
    }
  }
}

onMounted(async() => {
  await statisticsStorage.getHoursPerWeekDay()
})
</script>
