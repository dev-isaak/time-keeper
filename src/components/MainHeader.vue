<script setup>
defineProps({
  title: String
})
</script>

<template>
  <h1 class="text-primary">{{ title }}</h1>
  <v-divider v-if="title"></v-divider>
</template>
