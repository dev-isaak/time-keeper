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
  <NavbarMain />
  <RouterView />
</template>
