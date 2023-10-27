<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref, onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import MessageIcon from '@/components/icons/MessageIcon.vue'
import { useProjectsStorage } from '../../stores/projectsStorage'
import capitalizeLetters from '@/utils/capitalizeLetters.js'
import ArrowDown from '../icons/ArrowDown.vue'

const dateStorage = useDateStorage()
const projectsStorage = useProjectsStorage()

const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)
const loadingStart = ref(false)
const loadingStop = ref(false)
const projectField = ref('')
const notesField = ref('')
const overlay = ref(false)
const rules = {
  required: (value) => !!value || 'Field is required'
}

onBeforeMount(async () => {
  overlay.value = true
  projectsStorage.getProjects()
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
  if (projectField.value !== '') {
    await dateStorage.postDailyHours(projectField.value, notesField.value)

    await dateStorage.getDailyHours(start.getFullYear(), start.getMonth() + 1, start.getDate())
    loadingStart.value = false
    message.value = 'Journey started.'
    openSnackbar.value = true
    projectField.value = null
    notesField.value = null
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)

    await dateStorage.getProjectCurrentTime()
  } else {
    errorMessage.value = true
    message.value = 'Select a project'
    openSnackbar.value = true
    projectField.value = ''
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
    loadingStart.value = false
  }
}

const handleStop = async () => {
  loadingStop.value = true
  const today = new Date()

  await dateStorage.postStoppingTime()
  await dateStorage.getDailyHours(today.getFullYear(), today.getMonth() + 1, today.getDate())
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
        <v-sheet class="w-100 d-flex flex-column justify-space-around ma-0" max-width="400">
          <div v-if="!dateStorage.timeIsRunning">
            <h3>Project</h3>
            <v-select
              v-if="projectsStorage.currentCustomerProjects.length >= 1"
              label="Select Project"
              :items="projectsStorage.currentCustomerProjects"
              v-model="projectField"
              :menu-icon="ArrowDown"
              :rules="[rules.required]"
            ></v-select>
            <p v-else>
              <v-btn class="ma-0 pa-0" variant="plain" color="black" :to="{ name: 'projects' }"
                >Add a new project</v-btn
              >
            </p>
            <h3>Notes</h3>
            <v-textarea label="Write some notes" class="w-100" v-model="notesField"></v-textarea>
          </div>
          <v-container class="mb-8 pa-0 d-flex justify-center">
            <PrimaryButton
              v-if="!dateStorage.timeIsRunning"
              text="Start"
              @click="handleStart"
              class="w-50"
              :loading="loadingStart"
            >
              <StartIcon />
            </PrimaryButton>
            <v-sheet v-else class="w-100 d-flex flex-column align-center">
              <span class="pa-2 mb-6 text-blue-grey-darken-1 text-h4 font-weight-black">{{
                dateStorage.currentCronoTime
              }}</span>
              <PrimaryButton text="Stop" @click="handleStop" class="w-50" :loading="loadingStop">
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
        class="d-flex align-center justify-space-between w-100 border-b pa-2"
      >
        {{ capitalizedProjectNames }}
        <v-sheet width="150">
          <h3 class="text-primary">{{ capitalizeLetters(dailyHour.data.project) }}</h3>
          <p class="text-dark">
            {{ dailyHour.data.starting_time }} - {{ dailyHour.data.stopping_time || 'Running' }}
          </p>
        </v-sheet>
        <v-sheet class="d-flex align-center">
          <PrimaryButton icon class="mr-4" size="40" variant="plain" color="dark">
            <MessageIcon v-if="dailyHour.data.notes" />
            <v-tooltip activator="parent" location="bottom">
              {{ dailyHour.data.notes }}
            </v-tooltip>
          </PrimaryButton>

          <h4 class="text-end py-1 px-2 border-md rounded-lg text-primary">
            {{ dailyHour.data.total_time || 'Running' }}
          </h4>
        </v-sheet>
      </v-sheet>
      <div class="d-flex justify-space-between align-center mt-2">
        <h3 class="text-start text-primary w-auto font-weight-black ma-2">Total time today</h3>
        <h4 class="bg-tertiary ma-2 pa-2 text-dark rounded-lg">
          {{ dateStorage.currentTotalTimeToday }}
        </h4>
      </div>
    </v-container>
  </div>
</template>
