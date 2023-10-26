<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useFirebaseStorage } from '@/stores/firebaseStorage.js'
import { ref } from 'vue'
import PaperClipIcon from '@/components/icons/PaperClipIcon.vue'
import SnackBar from '@/components/SnackBar.vue'

const storage = useFirebaseStorage()

const loadingState = ref(false)
const loadingStateDeleteButton = ref(false)
const fileUploaded = ref()
const openSnackBar = ref(false)
const message = ref('')
const errorMessage = ref(false)

const handleUploadImage = async () => {
  loadingState.value = true
  await storage.uploadProfileImage(fileUploaded.value)
  loadingState.value = false
  message.value = 'File uploaded successfully.'
  await storage.getProfileImage()
  openSnackBar.value = true
  setTimeout(() => {
    openSnackBar.value = false
  }, 3000)
}

const handleDeleteImage = async () => {
  loadingStateDeleteButton.value = true
  await storage.deleteProfileImage()
  loadingStateDeleteButton.value = false
  message.value = 'File deleted successfully.'
  await storage.getProfileImage()
  openSnackBar.value = true
  setTimeout(() => {
    openSnackBar.value = false
  }, 3000)
}
</script>

<template>
  <SnackBar :text="message" :openSnackbar="openSnackBar" :error="errorMessage ? true : false" />
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <PrimaryButton v-bind="props" text="Edit" />
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Upload Profile Photo">
        <v-card-text class="d-flex flex-column align-center">
          <v-img class="my-4" :src="storage.currentImageURL" width="200"></v-img>
          <div class="w-100 mt-4">
            <v-file-input prepend-icon="" label="Upload File" v-model="fileUploaded">
              <template v-slot:prepend-inner>
                <PaperClipIcon color="grey" />
              </template>
            </v-file-input>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <PrimaryButton
            text="Delete"
            :loading="loadingStateDeleteButton"
            @click="handleDeleteImage"
            color="error"
          />
          <PrimaryButton text="Upload" :loading="loadingState" @click="handleUploadImage" />
          <PrimaryButton text="Close" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
