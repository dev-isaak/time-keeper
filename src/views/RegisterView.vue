<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const lastname = ref('')
const email = ref('')
const emailRepeat = ref('')
const password = ref('')
const passwordRepeat = ref('')


const handleRegister = async() => {
  const isRegistered = await authStore.registerUser(email.value, password.value)
  if (isRegistered){
    router.push('/verify-account')
  }
}

const authMessage = computed(() => {
  return authStore.message
})
</script>

<template>
  <MainTemplate>
    <v-container class="w-75 d-flex flex-column">
      <h1>Register</h1>
      <v-card class="my-6 pa-6">
        <form>
          <v-column class="d-flex">
            <v-text-field class="mx-2" label="Name" v-model="name"></v-text-field>
            <v-text-field class="mx-2" label="Lastname" v-model="lastname"></v-text-field>
          </v-column>
          <v-column class="d-flex">
            <v-text-field class="mx-2" label="Email" v-model="email"></v-text-field>
            <v-text-field class="mx-2" label="Repeat email" v-model="emailRepeat"></v-text-field>
          </v-column>
          <v-column class="d-flex">
            <v-text-field class="mx-2" type="password" label="Password" v-model="password"></v-text-field>
            <v-text-field
              class="mx-2"
              type="password"
              label="Repeat password"
              v-model="passwordRepeat"
            ></v-text-field>
          </v-column>
          <v-column class="d-flex flex-column align-center my-6">
            {{ authMessage }}
            <PrimaryButton color="#90A4AE" text="Register" @click="handleRegister" />
          </v-column>
        </form>
      </v-card>
    </v-container>
  </MainTemplate>
</template>
