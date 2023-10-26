import { defineStore } from 'pinia'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../main'
import { useAuthStore } from './auth'

export const useFirebaseStorage = defineStore('firebaseStorage', {
  state: () => {
    return {
      imageURL: null
    }
  },
  getters: {
    currentImageURL: (state) => state.imageURL
  },
  actions: {
    async getProfileImage() {
      const auth = useAuthStore()
      const storageRef = ref(storage, `images/profile_photo_${auth.uid}`)
      await getDownloadURL(storageRef)
        .then((url) => {
          this.imageURL = url
        })
        .catch((e) => {
          this.imageURL = null
          console.error(e)
        })
    },
    async uploadProfileImage(file) {
      const auth = useAuthStore()
      const storageRef = ref(storage, `images/profile_photo_${auth.uid}`)
      try {
        await uploadBytes(storageRef, file[0]).then(() => {})
      } catch (e) {
        console.error(e)
      }
    },
    async deleteProfileImage() {
      const auth = useAuthStore()
      const storageRef = ref(storage, `images/profile_photo_${auth.uid}`)
      try {
        await deleteObject(storageRef)
      } catch (e) {
        console.error(e)
      }
    }
  }
})
