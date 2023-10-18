<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import ReLogInDialog from '@/components/account-settings/ReLogInDialog.vue'

const authStore = useAuthStore()
const router = useRouter()

const verifyEmailPhrase = ref('')
const loadingStateDelete = ref(false)
const dialog = ref(false)

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
</script>

<template>
  <h3 class="mb-2 mt-10">Danger Zone</h3>
  <v-container class="mb-2 d-flex justify-center border">
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
    <ReLogInDialog :openDialog="dialog"/>
  </v-container>
</template>
