<script setup>
import { defineProps } from 'vue'

defineProps({
  text: String,
  color: String,
  loadingState: Boolean,
  variant: String, 
})

</script>

<template>
  <v-btn class="w-auto" :variant="variant" :color="color" :loading="loadingState">
    {{ text }}
    <template v-slot:append>
      <slot></slot>
    </template>
  </v-btn>
</template>