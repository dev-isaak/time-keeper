<script setup>
import { defineProps, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useFirestoreDB } from '@/stores/firestoreDB.js'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import { useFirebaseStorage } from '@/stores/firebaseStorage.js'

const authStore = useAuthStore()
const router = useRouter()
const db = useFirestoreDB()
const storage = useFirebaseStorage()

onBeforeMount(async () => {
  await storage.getProfileImage()
})

defineProps({
  size: String,
  menu: Boolean
})

const handleLogout = async () => {
  const isLogedOut = await authStore.logout()

  if (isLogedOut) {
    router.push('/')
  }
}
</script>

<template>
  <v-avatar class="border" color="secondary" v-if="!menu" :size="size">
    <v-img v-if="storage.currentImageURL !== null" :src="storage.currentImageURL" cover></v-img>
    <div v-else>
      {{ db.initials }}
    </div>
  </v-avatar>
  <v-container class="ma-0 pa-0 w-auto" v-else>
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="secondary" :size="size">
            <v-img v-if="storage.currentImageURL !== null" :src="storage.currentImageURL" cover></v-img>
            <div v-else>
              {{ db.initials }}
            </div>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <h3>{{ db.currentUserName }} {{ db.currentUserLastname }}</h3>
            <p class="text-caption mt-1">
              {{ authStore.providedEmail }}
            </p>
            <v-divider class="my-3"></v-divider>
            <PrimaryButton
              text="Settings"
              variant="text"
              class="w-100"
              :to="{ name: 'settings'}"
              />
              <v-divider class="my-3"></v-divider>
            <PrimaryButton
              text="Edit Account"
              variant="text"
              class="w-100"
              :to="{ name: 'accountSettings' }"
            />
            <v-divider class="my-3"></v-divider>
            <PrimaryButton text="Disconnect" variant="text" class="w-100" @click="handleLogout" />
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-container>
</template>
