<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const email = ref('')
const repeatedEmail = ref('')
const password = ref('')
const repeatedPassword = ref('')
const userName = ref('')
const loadingState = ref(false)
const messageUpdatedUsername = ref('')
const messageUpdatedEmail = ref('')
const messageUpdatedPassword = ref('')

const handleDeleteAccount = async () => {
  loadingState.value = true
  if (password.value === repeatedPassword.value){
    const isUpdated = await authStore.deleteAccount()
    console.log(isUpdated)
    password.value = ''
    repeatedPassword.value = ''
    loadingState.value = false
  } else {
    messageUpdatedEmail.value = 'Passwords must be equals.'
    setTimeout(() => {
      messageUpdatedPassword.value = ''
      loadingState.value = false
    }, 5000);
  }
}

const handleUpdateEmail = async () => {
  loadingState.value = true
  if (email.value === repeatedEmail.value){
    const isUpdated = await authStore.updateEmail(email.value)
    console.log(isUpdated)
    email.value = ''
    repeatedEmail.value = ''
    loadingState.value = false
  } else{
    messageUpdatedEmail.value = 'Emails must be equals.'
    setTimeout(() => {
      messageUpdatedEmail.value = ''
      loadingState.value = false
    }, 5000);
  }
}

const handleUpdateName = async() => {
  loadingState.value = true
  const isUpdated = await authStore.updateUserName(userName.value)
  if (isUpdated) {
    loadingState.value = false
    messageUpdatedUsername.value = 'Username updated succesfully'
    setTimeout(() => {
      messageUpdatedUsername.value = ''
    }, 5000);
    userName.value = null
  } else {
      loadingState.value = false
      messageUpdatedUsername.value = 'Cannot update username. Try again later.'
  }
}


const handleUpdateProfilePhoto = async () => {
  alert('No function yet')
}
</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
    <h1>Account Settings</h1>
    <v-divider class="my-5"></v-divider>
    <v-container class="w-100 d-flex flex-column">
      <v-container class="my-2">
          <h3 class="my-2">Change Username</h3>
        <v-text-field class="mr-6" :label="authStore.providedUserName || 'User Name'" v-model="userName"></v-text-field>
        <v-sheet class="d-flex flex-column">
          <p v-if="messageUpdatedUsername != ''" class="text-success mb-2">{{ messageUpdatedUsername }}</p>
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdateName"
            width="100"
            :loading="loadingState"
          />
        </v-sheet>
      </v-container>
      <v-container class="my-2">
          <h3 class="my-2">Change Profile Photo</h3>
        <v-file-input prepend-icon="" prepend-inner-icon="" label="Select photo"></v-file-input>
        <v-sheet class="d-flex flex-column">
          <p v-if="messageUpdatedUsername != ''" class="text-success mb-2">{{ messageUpdatedUsername }}</p>
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdateProfilePhoto"
            width="100"
            :loading="loadingState"
          />
        </v-sheet>
      </v-container>
      <v-container class="my-2">
          <h3 class="my-2">Update Account Email</h3>
        <v-text-field class="mr-6" :label="authStore.providedEmail || 'New email'" v-model="email"></v-text-field>
        <v-text-field class="mr-6" :label="'Repeat email'" v-model="repeatedEmail"></v-text-field>
        <v-sheet class="d-flex flex-column">
          <p v-if="messageUpdatedEmail != ''" class="text-success mb-2">{{ messageUpdatedEmail}}</p>
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdateEmail"
            width="100"
            :loading="loadingState"
          />
        </v-sheet>
      </v-container>
    <v-container class="my-2">
          <h3 class="my-2">Update Account Password</h3>
        <v-text-field class="mr-6" type="password" :label="'Password'" v-model="password"></v-text-field>
        <v-text-field class="mr-6" type="password" :label="'Repeat password'" v-model="repeatedPassword"></v-text-field>
        <v-sheet class="d-flex flex-column">
          <p v-if="messageUpdatedPassword != ''" class="text-success mb-2">{{ messageUpdatedPassword}}</p>
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdatePassword"
            width="100"
            :loading="loadingState"
          />
        </v-sheet>
      </v-container>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-container class="my-2">
          <h3 class="my-2">Delete Account</h3>
          <v-sheet class="my-4">
            <p>Are you sure you want to delete the account?</p>
            <p>If you delete the account, you won't be able to </p>
          </v-sheet>
          <PrimaryButton
            text="Delete Account"
            color="error"
            @click="handleDeleteAccount"
            width="100"
            :loading="loadingState"
          />
      </v-container>
  </MainTemplate>
</template>
