<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import ChangePassword from '@/components/account-settings/ChangePassword.vue'
import ProfileSettings from '../components/account-settings/ProfileSettings.vue'
import DeleteAccount from '../components/account-settings/DeleteAccount.vue'
import SnackBar from '../components/SnackBar.vue'
</script>

<template>
  <MainTemplate title="Account Settings">
    <SnackBar />
    <ProfileSettings />
    <ChangePassword />
    <DeleteAccount />
  </MainTemplate>
</template>
