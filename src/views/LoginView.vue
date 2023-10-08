<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const email = ref('')
const password = ref('')

</script>

<template>
  <MainTemplate>
  <v-container class="w-75 d-flex flex-column">
  <h1>This is login</h1>
  <v-card class="my-6 pa-6">
    <form>
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="Password" v-model="password"></v-text-field>
      <v-column class="d-flex flex-column align-center my-6">
        <PrimaryButton text="Login" />
        <p class="mt-6">Don´t have an account yet?
          <RouterLink :to="{name: 'register'}">Register</RouterLink>
        </p>
        <p>Forgot your password? 
          <RouterLink to="#">Recovery</RouterLink>
        </p>
      </v-column>
    </form>
  </v-card>
</v-container>
</MainTemplate>
</template>