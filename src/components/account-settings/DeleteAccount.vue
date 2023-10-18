<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import ReLogInDialog from '@/components/account-settings/ReLogInDialog.vue'
import SnackBar from '@/components/SnackBar.vue'
import { useFirestoreDB } from '@/stores/firestoreDB.js'

const authStore = useAuthStore()
const router = useRouter()
const db = useFirestoreDB()

const verifyEmailPhrase = ref('')
const loadingStateDelete = ref(false)
const dialog = ref(false)
const openSnackbar = ref(false)
const message = ref('')

const handleDeleteAccount = async () => {
  loadingStateDelete.value = true
  if (authStore.needReLogIn) {
    message.value = 'Re log in is needed'
    openSnackbar.value = true
    setTimeout(() => {
      openSnackBar.value = false
    }, 3000);
    dialog.value = true
  }
  
  const dbIsDeleted = await db.deleteUserDB()
  if (dbIsDeleted){
    await authStore.deleteAccount()
  }
  if (authStore.isAccountDeleted) {
    router.push({ name: 'login' })
  }
  loadingStateDelete.value = false
}
const handleReLogIn = (e) => {
	dialog.value = e
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackbar"/>
  <h3 class="mb-2 mt-10">Danger Zone</h3>
  <v-container class="mb-2 d-flex flex-wrap justify-center justify-md-start align-center border">
    <v-sheet class="pa-4 ma-4">
      <p>Are you sure you want to delete the account?</p>
      <p>If you delete the account, you won't be able to recover it in the future.</p>
    </v-sheet>
    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text="Delete Account" color="error"> </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="Delete Account">
          <v-card-text>
            <h4>To confirm, type "{{ authStore.providedEmail }}" in the box below</h4>
            <v-text-field v-model="verifyEmailPhrase" variant="underlined"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <PrimaryButton
              text="Delete Account"
              color="error"
              @click="handleDeleteAccount"
              :disabled="authStore.providedEmail === verifyEmailPhrase ? false : true"
              :loading="loadingStateDelete"
            />
            <PrimaryButton text="Close" @click="isActive.value = false" />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <ReLogInDialog :openDialog="dialog" @isLogedIn="handleReLogIn" />
  </v-container>
</template>
