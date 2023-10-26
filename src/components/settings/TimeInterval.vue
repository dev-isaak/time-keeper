<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import ArrowDown from '../icons/ArrowDown.vue'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
<h3>Select time interval</h3>
<form class="mt-2">
  <v-select label="Select time interval" :items="['1 minute','5 minutes', '15 minutes']" :menu-icon="ArrowDown"></v-select>
  <v-container class="d-flex justify-center pt-0">
    <PrimaryButton text="Update" :loading="loading"></PrimaryButton>
  </v-container>
</form>
</template>