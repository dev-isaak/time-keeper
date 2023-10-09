<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const authMessage = computed(() => {
  return authStore.message
})

const isLoggedIn = computed(() => {
  return authStore.isLoggedIn
})

const handleLogin = async () => {
  await authStore.userLogin(email.value, password.value)
  if (isLoggedIn.value) {
    router.push('/user-main')
  } else {
    return
  }
}
</script>

<template>
  <MainTemplate>
    <v-container class="w-75 d-flex flex-column">
      <h1>Login</h1>
      <v-card class="my-6 pa-6">
        <form>
          <v-text-field label="Email" type="email" v-model="email" clearable></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            clearable
          ></v-text-field>
          <v-column class="d-flex flex-column align-center my-6">
            {{ authMessage }}
            <PrimaryButton color="#90A4AE" text="Login" @click="handleLogin" />
            <p class="mt-6">
              Don´t have an account yet?
              <RouterLink :to="{ name: 'register' }">Register</RouterLink>
            </p>
            <p>
              Forgot your password?
              <RouterLink to="#">Recovery</RouterLink>
            </p>
          </v-column>
        </form>
      </v-card>
    </v-container>
  </MainTemplate>
</template>
