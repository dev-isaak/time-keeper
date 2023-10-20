<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import PauseIcon from '@/components/icons/PauseIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref, onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'

const dateStorage = useDateStorage()

onBeforeMount(async() => {
  const currentDate = new Date()
  await dateStorage.getDailyHours(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate())
})

const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)
const loadingStart = ref(false)
const loadingStop = ref(false)
const startingHour = ref('00')
const startingMinutes = ref('00')
const stoppingHour = ref('00')
const stoppingMinutes = ref('00')
const pauseTime = ref('0')
const totalHour = ref('00')
const totalMinutes = ref('00')

const handleStart = async() => {
  loadingStart.value = true
  let start = new Date()
  startingHour.value = `${start.getHours()}`
  startingMinutes.value = `${start.getMinutes()}`
  const startDate = `${startingHour.value}:${startingMinutes.value}`
  await dateStorage.postDailyHours(start, start.getFullYear(), start.getMonth()+1, start.getDate(), startDate )
  await dateStorage.getDailyHours(start.getFullYear(), start.getMonth()+1, start.getDate())
  loadingStart.value = false
  message.value = 'Journey started.'
  openSnackbar.value = true
  setTimeout(() => {
    openSnackbar.value = false
  }, 3000)
}

const handlePause = () => {
  message.value = 'Journey paused.'
  openSnackbar.value = true
  setTimeout(() => {
    openSnackbar.value = false
  }, 3000)
}

const handleStop = async() => {
  loadingStop.value = true
  let stop = new Date()
  const currentHour = stop.getHours()
  const currentMinutes = stop.getMinutes()
  const stopDate = `${currentHour}:${currentMinutes}`
  
  const result = dateStorage.currentStartingTime.split(':')
  const hour = result[0]
  const minutes = result[1]
  

  const totalHour = currentHour -hour
  const totalMinutes = currentMinutes - minutes
  const totalDate = `${totalHour}:${totalMinutes}`
  console.log(totalHour, totalMinutes)
  
  await dateStorage.postStoppingTime(stop.getFullYear(), stop.getMonth()+1, stop.getDate(), stopDate, totalDate )
  await dateStorage.getDailyHours(stop.getFullYear(), stop.getMonth()+1, stop.getDate())
  loadingStop.value = false
  message.value = 'Journey stoped.'
  openSnackbar.value = true
  setTimeout(() => {
    openSnackbar.value = false
  }, 3000)
  
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
  <v-container class="w-100 d-flex justify-center">
    <v-sheet
      class="w-100 d-flex flex-column flex-sm-row align-center justify-space-around"
      max-width="400"
    >
      <PrimaryButton
        text="Start"
        color="#90A4AE"
        @click="handleStart"
        class="ma-4 w-50"
        :loading="loadingStart"
      >
        <StartIcon />
      </PrimaryButton>
      <PrimaryButton
        text="Pause"
        color="#90A4AE"
        @click="handlePause"
        class="ma-4 w-50"
      >
        <PauseIcon />
      </PrimaryButton>
      <PrimaryButton
        text="Stop"
        color="#90A4AE"
        @click="handleStop"
        class="ma-4 w-50"
        :loading="loadingStop"
      >
        <StopIcon />
      </PrimaryButton>
    </v-sheet>
  </v-container>
  <v-container class="w-100 d-flex justify-center">
  <v-sheet class="pa-4" width="300" elevation="2">
    <v-sheet class="d-flex align-center justify-space-between">
      <h3 class="mr-4">Starting time</h3>
      <p>{{ dateStorage.currentStartingTime }}h</p>
    </v-sheet>
    <v-sheet class="d-flex align-center justify-space-between">
      <h3 class="mr-4">Stopping time</h3>
      <p>{{ dateStorage.currentStoppingTime }}h</p>
    </v-sheet>
    <v-sheet class="d-flex align-center justify-space-between">
      <h3 class="mr-4">Pause time</h3>
      <p>{{ pauseTime }}h</p>
    </v-sheet>
    <v-sheet class="d-flex align-center justify-space-between">
      <h3 class="mr-4">Daily total time</h3>
      <p>{{ dateStorage.currentTotalTime }}h</p>
    </v-sheet>
  </v-sheet>
</v-container>
</template>
