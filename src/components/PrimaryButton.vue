<script setup>
import { defineProps } from 'vue'

defineProps({
  text: String,
  color: String,
  loadingState: Boolean,
})

</script>

<template>
  <v-btn variant="elevated" :color="color" :loading="loadingState">
    {{ text }}
    <template v-slot:append>
      <slot></slot>
    </template>
  </v-btn>
</template>