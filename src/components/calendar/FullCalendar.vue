<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useDateStorage } from '@/stores/dateStorage.js'
import { onBeforeMount, ref } from 'vue';
import StartIcon from '@/components/icons/StartIcon.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';

const dateStorage = useDateStorage()
 const calendarEvents = ref([])
 const overlay = ref(false)
 const eventOverlay = ref(false)
 const eventTitle = ref('')
 const eventStart = ref()
 const eventStop = ref()
 const eventTotal = ref()
 const eventNotes = ref('')

onBeforeMount(async () => {
  overlay.value = true
  const date = new Date()
  await dateStorage.getDailyHours(date.getFullYear(), date.getMonth()+1, date.getDate())
  await dateStorage.getAllEvents(date.getFullYear())
  dateStorage.currentAllProjects.forEach(project => {
    calendarEvents.value.push({
      title: project.project,
      start: `${project.year}-${project.month}-${project.day}`,
      end: `${project.year}-${project.month}-${project.day}`,
      notes: `${project.notes}`,
      start_time: `${project.starting_time}`,
      stopping_time: `${project.stopping_time}`,
      total_time: `${project.total_time}`
    })
  })  
  overlay.value = false
})
const handleEventClick = (info) => {
  eventOverlay.value = true
  eventTitle.value = info.event.title
  eventStart.value = info.event.extendedProps.start_time
  eventStop.value = info.event.extendedProps.stopping_time
  eventTotal.value = info.event.extendedProps.total_time
  eventNotes.value = info.event.extendedProps.notes
}
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  firstDay: 1,
  dayMaxEventRows: true,
  views: {
    timeGrid: {
      dayMaxEventRows : 3,
  },
  },
  //weekNumbers: true,
  eventClick: handleEventClick,
  events: calendarEvents.value,
}


</script>
<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="#546E7A" indeterminate size="64"></v-progress-circular>
  </v-overlay>
  <div v-if="overlay === false">
  <v-container class="w-100 d-flex d-sm-block justify-center">
    <FullCalendar :options="calendarOptions" >
      <template v-slot:eventContent='calendarEvents'>
      <b>{{ calendarEvents.event.title }}</b>
    </template>
    </FullCalendar>
  </v-container>
  </div>
  <v-overlay v-model="eventOverlay" class="d-flex justify-center align-center">
    <v-sheet v-if="eventOverlay" class="pa-6" min-width="300" style="z-index:1000;">
      <h2>{{ eventTitle }}</h2>
      <v-divider class="mb-4"></v-divider>
      <div class="d-flex justify-space-between">
        <p class="font-weight-bold">Start time:</p>
        <p>{{ eventStart }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <p class="font-weight-bold">Stop time:</p>
        <p>{{ eventStop }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <p class="font-weight-bold">Total time:</p>
        <p>{{ eventTotal }}</p>
      </div>
      <div>
        <p class="font-weight-bold">Notes</p>
        <v-sheet class="pa-4" color="#f5f5f5">
          <p>{{ eventNotes }}</p>
        </v-sheet>
      </div>
      <div class="text-center mt-4">
        <PrimaryButton text="Close" @click="eventOverlay = !eventOverlay" />
      </div>
    </v-sheet>
  </v-overlay>
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
  max-width: 100%;
  height: 430px !important;
  height: 100vh !important;
}
.fc-next-button,
.fc-prev-button {
  padding: 0 0.5em 0.5em 0.5em !important;
  margin: 0 0.1em !important;
}
.fc-daygrid-event{
  background-color: #37474f;
  border:none;
  padding: .1em .4em;
  cursor:pointer;
  transition: all 300ms;
}
.fc-daygrid-event:hover{
  background-color: #cfd8dc;
}
</style>
