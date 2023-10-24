<script setup>
import { onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import ProgressLinear from '@/components/ProgressLinear.vue'

const dateStorage = useDateStorage()

const yearList = [
  {
    title: 'January',
    currentHours: dateStorage.currentJanuaryHours,
    msHours: dateStorage.januaryHours
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
  }
]

onBeforeMount(async () => {
	const date = new Date()
  await dateStorage.getYearMonthlyHours(date.getFullYear())
})
</script>

<template>
<v-container>
    <v-select label="Select Month" v-model="selectedMonth" :items="yearList"></v-select>
    </v-container>
  <v-container>
    <v-sheet>
      <h4>{{selectedMonth.title}}</h4>
      <ProgressLinear class="mx-2 my-2" :time="selectedMonth.currentHours" :msTime="selectedMonth.msHours" />
    </v-sheet>
  </v-container>
</template>
