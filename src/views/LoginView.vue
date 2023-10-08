<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'


import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLogedIn = ref(false)

const handleLogin = async() => {
  isLogedIn.value = await authStore.userLogin(email.value, password.value)
  if (isLogedIn.value){
    router.push('/user-main')
  }
}


</script>

<template>
  <MainTemplate>
  <v-container v-if="isLogedIn === false" class="w-75 d-flex flex-column">
  <h1>Login</h1>
  <v-card class="my-6 pa-6">
    <form>
      <v-text-field label="Email" type="email" v-model="email" clearable></v-text-field>
      <v-text-field label="Password" type="password" v-model="password" clearable></v-text-field>
      <v-column class="d-flex flex-column align-center my-6">
        <PrimaryButton color="#90A4AE" text="Login" @click="handleLogin" />
        <p class="mt-6">Don´t have an account yet?
          <RouterLink :to="{name: 'register'}">Register</RouterLink>
        </p>
        <p>Forgot your password? 
          <RouterLink to="#">Recovery</RouterLink>
        </p>
      </v-column>
    </form>
  </v-card>
</v-container>
<v-container v-else>
  <h3>You are loged in</h3>
</v-container>
</MainTemplate>
</template>