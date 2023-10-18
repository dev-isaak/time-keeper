<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, defineProps } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue';
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue';
import EmailIcon from '@/components/icons/EmailIcon.vue'
import SnackBar from '../SnackBar.vue'
import { useAuthStore } from '@/stores/auth.js'

const props = defineProps({
  preventDefault : Boolean,
})
const emits = defineEmits(['isLogedIn'])

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const authMessage = ref('')
const hidePassword = ref(true)
const openSnackbar = ref(false)
const message = ref('')

const rules = {
  required: (value) => !!value || 'Field is required'
}

const handleLogin = async () => {
  loading.value = true
  const res = await authStore.userLogin(email.value, password.value)
  if (res) {
    authStore.reLogIn = false
    message.value = authStore.errorMessage
    openSnackbar.value = true
    setTimeout(() => {
      openSnackbar.value = false
    },3000)
    loading.value = false
    if (props.preventDefault){
      emits('isLogedIn', true)
      authStore.reLogIn = false
      return
    }
    else {
    router.push('/user-main')
    }
  } else {
    authMessage.value = ''
    loading.value = false
    message.value = authStore.errorMessage
    setTimeout(() => {
      openSnackbar.value = false
    },3000)
  }
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar"/>
  <MainTemplate>
    <v-container class="w-100 d-flex flex-column">
      <h1>Login</h1>
      <v-card class="my-6 pa-6" variant="text">
        <form>
          <v-text-field label="Email" type="email" v-model="email" >
            <template v-slot:prepend-inner>
            <EmailIcon color="gray" class="mr-2" />
          </template>
          </v-text-field>
          <v-text-field
            label="Password"
            :type="!hidePassword ? 'text' : 'password'"
            :rules="[rules.required]"
            v-model="password"
          >
          <template v-slot:prepend-inner>
            <LockIcon color="gray" class="mr-2" />
          </template>
            <template v-slot:append-inner>
              <EyeIcon v-if="!hidePassword" @click="hidePassword = !hidePassword"  color="gray"/>
              <EyeOffIcon v-else @click="hidePassword = !hidePassword"  color="gray"/>
            </template>
        </v-text-field>
          <v-column class="d-flex flex-column align-center my-6">
            <p class="text-error">{{ authMessage }}</p>
            <PrimaryButton color="#90A4AE" text="Login" @click="handleLogin" :loading="loading" />
            <p class="mt-6">
              Don´t have an account yet?
              <RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
            </p>
            <p>
              Forgot your password?
              <RouterLink :to="{name: 'recoveryPassword'}">Recovery</RouterLink>
            </p>
          </v-column>
        </form>
      </v-card>
    </v-container>
  </MainTemplate>
</template>
