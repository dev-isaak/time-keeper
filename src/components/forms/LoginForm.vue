<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, defineProps } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import SnackBar from '../SnackBar.vue'
import { useAuthStore } from '@/stores/auth.js'

const props = defineProps({
  preventDefault: Boolean
})
const emits = defineEmits(['isLogedIn'])

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const hidePassword = ref(true)
const openSnackbar = ref(false)
const message = ref('')
const errorMessage = ref(false)

const rules = {
  required: (value) => !!value || 'Field is required'
}

const handleLogin = async () => {
  loading.value = true
  const res = await authStore.userLogin(email.value, password.value)
  if (res) {
    authStore.reLogIn = false
    errorMessage.value = true
    message.value = authStore.errorMessage
    openSnackbar.value = true
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
    loading.value = false
    if (props.preventDefault) {
      emits('isLogedIn', false)
      authStore.reLogIn = false
      return
    } else {
      router.push('/user-main')
    }
  } else {
    loading.value = false
    errorMessage.value = true
    message.value = authStore.errorMessage
    openSnackbar.value = true
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
  }
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
  <v-container class="w-100 d-flex flex-column">
    <h1>Login</h1>
    <v-card class="py-6" variant="text">
      <form>
        <v-text-field label="Email" type="email" v-model="email">
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
            <EyeIcon v-if="!hidePassword" @click="hidePassword = !hidePassword" color="gray" />
            <EyeOffIcon v-else @click="hidePassword = !hidePassword" color="gray" />
          </template>
        </v-text-field>
        <v-column class="d-flex flex-column align-center mt-6">
          <PrimaryButton text="Login" @click="handleLogin" :loading="loading" />
        </v-column>
      </form>
    </v-card>
  </v-container>
</template>
