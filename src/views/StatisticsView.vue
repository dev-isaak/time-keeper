<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import WeeklyHoursChart from '@/components/statistics/charts/WeeklyHoursChart.vue'
import ProjectHoursChart from '@/components/statistics/charts/ProjectHoursChart.vue'
import WeekTimeChart from '@/components/statistics/charts/WeekTimeChart.vue'
import MonthTimeChart from '@/components/statistics/charts/MonthTimeChart.vue'
import ProjectTimingsChart from '@/components/statistics/charts/ProjectTimingsChart.vue'
</script>

<template>
  <MainTemplate title="Statistics">
    <div class="d-flex justify-center flex-wrap">
      <WeekTimeChart />
      <MonthTimeChart />
    </div>
    <v-container class="d-flex flex-column flex-md-row justify-md-space-around">
      <!-- <div>
        <h2>Total hours per day</h2>
        <WeeklyHoursChart />
      </div> -->
      <div>
        <h2>Total hours per project</h2>
        <ProjectTimingsChart />
        <!-- <ProjectHoursChart /> -->
      </div>
    </v-container>
  </MainTemplate>
</template>
