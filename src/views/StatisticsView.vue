<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import MonthlyHours from '@/components/statistics/MonthlyHours.vue'
import WeeklyHours from '@/components/statistics/WeeklyHours.vue'
import ProjectStatistics from '@/components/statistics/ProjectStatistics.vue'
// import WeeklyHoursChart from '@/components/statistics/charts/WeeklyHoursChart.vue'
import ProjectHoursChart from '@/components/statistics/charts/ProjectHoursChart.vue'
</script>

<template>
  <MainTemplate title="Statistics">
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
    <!-- <v-container>
      <WeeklyHoursChart />
    </v-container> -->
    <h2>Total hours per project</h2>
    <v-container>
      <ProjectHoursChart />
    </v-container>
    <!-- <ProjectStatistics /> -->
  </MainTemplate>
</template>
