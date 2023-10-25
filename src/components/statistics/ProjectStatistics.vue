<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStatisticsStorage } from '@/stores/statisticsStorage.js'
import { useProjectsStorage } from '@/stores/projectsStorage.js'

const statisticsStorage = useStatisticsStorage()
const projectsStorage = useProjectsStorage()

onBeforeMount(async() => {
  await projectsStorage.getProjects()
})

const projectName = ref('')
const loadingProject = ref(false)

const projectPercent = computed(() => {
  return statisticsStorage.currentTotalProjectsTime / 1000000
})

const handleSearchProject = async() =>{
  loadingProject.value = true
  await statisticsStorage.getHoursPerProject(projectName.value)
  loadingProject.value = false
}

</script>


<template>

  <h3 class="mb-4">Project total time</h3>
  <v-select label="Select Project" v-model="projectName" :items="projectsStorage.currentCustomerProjects" @update:modelValue="handleSearchProject"></v-select>
  <div class="d-flex align-center">
  <h3>{{projectPercent ? `${statisticsStorage.currentTotalProjectsTimeMs}` : ''}}</h3>
  <v-progress-circular
      v-if="loadingProject"
      indeterminate
      size="20"
      width="2"
      class="ml-4"
    ></v-progress-circular>
  </div>
  <v-progress-linear class="my-4" v-model="projectPercent"></v-progress-linear>
</template>