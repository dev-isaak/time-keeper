<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import MainTemplate from '@/templates/MainTemplate.vue';

</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
  <h1>Account Settings</h1>
  <v-divider class="my-10"></v-divider>
  <h3>Update Email</h3>
  <v-container>
    <form>
      <v-text-field label="Email"></v-text-field>
      <v-text-field label="Repeat email"></v-text-field>
      <v-container class="d-flex justify-center">
        <PrimaryButton text="Update email" color="var(--primary-color)"/>
      </v-container>
    </form>
  </v-container>
  <v-divider></v-divider>
  <h3>Change Password</h3>
  <v-container>
    <form>
      <v-text-field type="password" label="Password"></v-text-field>
      <v-text-field type="password" label="Repeat Password"></v-text-field>
    </form>
    <v-container class="d-flex justify-center">
        <PrimaryButton text="Update Password" color="var(--primary-color)"/>
      </v-container>
  </v-container>
  <v-divider></v-divider>
  <h3>Delete Account</h3>
  <v-container>
    <p>Are you sure you want to delete the account?</p>
    <p>If you delete the account, you won't be able to recovery anything related to it.</p>

    <PrimaryButton class="mt-4" color="error" text="Delete account" />
  </v-container>
</MainTemplate>
</template>