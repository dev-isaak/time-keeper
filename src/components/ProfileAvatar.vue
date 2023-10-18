<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useFirestoreDB } from '@/stores/firestoreDB.js'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'

const authStore = useAuthStore()
const router = useRouter()
const db = useFirestoreDB()

defineProps({
	size: String,
	menu: Boolean,
})

const handleLogout = async() => {
   const isLogedOut = await authStore.logout()
   
   if (isLogedOut){
    router.push('/')
   }
  }

</script>

<template>
	<v-avatar color="blue-grey-lighten-1" v-if="!menu" :size="size">
			{{ db.initials }}
	</v-avatar>
  <v-container
	class="ma-0 pa-0 w-auto"
		v-else
  >
      <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              color="blue-grey-lighten-1"
              :size="size"
            >
              <span class="text-h5">{{ db.initials }}</span>
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
							<PrimaryButton text="Edit Account" variant="text" class="w-100" :to="{name: 'accountSettings'}" />
              <v-divider class="my-3"></v-divider>
              <PrimaryButton text="Disconnect" variant="text" class="w-100" @click="handleLogout" />
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
  </v-container>
</template>
