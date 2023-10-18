<script setup>
import { useAuthStore } from '../stores/auth'
import { ref, onMounted } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'

const authStore = useAuthStore()

const accountEmail = ref('')

onMounted(() => {
  accountEmail.value = authStore.userEmail
})
</script>

<template>
  <MainTemplate>
    <h1>Verify account email</h1>
    <h2>{{ accountEmail }}</h2>

    <p>
      You will recive an email verification on your email account. Please, verify your email before
      login.
    </p>
  </MainTemplate>
</template>
