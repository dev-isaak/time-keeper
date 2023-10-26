<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth.js'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import LockIcon from '@/components/icons/LockIcon.vue'
import { useFirestoreDB } from '@/stores/firestoreDB.js'
import SnackBar from '../SnackBar.vue'

const router = useRouter()
const authStore = useAuthStore()
const db = useFirestoreDB()

const email = ref('')
const emailRepeat = ref('')
const password = ref('')
const passwordRepeat = ref('')
const message = ref('')
const isLoading = ref(false)
const hidePassword = ref(true)
const hidePassword2 = ref(true)
const openSnackbar = ref(false)
const errorMessage = ref(false)

const rules = {
  required: (value) => !!value || 'Field is required'
}

const handleRegister = async () => {
  if (email.value !== emailRepeat.value) {
    errorMessage.value = true
    message.value = 'Emails must be equals.'
    openSnackbar.value = true
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
  } else if (password.value !== passwordRepeat.value) {
    errorMessage.value = true
    message.value = 'Passwords must be equals'
    openSnackbar.value = true
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
  } else {
    isLoading.value = true
    const isRegistered = await authStore.registerUser(email.value, password.value)
    if (isRegistered) {
      await db.createUserTable()
      isLoading.value = false
      router.push('/verify-account')
    } else {
      isLoading.value = false
      message.value = authStore.errorMessage
      openSnackbar.value = true
      setTimeout(() => {
        openSnackbar.value = false
      }, 3000)
    }
  }
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
  <MainTemplate>
    <v-container class="w-100 d-flex flex-column">
      <h1>Register</h1>
      <v-card class="my-6 pa-6">
        <form>
          <v-text-field class="mx-2" label="Email" v-model="email" :rules="[rules.required]">
            <template v-slot:prepend-inner>
              <EmailIcon color="gray" class="mr-2" />
            </template>
          </v-text-field>
          <v-text-field
            class="mx-2"
            label="Repeat email"
            :rules="[rules.required]"
            v-model="emailRepeat"
          >
            <template v-slot:prepend-inner>
              <EmailIcon color="gray" class="mr-2" />
            </template>
          </v-text-field>
          <v-text-field
            class="mx-2"
            :type="!hidePassword ? 'text' : 'password'"
            label="Password"
            hint="Password must contain at least 6 characters."
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
          <v-text-field
            class="mx-2"
            :type="!hidePassword2 ? 'text' : 'password'"
            label="Repeat password"
            :rules="[rules.required]"
            v-model="passwordRepeat"
          >
            <template v-slot:prepend-inner>
              <LockIcon color="gray" class="mr-2" />
            </template>
            <template v-slot:clear>
              <CloseIcon color="gray" />
            </template>
            <template v-slot:append-inner>
              <EyeIcon v-if="!hidePassword2" @click="hidePassword2 = !hidePassword2" color="gray" />
              <EyeOffIcon v-else @click="hidePassword2 = !hidePassword2" color="gray" />
            </template>
          </v-text-field>
          <v-container class="d-flex flex-column align-center">
            <PrimaryButton text="Register" @click="handleRegister" :loading="isLoading" />
          </v-container>
        </form>
      </v-card>
    </v-container>
  </MainTemplate>
</template>
