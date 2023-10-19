<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import PauseIcon from '@/components/icons/PauseIcon.vue'
import StopIcon from '@/components/icons/StopIcon.vue'
import SnackBar from '../SnackBar.vue'
import { ref } from 'vue'

const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)

const handleStart = () => {
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

const handleStop = () => {
  message.value = 'Journey stoped.'
  openSnackbar.value = true
  setTimeout(() => {
    openSnackbar.value = false
  }, 3000)
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar"  :error="errorMessage ? true : false"/>
  <v-container class="w-100 d-flex justify-center">
  <v-sheet class="w-100 d-flex flex-column flex-sm-row align-center justify-space-around " max-width="400">
    <PrimaryButton text="Start" variant="outlined" color="#1B5E20" @click="handleStart" class="ma-4 w-50">
      <StartIcon color="#1B5E20"/>
    </PrimaryButton>
    <PrimaryButton text="Pause" variant="outlined" color="#0D47A1" @click="handlePause" class="ma-4 w-50">
      <PauseIcon color="#0D47A1"/>
    </PrimaryButton>
    <PrimaryButton text="Stop" variant="outlined" color="#B71C1C" @click="handleStop" class="ma-4 w-50">
      <StopIcon color="#B71C1C"/>
    </PrimaryButton>
  </v-sheet>
</v-container>
</template>
