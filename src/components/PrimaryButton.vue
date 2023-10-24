<script setup>
import { defineProps } from 'vue'

defineProps({
  text: String,
  color: String,
  loadingState: Boolean,
  variant: String, 
  icon: Boolean,
})

</script>

<template>
  <v-btn class="w-auto" :variant="variant" :color="color" :loading="loadingState">
    {{ text }}
    <v-icon v-if="icon">
      <slot></slot>
    </v-icon>
  </v-btn>
</template>