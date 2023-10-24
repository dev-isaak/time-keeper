<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref, onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import MessageIcon from '@/components/icons/MessageIcon.vue'

const dateStorage = useDateStorage()

const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)
const loadingStart = ref(false)
const loadingStop = ref(false)
const projectField = ref('')
const notesField = ref('')
const overlay = ref(false)

onBeforeMount(async () => {
  overlay.value = true
  const currentDate = new Date()
  await dateStorage.getDailyHours(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
  await dateStorage.getProjectCurrentTime()

  overlay.value = false
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
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="#546E7A" indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <div v-if="overlay === false">
    <v-container>
          <v-container class="w-100 pa-0 d-flex flex-column align-center">
            <v-sheet
              class="w-100 d-flex flex-column justify-space-around ma-0"
              max-width="400"
            >
              <div v-if="!dateStorage.timeIsRunning">
                <h3>Project</h3>
                <v-text-field
                  label="Enter project"
                  class="w-100"
                  v-model="projectField"
                ></v-text-field>
                <h3>Notes</h3>
                <v-textarea
                  label="Write some notes"
                  class="w-100"
                  v-model="notesField"
                ></v-textarea>
              </div>
              <v-container class="mb-8 pa-0 d-flex justify-center">
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
                  <span class="pa-2 mb-6 text-blue-grey-darken-1 text-h4 font-weight-black">{{dateStorage.currentCronoTime}}</span>
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
         <v-sheet
          v-if="dateStorage.currentDailyHoursList.length >= 1"
          v-for="dailyHour in dateStorage.currentDailyHoursList"
          :key="dailyHour.id"
          class="d-flex align-center justify-space-between w-100 border-b pa-2">
          <div>
            <h2>{{ dailyHour.data.project }}</h2>
            <p>{{ dailyHour.data.starting_time }} - {{ dailyHour.data.stopping_time }}</p>
          </div>
          <div class="d-flex align-center">
            <PrimaryButton class="mr-4" variant="plain">
              <MessageIcon v-if="dailyHour.data.notes" />
                <v-tooltip activator="parent" location="bottom">
                  {{ dailyHour.data.notes }}
                </v-tooltip>
            </PrimaryButton>
              
            <h3 class="text-end pa-2  border pa-2 rounded-lg" >{{ dailyHour.data.total_time || 'Running' }}</h3>
          </div>
         </v-sheet>
         <div class="d-flex justify-space-between align-center">
          <p class="text-start w-auto font-weight-black ma-2">Total</p>
          <h3 class="text-grey-darken-4 ma-2 pa-2 bg-blue-grey-lighten-4 rounded-lg">{{ dateStorage.currentTotalTimeToday }}</h3>
         </div>
    </v-container>
  </div>
</template>
