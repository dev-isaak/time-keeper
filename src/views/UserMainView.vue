<script setup>
  import MainTemplate from '@/templates/MainTemplate.vue'
  import { useAuthStore } from '@/stores/auth.js'
  import { onMounted } from 'vue';
  import { ref } from 'vue'

  const authStore = useAuthStore()

  const email = ref('')

  onMounted(() => {
    email.value = authStore.userEmail
  })

</script>

<template>
  <MainTemplate>
    <h1>Welcome back, {{ email }}</h1>
    <v-container>
      <p>You don't have any hour entered yet</p>
    </v-container>
  </MainTemplate>
</template>