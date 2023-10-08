<script setup>
import { defineProps } from 'vue'

defineProps({
  text: String,
})

</script>

<template>
  <v-btn variant="elevated" color="#90A4AE">{{ text }}</v-btn>
</template>