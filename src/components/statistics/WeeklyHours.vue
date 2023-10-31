<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import {DateConverter} from '@/utils/DateConverter.js'
const dateStorage = useDateStorage()

const weeklyHours = ref(0)

onBeforeMount(async () => {
  const dateConvert = new DateConverter()
  await dateStorage.getWeeklyHours()
  // Get hour in ms
  const hourInMs = dateConvert.getMilliseconds(dateStorage.currentWeeklyHours)
  // Then do the percentatge to 40h
  weeklyHours.value = hourInMs / 144000000 * 100
})
</script>

<template>
  <v-sheet elevation="1" class="d-flex flex-column align-center w-auto pa-4" max-width="400">
    <v-progress-circular :model-value="weeklyHours" size="100" width="15">
      {{ dateStorage.currentWeeklyHours }} h
    </v-progress-circular>
    <h4 class="text-center mt-4">Total time this week</h4>
  </v-sheet>
</template>
