<script setup>
defineProps({
  title: String
})
</script>

<template>
  <div class="mx-8">
    <h1 class="text-primary">{{ title }}</h1>
    <v-divider v-if="title"></v-divider>
  </div>
</template>
