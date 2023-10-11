<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth.js';
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()

const emailProvided = ref('')
const loading = ref(false)

onMounted(() => {
  authStore.errorMessage = ''
  authStore.message = ''
})

const handlePasswordRecovery = async() => {
  loading.value = true
  authStore.errorMessage = ''
  const res = await authStore.passwordRecovery(emailProvided.value)
  if (res){
    loading.value = false
  }
}

</script>

<template>
  <h2 class="mb-4">Send email for password recovery</h2>
<form>
<v-text-field label="Email" v-model="emailProvided"></v-text-field>
<v-column class="d-flex flex-column">
  <p :class=" authStore.errorMessage ? 'text-error' : 'text-success'">
    {{ authStore.errorMessage || authStore.message }}
  </p>
  <PrimaryButton color="#90A4AE" text="Send email" @click="handlePasswordRecovery" :loading="loading"></PrimaryButton>
</v-column>
</form>

</template>