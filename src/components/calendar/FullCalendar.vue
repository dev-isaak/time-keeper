<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useDateStorage } from '@/stores/dateStorage.js'
import { onMounted } from 'vue'

const dateStorage = useDateStorage()

onMounted(async () => {
  await dateStorage.getDailyHours(2023, 10, 22)
})

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  firstDay: 1,
  weekNumbers: true,
  events: [
    { title: 'Some', start: new Date()}
  ]
}

</script>
<template>
  <v-container class="w-100 d-flex d-sm-block justify-center">
    <FullCalendar :options="calendarOptions" />
  </v-container>
</template>

<style>
:root {
  --fc-border-color: rgba(69, 90, 100, 0.3);
  --fc-neutral-text-color: #808080;
  --fc-today-bg-color: #cfd8dc;
  --fc-highlight-color: red;
}
.fc-col-header {
  background-color: #cfd8dc;
}
.fc-col-header-cell a {
  color: #37474f;
}
.fc-daygrid-day-number {
  color: #455a64;
}
.fc-header-toolbar {
  max-width: 700px;
}
.fc-header-toolbar .fc-toolbar-chunk {
  display: flex;
  justify-content: end;
}
.fc-view-harness {
  max-width: 700px;
  height: 430px !important;
}
.fc-next-button,
.fc-prev-button {
  padding: 0 0.5em 0.5em 0.5em !important;
  margin: 0 0.1em !important;
}
</style>
