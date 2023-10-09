<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import { useAuthStore } from '../stores/auth'
import { ref, computed } from 'vue'

const authStore = useAuthStore()

const email = ref('')
const userName = ref('')

const accountMessage = computed (() => {
  return authStore.message
})

const handleDeleteAccount = async() => {
  await authStore.deleteAccount()
}

const handleUpdateEmail = async() => {
  await authStore.updateEmail(email.value)
}

const handleUpdateName = async() => {
  await authStore.updateUserName(userName.value )
}
</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
  <h1>Account Settings</h1>
  <v-divider class="my-10"></v-divider>
  <v-container>
    <h3>Update Username</h3>
    <v-column class="d-flex flex-wrap align-center">
      <v-text-field label="User Name" v-model="userName"></v-text-field>
      <v-btn @click="handleUpdateName" >Icon</v-btn>
    </v-column>
    <v-column class="d-flex flex-wrap align-center">
      <v-text-field label="Phone Number"></v-text-field>
      <v-btn >Icon</v-btn>
    </v-column>
    <v-column class="d-flex flex-wrap align-center">
      <v-text-field label="Profile Image"></v-text-field>
      <v-btn >Icon</v-btn>
    </v-column>
    <h3>Update Email</h3>
    <form>
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="Repeat email"></v-text-field>
      <v-container class="d-flex flex-column align-center justify-center">
        {{ accountMessage }}
        <PrimaryButton text="Update email" color="var(--primary-color)" @click="handleUpdateEmail"/>
      </v-container>
    </form>
  </v-container>
  <v-divider></v-divider>
  <h3>Change Password</h3>
  <v-container>
    <form>
      <v-text-field type="password" label="Password"></v-text-field>
      <v-text-field type="password" label="Repeat Password"></v-text-field>
    </form>
    <v-container class="d-flex justify-center">
        <PrimaryButton text="Update Password" color="var(--primary-color)"/>
      </v-container>
  </v-container>
  <v-divider></v-divider>
  <h3>Delete Account</h3>
  <v-container>
    <p>Are you sure you want to delete the account?</p>
    <p>If you delete the account, you won't be able to recovery anything related to it.</p>

    <PrimaryButton class="mt-4" color="error" text="Delete account" @click="handleDeleteAccount"/>
  </v-container>
</MainTemplate>
</template>