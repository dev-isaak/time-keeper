<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { useDefaults } from 'vuetify'
import { onBeforeMount } from 'vue'
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

const dateStorage = useDateStorage()

const _props = defineProps({
  backgroundColor: String,
})

const props = useDefaults(_props, 'WeeklyHoursChart')

const chartData = {
  label: 'Hours',
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    { 
      data: [
        dateStorage.currentMondayTotalHours, 
        dateStorage.currentTuesdayTotalHours,
        dateStorage.currentWednesdayTotalHours,
        dateStorage.currentThursdayTotalHours,
        dateStorage.currentFridayTotalHours,
        dateStorage.currentSaturdayTotalHours,
        dateStorage.currentSundayTotalHours,
      ],
      backgroundColor: props.backgroundColor,
    },
  ],
}
const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display:true,
      text: 'Weekly Hours'
    }
  },
}

onBeforeMount(async() => {
  await dateStorage.getWeeklyHours()
})
</script>
