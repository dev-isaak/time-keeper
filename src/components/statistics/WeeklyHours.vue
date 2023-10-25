<script setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'

const dateStorage = useDateStorage()

const weeklyHours = ref(0)

onBeforeMount(async() => {
	const date = new Date()

  await dateStorage.getWeeklyHours(date.getFullYear())
// se calcula el porcentage sobre 40h = 144000000
	weeklyHours.value = dateStorage.currentWeeklyHoursMs * 100 / 144000000

})

</script>

<template>
  <v-sheet elevation="1" class="d-flex flex-column align-center w-auto pa-4" max-width="400">
    <v-progress-circular :model-value="weeklyHours" size="100" width="15">
      {{ dateStorage.currentWeeklyHours }}
    </v-progress-circular>
    <h4 class="text-center mt-4">Total time this week</h4>
  </v-sheet>
</template>
