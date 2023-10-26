<script setup>
import MainHeader from '@/components/MainHeader.vue'
defineProps({
  title: String
})
</script>
<template>
  <v-container class="mt-16 px-2 px-0">
    <MainHeader :title="title" />
    <slot> </slot>
  </v-container>
</template>
