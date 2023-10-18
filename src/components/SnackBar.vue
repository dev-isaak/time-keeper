<script setup>
const props = defineProps({
    text: String,
    openSnackbar: Boolean
})
</script>
<template>
    <div class="text-center">  
      <v-snackbar
        v-model="props.openSnackbar"
      >
        {{ text }}
  
      </v-snackbar>
    </div>
  </template>