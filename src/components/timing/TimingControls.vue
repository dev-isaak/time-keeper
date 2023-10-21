<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import PauseIcon from '@/components/icons/PauseIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref, onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import timeConverter from '@/utils/timeConverter.js'

const dateStorage = useDateStorage()

const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)
const loadingStart = ref(false)
const loadingStop = ref(false)
const projectField = ref('')
const notesField = ref('')

onBeforeMount(async () => {
  const currentDate = new Date()
  await dateStorage.getDailyHours(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
})

const handleStart = async () => {
  loadingStart.value = true
  let start = new Date()

  await dateStorage.postDailyHours(
    start.getFullYear(),
    start.getMonth() + 1,
    start.getDate(),
    start,
    projectField.value,
    notesField.value
  )
  await dateStorage.getDailyHours(start.getFullYear(), start.getMonth() + 1, start.getDate())
  loadingStart.value = false
  message.value = 'Journey started.'
  openSnackbar.value = true
  projectField.value = null
  notesField.value = null
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

const handleStop = async () => {
  loadingStop.value = true
  let stopTime = new Date()

  //Get total time in ms
  const totalTime = stopTime - dateStorage.currentLastTimeStart

  await dateStorage.postStoppingTime(
    stopTime.getFullYear(),
    stopTime.getMonth() + 1,
    stopTime.getDate(),
    stopTime,
    totalTime
  )
  await dateStorage.getDailyHours(
    stopTime.getFullYear(),
    stopTime.getMonth() + 1,
    stopTime.getDate()
  )
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
  <v-container class="w-100 d-flex flex-column align-center">
    <v-container class="w-100 d-flex flex-column align-center">
    <v-sheet class="d-flex align-center pa-4" color="#f5f5f5" max-width="400">
      <h3 class="mr-4">Total time today:</h3>
      <p>{{ dateStorage.currentTotalTimeToday }}</p>
    </v-sheet>
  </v-container>
    <v-sheet
      class="w-100 d-flex flex-column justify-space-around pa-4 ma-0"
      elevation="1"
      max-width="400"
    >
    <div v-if="!dateStorage.timeIsRunning">
      <h3>Project</h3>
      <v-text-field label="Enter project" class="w-100" v-model="projectField"></v-text-field>
      <h3>Notes</h3>
      <v-textarea label="Write some notes" class="w-100" v-model="notesField"></v-textarea>
    </div>
      <v-container class="ma-0 d-flex justify-center">
        <PrimaryButton
          v-if="!dateStorage.timeIsRunning"
          text="Start"
          color="#90A4AE"
          @click="handleStart"
          class="w-50"
          :loading="loadingStart"
        >
          <StartIcon />
        </PrimaryButton>
        <v-sheet v-else class="w-100 d-flex flex-column align-center">
          <p class="font-weight-bold">Time is running!</p>
          <v-progress-linear
          class="my-4"
          indeterminate          
          ></v-progress-linear>
          <PrimaryButton
            text="Stop"
            color="#90A4AE"
            @click="handleStop"
            class="w-50"
            :loading="loadingStop"
          >
            <StopIcon />
          </PrimaryButton>
        </v-sheet>
      </v-container>
    </v-sheet>
  </v-container>
  <v-container class="w-100 d-flex flex-wrap justify-center">
    <v-sheet
      v-if="dateStorage.currentDailyHoursList.length >= 1"
      v-for="dailyHour in dateStorage.currentDailyHoursList"
      :key="dailyHour.id"
      class="pa-4 ma-4"
      width="300"
      elevation="2"
    >
      <h2>{{ startingTime }}</h2>
      <v-divider class="mb-4"></v-divider>
      <v-sheet class="d-flex align-center justify-space-between">
        <h3 class="mr-4">Starting time</h3>
        <p>{{ dailyHour.data.starting_time }}</p>
      </v-sheet>
      <v-sheet class="d-flex align-center justify-space-between">
        <h3 class="mr-4">Stopping time</h3>
        <p>{{ dailyHour.data.stopping_time }}</p>
      </v-sheet>
      <v-sheet class="d-flex align-center justify-space-between">
        <h3 class="mr-4">Total time</h3>
        <p>{{ dailyHour.data.total_time }}</p>
      </v-sheet>
      <v-sheet v-if="dailyHour.data.notes != undefined" class="pa-2 mt-2" color="#f5f5f5">
        <p class="text-body-2">{{ dailyHour.data.notes }}</p>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>
