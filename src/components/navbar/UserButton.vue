<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { computed } from 'vue'
import AccountIcon from '@/components/icons/AccountIcon.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useRouter } from 'vue-router'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'

const authStore = useAuthStore()
const router = useRouter()

const isLogedIn = computed(() => {
  return authStore.jwt
})

const handleLogout = async() => {
   const isLogedOut = await authStore.logout()
   
   if (isLogedOut){
    router.push('/')
   }
  }

</script>

<template>
  
  <v-menu v-if="isLogedIn !== null">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
        <AccountIcon />
      </v-btn>
    </template>
      <v-list>
          <v-list-item>
            <PrimaryButton color="black" variant="plain" text="Settings" :to="{name: 'accountSettings'}">
            <SettingsIcon />
            </PrimaryButton>
          </v-list-item>
          <v-list-item>
            <PrimaryButton color="black" variant="plain" text="Logout" @click="handleLogout">
            <LogoutIcon />
            </PrimaryButton>
          </v-list-item>
    </v-list>
  </v-menu>
  <v-btn v-else :to="{name: 'login'}">
    <AccountIcon />
  </v-btn>
</template>
