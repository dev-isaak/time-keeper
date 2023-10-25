<script setup>
import { RouterView } from 'vue-router'
import NavbarMain from '@/components/navbar/NavbarMain.vue'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async() => {
  await authStore.userStatus()
})
</script>

<template>
  <v-theme-provider>
    <NavbarMain theme="default" />
    <RouterView />
  </v-theme-provider>
</template>

<style>
@import './assets/variables.css';
</style>
