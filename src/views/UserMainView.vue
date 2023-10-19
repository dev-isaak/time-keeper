<script setup>
  import MainTemplate from '@/templates/MainTemplate.vue'
  import { onBeforeMount } from 'vue'
  import { useFirestoreDB } from '../stores/firestoreDB'
  import FullCalendar from '../components/calendar/FullCalendar.vue'
  import TimingControls from '../components/timing/TimingControls.vue'

  const db = useFirestoreDB()

  onBeforeMount(async () => {
  await db.getUserData()
})

</script>

<template>
  <MainTemplate>
    <TimingControls />
    <v-container>
      <FullCalendar />
    </v-container>
  </MainTemplate>
</template>