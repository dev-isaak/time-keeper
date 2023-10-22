<script setup>
import { onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import { ref } from 'vue'
import ProgressLinear from '@/components/ProgressLinear.vue'

const dateStorage = useDateStorage()

const overlay = ref(false)
const weeklyHours = ref(78)
const monthlyHours = ref(0)
const selectedMonth = ref('')
const yearList = [
  {
    title: 'January',
    props: {
      id: 1,
      currentHours: dateStorage.currentJanuaryHours,
      msHours: dateStorage.januaryHours
    }
  },
  {
    title: 'February',
    currentHours: dateStorage.currentFebruaryHours,
    msHours: dateStorage.februaryHours
  },
  {
    title: 'March',
    currentHours: dateStorage.currentMarchHours,
    msHours: dateStorage.marchHours
  },
  {
    title: 'April',
    currentHours: dateStorage.currentAprilHours,
    msHours: dateStorage.aprilHours
  },
  {
    title: 'May',
    currentHours: dateStorage.currentMayHours,
    msHours: dateStorage.mayHours
  },
  {
    title: 'June',
    currentHours: dateStorage.currentJuneHours,
    msHours: dateStorage.juneHours
  },
  {
    title: 'July',
    currentHours: dateStorage.currentJulyHours,
    msHours: dateStorage.julyHours
  },
  {
    title: 'August',
    currentHours: dateStorage.currentAugustHours,
    msHours: dateStorage.augustHours
  },
  {
    title: 'September',
    currentHours: dateStorage.currentSeptemberHours,
    msHours: dateStorage.septemberHours
  },
  {
    title: 'October',
    currentHours: dateStorage.currentOctoberHours,
    msHours: dateStorage.octoberHours
  },
  {
    title: 'November',
    currentHours: dateStorage.currentNovemberHours,
    msHours: dateStorage.novemberHours
  },
  {
    title: 'December',
    currentHours: dateStorage.currentDecemberHours,
    msHours: dateStorage.decemberHours
  },
]

onBeforeMount(async () => {
  overlay.value = true
  const date = new Date()
  await dateStorage.getCurrentMonthlyHours(date.getFullYear(), date.getMonth() + 1)
  await dateStorage.getYearMonthlyHours(2023)

  // se calcula el porcentage sobre 160h = 576000000
  monthlyHours.value = dateStorage.currentMonthlyHoursMs * 100 / 576000000

  overlay.value = false
})
</script>

<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="#546E7A" indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <h2>Monthly Hours</h2>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet
          elevation="1"
          class="d-flex flex-column align-center w-auto pa-4"
          max-width="400"
        >
          <v-progress-circular :model-value="weeklyHours" size="100" width="15" color="#78909C"
            >43</v-progress-circular
          >
          <h4 class="text-center mt-4">Total time this week</h4>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet elevation="1" class="d-flex flex-column align-center w-auto pa-4" max-width="400">
          <v-progress-circular :model-value="monthlyHours" size="100" width="15" color="#78909C"
            >{{ dateStorage.currentMonthlyHours }}</v-progress-circular
          >
          <h4 class="text-center mt-4">Total time this month</h4>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-select label="Select Month" v-model="selectedMonth" :items="yearList"></v-select>
    </v-container>
  <v-container>
    <v-sheet>
      <h4>{{selectedMonth}}</h4>
      <ProgressLinear class="mx-2 my-2" :time="selectedMonth.currentHours" :msTime="selectedMonth.msHours" />
    </v-sheet>
  </v-container>
</template>
