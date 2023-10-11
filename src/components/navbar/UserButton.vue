<script setup>
import { useAuthStore } from '@/stores/auth.js'
import AccountIcon from '@/components/icons/AccountIcon.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useRouter } from 'vue-router'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'

const authStore = useAuthStore()
const router = useRouter()



const handleLogout = async() => {
   const isLogedOut = await authStore.logout()
   
   if (isLogedOut){
    router.push('/')
   }
  }

</script>

<template>
  
  <v-menu>
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
</template>
