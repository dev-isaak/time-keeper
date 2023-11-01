<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref, onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import MessageIcon from '@/components/icons/MessageIcon.vue'
import { useProjectsStorage } from '@/stores/projectsStorage'
import capitalizeLetters from '@/utils/capitalizeLetters.js'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import RayEndArrow from '@/components/icons/RayEndArrow.vue'
import RayStartArrow from '@/components/icons/RayStartArrow.vue'

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
  await dateStorage.getDailyHours()
  await dateStorage.getProjectCurrentTime()

  overlay.value = false
})

const handleStart = async () => {
  loadingStart.value = true
  if (projectField.value !== '') {
    await dateStorage.postDailyHours(projectField.value, notesField.value)

    await dateStorage.getDailyHours()

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

  await dateStorage.postStoppingTime()
  await dateStorage.getDailyHours()

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
        <v-sheet class="w-100 ma-0" max-width="400">
          <div class="d-flex flex-column" v-if="!dateStorage.timeIsRunning">
            <h3 class="mb-5">Project</h3>
            <div
              :class="
                !projectsStorage.currentCustomerProjects.length
                  ? 'd-flex flex-column'
                  : 'd-flex flex-row '
              "
            >
              <v-select
                v-if="projectsStorage.currentCustomerProjects.length >= 1"
                label="Select Project"
                :items="projectsStorage.currentCustomerProjects"
                v-model="projectField"
                :menu-icon="ArrowDown"
                :rules="[rules.required]"
              ></v-select>

              <!--Button appears when no projects exist-->
              <PrimaryButton
                v-else
                class="mb-5 w-50 align-self-center"
                color="secondary"
                text="Add new Project"
                :to="{ name: 'projects' }"
              ></PrimaryButton>
              <!--This button only appears when there are projects in existence-->
              <PrimaryButton
                v-if="projectsStorage.currentCustomerProjects.length !== 0"
                text="+"
                size="x-small"
                color="secondary"
                class="ml-4 mt-5"
                :to="{ name: 'projects' }"
              />
            </div>

            <h3>Notes</h3>
            <v-textarea
              rows="2"
              auto-grow="true"
              label="Write some notes"
              class="w-100"
              v-model="notesField"
            >
            </v-textarea>
          </div>

          <v-container class="mb-8 pa-0 d-flex justify-center">
            <PrimaryButton
              v-if="!dateStorage.timeIsRunning"
              text="Start"
              @click="handleStart"
              class="w-100 rounded-xl"
              :loading="loadingStart"
              color="success"
            >
              <StartIcon />
            </PrimaryButton>
            <v-sheet v-else class="w-100 d-flex flex-column align-center">
              <span class="pa-2 mb-6 text-blue-grey-darken-1 text-h4 font-weight-black">{{
                dateStorage.currentCronoTime
              }}</span>
              <PrimaryButton
                text="Stop"
                @click="handleStop"
                class="w-100 rounded-xl"
                :loading="loadingStop"
                color="error"
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
        class="d-flex flex-column w-100 border-b pa-2"
      >
        {{ capitalizedProjectNames }}
        <v-sheet>
          <h3 class="text-primary">{{ capitalizeLetters(dailyHour.data.project) }}</h3>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between align-center">
          <div>
            <div class="d-flex align-center">
              <RayStartArrow class="text-success" />
              <p class="text-dark ml-4">{{ dailyHour.data.starting_time + ' h' }}</p>
            </div>
            <div class="d-flex align-center">
              <RayEndArrow class="text-error" />
              <p class="text-dark ml-4">
                {{
                  dailyHour.data.stopping_time !== undefined
                    ? dailyHour.data.stopping_time + ' h'
                    : 'Running'
                }}
              </p>
            </div>
          </div>
          <div class="d-flex">
            <PrimaryButton
              v-if="dailyHour.data.notes"
              icon
              class="mr-4"
              size="40"
              variant="plain"
              color="dark"
            >
              <MessageIcon />
              <v-tooltip activator="parent" location="bottom">
                {{ dailyHour.data.notes }}
              </v-tooltip>
            </PrimaryButton>
            <h4 class="text-end py-1 px-2 text-primary">
              {{
                dailyHour.data.total_time !== undefined
                  ? dailyHour.data.total_time + ' h'
                  : 'Running'
              }}
            </h4>
          </div>
        </v-sheet>
      </v-sheet>
      <div class="d-flex justify-space-between align-center mt-2">
        <h3 class="text-start text-primary w-auto font-weight-black ma-2">Total time today</h3>
        <h4 class="ma-2 pa-2 rounded-sm text-white bg-primary rounded-lg">
          {{ dateStorage.currentTotalTimeToday }} h
        </h4>
      </div>
    </v-container>
  </div>
</template>
