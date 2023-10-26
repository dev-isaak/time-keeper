<script setup>
import { ref } from 'vue'

defineProps({
  time: String,
  msTime: Number
})

const power = ref(74)
</script>

<template>
  <v-progress-linear v-model="power" height="25">
    <p class="font-weight-bold">{{ time }}</p>
    - {{ msTime }}
  </v-progress-linear>
</template>
