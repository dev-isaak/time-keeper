<script setup>
import { onBeforeMount } from 'vue'
import { useDateStorage } from '@/stores/dateStorage.js'
import { ref } from 'vue'

const dateStorage = useDateStorage()

const overlay = ref(false)
const monthlyHours = ref(0)

onBeforeMount(async () => {
  overlay.value = true
  const date = new Date()

  await dateStorage.getCurrentMonthlyHours(date.getFullYear(), date.getMonth() + 1)

  // se calcula el porcentage sobre 160h = 576000000
  monthlyHours.value = (dateStorage.currentMonthlyHoursMs * 100) / 576000000

  overlay.value = false
})
</script>

<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <v-sheet elevation="1" class="d-flex flex-column align-center w-auto pa-4" max-width="400">
    <v-progress-circular :model-value="monthlyHours" size="100" width="15">{{
      dateStorage.currentMonthlyHours
    }}</v-progress-circular>
    <h4 class="text-center mt-4">Total time this month</h4>
  </v-sheet>
</template>
