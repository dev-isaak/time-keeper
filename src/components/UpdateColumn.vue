<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { defineProps, ref } from 'vue';

const props = defineProps({
  handleActionButon: Function,
  label: String,
  loadingState: Boolean,
  message: String,
  fieldText: String
})

</script>

<template>
  //https://stackoverflow.com/questions/75123650/vue-3-internal-server-error-v-model-cannot-be-used-on-a-prop-because-local-pro
  <v-container class="my-4">
    <v-text-field class="mr-6" :modelValue="fieldText" @update:modelValue="fieldText = $event"></v-text-field>
    <v-sheet class="d-flex flex-column">
      {{ message }}
      <PrimaryButton text="Update" color="#90A4AE" @click="handleActionButon" width="100" :loading="loadingState"/>
    </v-sheet>
  </v-container>
</template>
