<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue';
</script>

<template>
<h3>Select time zone</h3>
<form>
  <v-select label="Select time zone" :items="[]"></v-select>
  <PrimaryButton text="Update" color=""></PrimaryButton>
</form>
</template>