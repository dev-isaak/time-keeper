<script setup>
  import MainTemplate from '@/templates/MainTemplate.vue';
  import TimeZone from '@/components/settings/TimeZone.vue'
  import TimeInterval from '@/components/settings/TimeInterval.vue'
</script>

<template>
<MainTemplate>
  <h1>Settings</h1>
  <v-divider></v-divider>
  <v-container>
    <TimeZone />
  </v-container>
  <v-container>
    <TimeInterval />  
  </v-container>
</MainTemplate>

</template>