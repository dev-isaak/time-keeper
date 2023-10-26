<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import ArrowDown from '../icons/ArrowDown.vue'
import { ref, onBeforeMount } from 'vue'
import { useFirestoreDB } from '../../stores/firestoreDB';
import SnackBar from '../SnackBar.vue'

const firestoreDB = useFirestoreDB()
const intervals = [
  '1 minute',
  '5 minutes',
  '15 minutes'
]
const selectedInterval = ref('')
const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)

onBeforeMount(async() => {
  await firestoreDB.getUserData()
  selectedInterval.value = firestoreDB.currentTimeInterval
})

const loading = ref(false)
const handleUpdateInterval = async() => {
  loading.value = true
  await firestoreDB.updateTimeInterval(selectedInterval.value)
  message.value = 'Time interval updated.'
  openSnackbar.value = true
  setTimeout(()=>{
    openSnackbar.value = false
  },3000)
  loading.value = false
}
</script>

<template>
<SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
<h3>Select time interval</h3>
<form class="mt-2">
  <v-select label="Select time interval" :items="intervals" :menu-icon="ArrowDown" v-model="selectedInterval"></v-select>
  <v-container class="d-flex justify-center pt-0">
    <PrimaryButton text="Update" :loading="loading" @click="handleUpdateInterval"/>
  </v-container>
</form>
<p v-if="selectedInterval === '5 minutes'">Projects with less than 10 minutes won't be computed.</p>
</template>