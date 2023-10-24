<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import MonthlyHours from '@/components/statistics/MonthlyHours.vue'
import WeeklyHours from '@/components/statistics/WeeklyHours.vue'
</script>

<template>
<MainTemplate>
  <h1>Statistics</h1>
  <v-container>
    <v-row>
      <v-col align="center">
        <WeeklyHours />
      </v-col>
      <v-col align="center">
        <MonthlyHours />
      </v-col>
    </v-row>
  </v-container>
</MainTemplate>
</template>