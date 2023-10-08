<script setup>
import { ref } from 'vue'
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const name = ref('')
const lastname = ref('')
const email = ref('')
const emailRepeat = ref('')
const password = ref('')
const passwordRepeat = ref('')
</script>

<template>
  <MainTemplate>
    <v-container class="w-75 d-flex flex-column">
      <h1>Register</h1>
      <v-card class="my-6 pa-6">
        <form>
          <v-column class="d-flex">
            <v-text-field class="mx-2" label="Name" v-model="name"></v-text-field>
            <v-text-field class="mx-2" label="Lastname" v-model="lastname"></v-text-field>
          </v-column>
          <v-column class="d-flex">
            <v-text-field class="mx-2" label="Email" v-model="email"></v-text-field>
            <v-text-field class="mx-2" label="Repeat email" v-model="emailRepeat"></v-text-field>
          </v-column>
          <v-column class="d-flex">
            <v-text-field class="mx-2" label="Password" v-model="password"></v-text-field>
            <v-text-field
              class="mx-2"
              label="Repeat password"
              v-model="passwordRepeat"
            ></v-text-field>
          </v-column>
          <v-column class="d-flex flex-column align-center my-6">
            <PrimaryButton text="Register" />
          </v-column>
        </form>
      </v-card>
    </v-container>
  </MainTemplate>
</template>
