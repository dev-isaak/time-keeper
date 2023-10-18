<script setup>
import LoginForm from '@/components/forms/LoginForm.vue'

const props = defineProps({
  openDialog: Boolean,
})

const handleReLogIn = (e) => {
  emits('isLogedIn', e)
}

const emits = defineEmits(['isLogedIn'])

</script>

<template>
  <v-dialog v-model="props.openDialog">
    <v-card>
      <LoginForm preventDefault @isLogedIn="handleReLogIn" />
    </v-card>
  </v-dialog>
</template>
