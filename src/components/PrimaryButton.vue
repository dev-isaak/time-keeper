<script setup>
import { defineProps } from 'vue'
import { useDefaults } from 'vuetify'

const _props = defineProps({
  text: String,
  color: String,
  loadingState: Boolean,
  variant: String, 
  icon: Boolean,
  styles: String
})

const props = useDefaults(_props, 'PrimaryButton')

</script>

<template>
  <v-btn :style="props.styles" :variant="variant" :color="props.color" :loading="loadingState">
    {{ text }}
    <v-icon v-if="icon">
      <slot></slot>
    </v-icon>
  </v-btn>
</template>