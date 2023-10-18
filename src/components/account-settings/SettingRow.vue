<script setup>
import { defineProps, defineEmits, ref, onUpdated } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import UpdateIcon from '@/components/icons/UpdateIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

const props = defineProps({
  title: String,
  value: String,
  updateValue: Function,
  closeEditingView: Boolean,
  loading: Boolean,
})

defineEmits(['fieldValue'])

const valueEntered = ref()

const isEditing = ref(false)

const handleCloseEditingView = () => {
  isEditing.value = false
}
onUpdated(() => {
  if(props.closeEditingView){
    isEditing.value = false
    valueEntered.value = null
    //Agregar fondo de color verde durante X tiempo
    setTimeout(() => {
      //
    }, 3000);
  }
})
</script>

<template>
  <v-sheet class="my-4 mx-lg-4 pa-4" border width="450">
    <h4 class="mb-2">{{ title }}</h4>
    <v-sheet  width="400" color="transparent" class="w-100 d-flex align-center justify-space-between ma-0 pa-0 bg-transparent">
      <p v-if="isEditing === false">{{ value }}</p>
      <v-container class=" w-100" v-else>
        <v-text-field variant="underlined"  label="Value" v-model="valueEntered" @update:modelValue="$emit('fieldValue',valueEntered )"></v-text-field>
      </v-container>
      <PrimaryButton v-if="isEditing === false" variant="plain" @click="isEditing = true">
        <UpdateIcon />
      </PrimaryButton>
      <v-container v-else class="ma-0 pa-0 w-auto">
        <PrimaryButton variant="plain" @click="updateValue">
          <CheckIcon />
        </PrimaryButton>
        <PrimaryButton variant="plain" @click="handleCloseEditingView">
          <CloseIcon />
        </PrimaryButton>
      </v-container>
    </v-sheet>
    <v-progress-linear v-if="loading"  color="blue-grey-lighten-2" indeterminate></v-progress-linear>
    </v-sheet>
</template>
