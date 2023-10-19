<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  firstDay: 1,
  weekNumbers: true,
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style>
:root {
  --fc-border-color: rgba(69, 90, 100,.3);
  --fc-neutral-text-color: #808080;
  --fc-today-bg-color: #CFD8DC;
  --fc-highlight-color: red;
}
.fc-col-header{
  background-color: #CFD8DC;
}
.fc-col-header-cell a{
  color:#37474F ;
}
.fc-daygrid-day-number{
  color:#455A64;
}
</style>