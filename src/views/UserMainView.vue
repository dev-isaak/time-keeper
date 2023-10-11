<script setup>
  import MainTemplate from '@/templates/MainTemplate.vue'
  import { useAuthStore } from '@/stores/auth.js'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'

  const authStore = useAuthStore()

  const userName = computed(() => {
    return authStore.userName
  })


</script>

<template>
  <MainTemplate>
    <h1>Welcome back, {{ authStore.providedUserName || authStore.providedEmail }}</h1>
    <v-sheet v-if="userName === null || userName === ''" border rounded class="pa-4">
      <p>Set up your profile. Go to <router-link :to="{name: 'accountSettings'}">settings</router-link> </p>

    </v-sheet>
    <v-container>
      <p>You don't have any hour entered yet</p>
    </v-container>
  </MainTemplate>
</template>