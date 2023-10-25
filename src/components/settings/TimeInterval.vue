<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
<h3>Select time interval</h3>
<form>
  <v-select label="Select time interval" :items="['1 minute','5 minutes', '15 minutes']"></v-select>
  <PrimaryButton text="Update" color="" :loading="loading"></PrimaryButton>
</form>
</template>