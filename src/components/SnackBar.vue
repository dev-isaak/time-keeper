<script setup>
import CheckIcon from '@/components/icons/CheckIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue';
const props = defineProps({
    text: String,
    openSnackbar: Boolean,
    error: Boolean,
})
</script>
<template>
      <v-snackbar
        v-model="props.openSnackbar"
        location="top"
      >
      <div class="d-flex align-center">
        <CheckIcon v-if="!error" color="green"/>
        <CloseIcon v-else color="#B71C1C" />
        <p class="ml-4">
          {{ text }}
        </p>
      </div>
      </v-snackbar>
  </template>