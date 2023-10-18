<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import ChangePassword from '@/components/account-settings/ChangePassword.vue'
import ProfileSettings from '../components/account-settings/ProfileSettings.vue'
import DeleteAccount from '../components/account-settings/DeleteAccount.vue'
import SnackBar from '../components/SnackBar.vue'
</script>

<template>
  <!-- CAMBIAR TEMPLATE -->
  <MainTemplate>
    <SnackBar />
    <h1>Account Settings</h1>
    <v-divider class="mb-5"></v-divider>
    <ProfileSettings />
    <ChangePassword />
    <DeleteAccount />
  </MainTemplate>
</template>
