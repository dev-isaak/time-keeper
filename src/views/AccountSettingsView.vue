<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import LockIcon from '@/components/icons/LockIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import { useRouter } from 'vue-router'
import { useFirestoreDB } from '@/stores/firestoreDB.js'
import SettingRow from '@/components/account-settings/SettingRow.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'

const authStore = useAuthStore()
const router = useRouter()
const db = useFirestoreDB()
const password = ref('')
const repeatedPassword = ref('')
const loadingStatePassword = ref(false)
const loadingStateDelete = ref(false)
const messageUpdatedPassword = ref('')
const hidePassword = ref(true)
const hidePassword2 = ref(true)
const verifyEmailPhrase = ref('')
const dialog = ref(false)
const updatedUserName = ref('')
const updatedUserLastname = ref('')
const updatedUserAddress = ref('')
const updatedUserBirthDate = ref('')
const updatedUserPhone = ref('')
const closeEditingView = ref(false)

onBeforeMount(async () => {
  await db.getUserData()
})

const handleDeleteAccount = async () => {
  authStore.reLogIn = false
  loadingStateDelete.value = true

  if (authStore.needReLogIn) {
    dialog.value = true
  }

  await authStore.deleteAccount()

  if (authStore.isAccountDeleted) {
    router.push({ name: 'login' })
  }
  loadingStateDelete.value = false
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

const handleUpdateUsername = async () => {
  await db.updateUserName(updatedUserName.value)
  if (db.isUserNameUpdated) {
    closeEditingView.value = true
  }
}
const handleUpdateLastname = async () => {
  await db.updateUserLastname(updatedUserLastname.value)
  if (db.isUserLastnameUpdated) {
    closeEditingView.value = true
  }
}
const handleUpdateBirthDate = async () => {
  await db.updateUserBirthDate(updatedUserBirthDate.value)
  if (db.isUserBirthDateUpdated) {
    closeEditingView.value = true
  }
}
const handleUpdateAddress = async () => {
  await db.updateUserAddress(updatedUserAddress.value)
  if (db.isUserAddressUpdated) {
    closeEditingView.value = true
  }
}
const handleUpdatePhone = async () => {
  await db.updateUserPhone(updatedUserPhone.value)
  if (db.isUserPhoneUpdated) {
    closeEditingView.value = true
  }
}
//Received values from text field at SettingRow component
const receivedUserName = (userName) => (updatedUserName.value = userName)
const receivedLastname = (lastName) => (updatedUserLastname.value = lastName)
const receivedBirthDate = (birthDate) => (updatedUserBirthDate.value = birthDate)
const receivedAddress = (address) => (updatedUserAddress.value = address)
const receivedPhone = (phoneNumber) => (updatedUserPhone.value = phoneNumber)
</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
    <div>
      <h1>Account Settings</h1>
      <v-divider class="my-5"></v-divider>
      <v-container cols="1">
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet>
              <v-sheet class="d-flex flex-column align-center w-100" width="100">
                <ProfileAvatar size="150" class="mb-4"/>
                <PrimaryButton text="Edit" />
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="d-flex flex-wrap">
              <SettingRow
                title="Name"
                :value="db.currentUserName"
                :updateValue="handleUpdateUsername"
                @fieldValue="receivedUserName"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Last Name"
                :value="db.currentUserLastname"
                :updateValue="handleUpdateLastname"
                @fieldValue="receivedLastname"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Birth Date"
                :value="db.currentUserBirthDate"
                :updateValue="handleUpdateBirthDate"
                @fieldValue="receivedBirthDate"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Address"
                :value="db.currentUserAddress"
                :updateValue="handleUpdateAddress"
                @fieldValue="receivedAddress"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Phone Number"
                :value="db.currentUserPhone"
                :updateValue="handleUpdatePhone"
                @fieldValue="receivedPhone"
                :closeEditingView="closeEditingView"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="px-0">
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
      <v-container class="my-2 d-flex justify-center border">
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
