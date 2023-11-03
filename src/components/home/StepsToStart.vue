<script setup>
import { ref } from 'vue'
import personalData from '@/data/personalProcedure.json'
import companyData from '@/data/companyProcedure.json'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const isCompany = ref(false)

</script>


<template>
  <v-switch class="selector pt-10" :label="isCompany ? 'Company' : 'Personal Use'" label="Company" v-model="isCompany" color="primary" />
<v-container class="d-flex flex-column bg-primary align-center pa-6 mb-6">
  <h2 class="text-white text-center mb-4">How to start?</h2>
<!-- Process when 'I'm a compay' is selected -->
<v-row v-if="isCompany" class="d-flex flex-column flex-md-row justify-center w-100" min-width="340">
  <v-column v-for="data in companyData" :key="data.id">
    <v-sheet class="pa-4 ma-4 rounded-lg"  elevation="1">
    <h3 class="text-center mb-1 text-dark">{{ data.title }}</h3>
    <v-divider class="mb-3"></v-divider>
    <p>{{ data.description }}</p>
    </v-sheet>
  </v-column>
</v-row>
<!-- Process when 'I'm a compay' is NOT selected -->
<v-row v-else class="d-flex flex-column flex-md-row justify-center w-100"  min-width="340">
  <v-column v-for="data in personalData" :key="data.id">
    <v-sheet class="pa-4 ma-4 rounded-lg"  elevation="1">
    <h3 class="text-center mb-1 text-dark">{{ data.title }}</h3>
    <v-divider class="mb-3"></v-divider>
    <p>{{ data.description }}</p>
    </v-sheet>
  </v-column>
</v-row>
</v-container>

</template>

<style scoped>
.selector{
  width:auto ;
  display: flex ;
  justify-content: center ;
}
</style>