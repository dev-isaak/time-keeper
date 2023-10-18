<script setup>
import LoginForm from '@/components/forms/LoginForm.vue'
import MainTemplate from '@/templates/MainTemplate.vue'
</script>

<template>
  <MainTemplate>
    <v-container class="d-flex flex-column align-center">
      <LoginForm />
      <p>
        Don´t have an account yet?
        <RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
      </p>
      <p>
        Forgot your password?
        <RouterLink :to="{ name: 'recoveryPassword' }">Recovery</RouterLink>
      </p>
    </v-container>
  </MainTemplate>
</template>
