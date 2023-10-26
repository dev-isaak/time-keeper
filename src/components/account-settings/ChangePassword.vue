<script setup>
import LockIcon from '@/components/icons/LockIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import PrimaryButton from '@/components/PrimaryButton.vue'
import ReLogInDialog from '@/components/account-settings/ReLogInDialog.vue'
import SnackBar from '../SnackBar.vue'

const authStore = useAuthStore()

const hidePassword = ref(true)
const hidePassword2 = ref(true)
const password = ref('')
const repeatedPassword = ref('')
const loadingStatePassword = ref(false)
const dialog = ref(false)
const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)

const closeDialog = computed(() => {
  return dialog.value
})

const handleUpdatePassword = async () => {
  if (password.value === repeatedPassword.value) {
    loadingStatePassword.value = true
    await authStore.updatePassword(password.value)
    if (authStore.isPasswordUpdated) {
      loadingStatePassword.value = false
      openSnackbar.value = true
      message.value = 'Password updated succesfully'
      setTimeout(() => {
        openSnackbar.value = false
      }, 3000)
      password.value = null
      repeatedPassword.value = null
    } else {
      //DESDE AQUÍ
      if (authStore.needReLogIn) {
        dialog.value = true
      }
      loadingStatePassword.value = false
      openSnackbar.value = true
      message.value = authStore.errorMessage || 'Login successful'
      setTimeout(() => {
        openSnackbar.value = false
      }, 3000)
    }
  } else {
    errorMessage.value = true
    openSnackbar.value = true
    message.value = 'Passwords must be equals.'
    setTimeout(() => {
      openSnackbar.value = false
    }, 3000)
  }
}

const handleReLogIn = (e) => {
  dialog.value = e
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
  <h3 class="mb-2 mt-10">Update Account Password</h3>
  <v-container class="border d-flex justify-center">
    <v-sheet class="my-2 pa-0 w-100" max-width="500">
      <v-text-field
        :type="!hidePassword ? 'text' : 'password'"
        :label="'Password'"
        v-model="password"
        variant="underlined"
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
        :type="!hidePassword2 ? 'text' : 'password'"
        :label="'Repeat password'"
        v-model="repeatedPassword"
        variant="underlined"
      >
        <template v-slot:prepend-inner>
          <LockIcon color="gray" class="mr-2" />
        </template>
        <template v-slot:append-inner>
          <EyeIcon v-if="!hidePassword2" @click="hidePassword2 = !hidePassword2" color="gray" />
          <EyeOffIcon v-else @click="hidePassword2 = !hidePassword2" color="gray" />
        </template>
      </v-text-field>
      <v-sheet class="d-flex flex-column">
        <p v-if="messageUpdatedPassword != ''" class="text-success mb-2">
          {{ messageUpdatedPassword }}
        </p>
        <PrimaryButton
          text="Update"
          @click="handleUpdatePassword"
          :loading="loadingStatePassword"
        />
      </v-sheet>
    </v-sheet>
    <ReLogInDialog :openDialog="closeDialog" @isLogedIn="handleReLogIn" />
  </v-container>
</template>
