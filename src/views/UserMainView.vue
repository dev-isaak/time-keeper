<script setup>
  import MainTemplate from '@/templates/MainTemplate.vue'
  import { useAuthStore } from '@/stores/auth.js'
  import { computed, onBeforeMount } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useFirestoreDB } from '../stores/firestoreDB'

  const authStore = useAuthStore()
  const db = useFirestoreDB()

  const userName = computed(() => {
    return authStore.userName
  })
  onBeforeMount(async () => {
  await db.getUserData()
})

</script>

<template>
  <MainTemplate>
    <h1>Welcome back, {{ db.currentUserName|| authStore.providedEmail }}</h1>
    //Steps to finish set up profile
    <v-sheet v-if="userName === null || userName === ''" border-md rounded class="pa-4">
      <p>Set up your profile. Go to <router-link :to="{name: 'accountSettings'}">settings</router-link> </p>

    </v-sheet>
    <v-container>
      <p>You don't have any hour entered yet</p>
    </v-container>
  </MainTemplate>
</template>