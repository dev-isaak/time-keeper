<script setup>
import MainHeader from '@/components/MainHeader.vue'
defineProps({
  title: String
})
</script>
<template>
  <v-container class="mt-16 px-0">
    <MainHeader :title="title" />
    <slot> </slot>
  </v-container>
</template>

<style>
@media (min-width: 960px){
  .v-container{
    max-width: 100% !important;
  }
}
</style>