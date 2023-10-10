<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const email = ref('')
const userName = ref('')
const phoneNumer = ref('')
const profilePhoto = ref('')
const loadingState = ref(false)
const messageUpdatedUsername = ref('')

const accountMessage = computed(() => {
  return authStore.message
})

const currentUserName = computed(() => {
  return authStore.userName
})

const currentPhoneNumber = computed(() => {
  return authStore.userPhone
})

const handleDeleteAccount = async () => {
  await authStore.deleteAccount()
}

const handleUpdateEmail = async () => {
  await authStore.updateEmail(email.value)
  userName.value = ''
}

const handleUpdateName = async() => {
  loadingState.value = true
  const isUpdated = await authStore.updateUserName(userName.value)
  console.log(isUpdated)
  if (isUpdated) {
    loadingState.value = false
    messageUpdatedUsername.value = 'Username updated succesfully'
    userName.value = null
  } else {
      loadingState.value = false
      messageUpdatedUsername.value = 'Cannot update username. Try again later.'
  }
}

const handleUpdatePhone = async () => {
  await authStore.updatePhoneUser(phoneNumer.value)
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
      <v-container class="my-4">
        <v-chip color="#90A4AE" class="my-2">{{authStore.providedUserName}}</v-chip>
        <v-text-field class="mr-6" label="User Name" v-model="userName"></v-text-field>
        <v-sheet class="d-flex flex-column">
          {{ messageUpdatedUsername }}
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdateName"
            width="100"
            :loading="loadingState"
          />
        </v-sheet>
      </v-container>
      <v-column class="my-4">
        <h3>{{ currentPhoneNumber }}</h3>
        <v-text-field label="Phone Number" class="mr-6"></v-text-field>
        <v-column class="d-flex flex-column">
          {{ accountMessage }}
          <PrimaryButton text="Update" color="#90A4AE" @click="handleUpdatePhone" width="100" />
        </v-column>
      </v-column>
      <v-column class="my-4">
        <v-text-field label="Profile Image" class="mr-6"></v-text-field>
        <v-column class="d-flex flex-column">
          {{ accountMessage }}
          <PrimaryButton
            text="Update"
            color="#90A4AE"
            @click="handleUpdateProfilePhoto"
            width="100"
          />
        </v-column>
      </v-column>
      <h3>Update Email</h3>
      <form>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Repeat email"></v-text-field>
        <v-container class="d-flex flex-column align-center justify-center">
          {{ accountMessage }}
          <PrimaryButton text="Update email" color="#90A4AE" @click="handleUpdateEmail" />
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
        <PrimaryButton text="Update Password" color="#90A4AE" />
      </v-container>
    </v-container>
    <v-divider></v-divider>
    <h3>Delete Account</h3>
    <v-container>
      <p>Are you sure you want to delete the account?</p>
      <p>If you delete the account, you won't be able to recovery anything related to it.</p>

      <PrimaryButton
        class="mt-4"
        color="error"
        text="Delete account"
        @click="handleDeleteAccount"
      />
    </v-container>
  </MainTemplate>
</template>
