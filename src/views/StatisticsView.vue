<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import MonthlyHours from '@/components/statistics/MonthlyHours.vue'
import WeeklyHours from '@/components/statistics/WeeklyHours.vue'
import WeeklyHoursChart from '@/components/statistics/charts/WeeklyHoursChart.vue'
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
    <v-container class="d-flex flex-column flex-md-row justify-md-space-around">
      <!-- <div>
        <h2>Total hours per day</h2>
        <WeeklyHoursChart />
      </div> -->
      <div>
        <h2>Total hours per project</h2>
        <ProjectHoursChart />
      </div>
    </v-container>
  </MainTemplate>
</template>
