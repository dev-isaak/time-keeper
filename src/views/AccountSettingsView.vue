<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import LockIcon from '@/components/icons/LockIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const password = ref('')
const repeatedPassword = ref('')
const userName = ref('')
const loadingStateName = ref(false)
const loadingStateProfileImage = ref(false)
const loadingStatePassword = ref(false)
const loadingStateDelete = ref(false)
const messageUpdatedUsername = ref('')
const messageUpdatedPassword = ref('')
const messageUpdatedProfilePhoto = ref('')
const hidePassword = ref(true)
const hidePassword2 = ref(true)
const verifyEmailPhrase = ref('')
const dialog = ref(false)

const handleDeleteAccount = async () => {
  authStore.reLogIn = false
  loadingStateDelete.value = true

  if(authStore.needReLogIn) {
    dialog.value = true
  } 

  await authStore.deleteAccount()

  if (authStore.isAccountDeleted) {
    router.push({name: 'login'})
  }
  loadingStateDelete.value = false
}

const handleUpdateName = async () => {
  loadingStateName.value = true
  const isUpdated = await authStore.updateUserName(userName.value)
  if (isUpdated) {
    loadingStateName.value = false
    messageUpdatedUsername.value = 'Username updated succesfully'
    setTimeout(() => {
      messageUpdatedUsername.value = ''
    }, 5000)
    userName.value = null
  } else {
    loadingStateName.value = false
    messageUpdatedUsername.value = 'Cannot update username. Try again later.'
  }
}

const handleUpdateProfilePhoto = async () => {
  alert('No function yet')
}

const handleUpdatePassword = async () => {
  if (password.value === repeatedPassword.value) {
    loadingStatePassword.value = true
    await authStore.updatePassword(password.value)

    if (authStore.isPasswordUpdated) {
      loadingStatePassword.value = false
      messageUpdatedPassword.value = 'Password updated succesfully'
      setTimeout(() => {
        messageUpdatedPassword.value = ''
      }, 5000)
      password.value = null
      repeatedPassword.value = null
    } else {
      do {
        dialog.value = true
        authStore.reLogIn = false
      } while (authStore.needReLogIn)

      loadingStatePassword.value = false
      messageUpdatedPassword.value = authStore.errorMessage
    }
  } else {
    messageUpdatedPassword.value = 'Passwords must be equals.'
  }
}
</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
    <div>
      <h1>Account Settings</h1>
      <v-divider class="my-5"></v-divider>
      <v-container>
        <v-container class="mb-10 pa-0">
          <h3 class="my-2">Change Username</h3>
          <v-text-field
            :label="authStore.providedUserName || 'User Name'"
            v-model="userName"
          ></v-text-field>
          <v-sheet class="d-flex flex-column">
            <p v-if="messageUpdatedUsername != ''" class="text-success mb-2">
              {{ messageUpdatedUsername }}
            </p>
            <PrimaryButton
              text="Update"
              color="#90A4AE"
              @click="handleUpdateName"
              :loading="loadingStateName"
            />
          </v-sheet>
        </v-container>
        <v-container class="mb-10 pa-0">
          <h3 class="my-2">Change Profile Photo</h3>
          <v-file-input prepend-icon="" prepend-inner-icon="" label="Select photo"></v-file-input>
          <v-sheet class="d-flex flex-column">
            <p v-if="messageUpdatedProfilePhoto != ''" class="text-success mb-2">
              {{ messageUpdatedProfilePhoto }}
            </p>
            <PrimaryButton
              text="Update"
              color="#90A4AE"
              @click="handleUpdateProfilePhoto"
              :loading="loadingStateProfileImage"
            />
          </v-sheet>
        </v-container>
        <v-container class="my-2 pa-0">
          <h3 class="my-2">Update Account Password</h3>
          <v-text-field
            :type="!hidePassword ? 'text' : 'password'"
            :label="'Password'"
            v-model="password"
          >
            <template v-slot:prepend-inner>
              <LockIcon color="gray" class="mr-2" />
            </template>
            <template v-slot:clear>
              <CloseIcon color="gray" />
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
          <v-sheet class="d-flex flex-column">
            <p v-if="messageUpdatedPassword != ''" class="text-success mb-2">
              {{ messageUpdatedPassword }}
            </p>
            <PrimaryButton
              text="Update"
              color="#90A4AE"
              @click="handleUpdatePassword"
              :loading="loadingStatePassword"
            />
          </v-sheet>
        </v-container>
      </v-container>
      <v-divider class="mb-4"></v-divider>
      <v-container class="my-2">
        <h3 class="my-2">Delete Account</h3>
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Delete Account" color="error"> </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Delete Account">
              <v-card-text>
                <v-sheet color="#f5f5f5" class="pa-4 ma-4">
                  <p>Are you sure you want to delete the account?</p>
                  <p>If you delete the account, you won't be able to recover it in the future.</p>
                </v-sheet>
                <h4>To confirm, type "{{ authStore.providedEmail }}" in the box below"</h4>
                <v-text-field v-model="verifyEmailPhrase"></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <PrimaryButton
                  text="Delete Account"
                  color="error"
                  @click="handleDeleteAccount"
                  :disabled="authStore.providedEmail === verifyEmailPhrase ? false : true"
                />
                <PrimaryButton text="Close" @click="isActive.value = false" />
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-container>
      <v-dialog v-model="dialog">
        <v-card>
          <LoginForm preventDefault />
        </v-card>
      </v-dialog>
    </div>
  </MainTemplate>
</template>
