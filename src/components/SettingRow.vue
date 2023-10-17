<script setup>
import { defineProps, ref } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import UpdateIcon from '@/components/icons/UpdateIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'
const props = defineProps({
  title: String,
  value: String,
  updateValue: Function,
})

const isEditing = ref(false)
</script>

<template>
  <v-container class="d-flex align-center ma-4">
    <h4>{{ title }}</h4>
    <p class="mx-10" v-if="isEditing === false">{{ value }}</p>
    <v-sheet v-else width="400" class="ma-0 pa-0 mx-10">
      <v-text-field variant="underlined"  label="Value"></v-text-field>
    </v-sheet>
    <PrimaryButton v-if="isEditing === false" variant="plain" @click="isEditing = true">
      <UpdateIcon />
    </PrimaryButton>
    <v-container v-else class="ma-0 pa-0">
      <PrimaryButton variant="plain" @click="updateValue">
        <CheckIcon />
      </PrimaryButton>
      <PrimaryButton variant="plain" @click="isEditing = false">
        <CloseIcon />
      </PrimaryButton>
    </v-container>
  </v-container>
</template>
