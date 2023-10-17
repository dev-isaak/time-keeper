import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { setDoc, getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main.js'

export const useFirestoreDB = defineStore('firestoreDB', {
  state: () => {
    return {
      userName: '',
      userLastname: '',
      userAddress: '',
      userPhone: '',
      userPhoto: ''
    }
  },
  getters: {
    currentUserName: (state) => state.userName,
    currentUserLastname: (state) => state.userLastname,
    currentUserAddress: (state) => state.userAddress,
    currentUserPhone: (state) => state.userPhone,
    currentUserPhoto: (state) => state.userPhoto
  },
  actions: {
    //https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
    async getUserData() {
      const auth = useAuthStore()
      const docRef = doc(db, 'users', auth.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.userName = docSnap.data().user_name
        this.userLastname = docSnap.data().user_lastname
        this.userAddress = docSnap.data().user_address
        this.userPhone = docSnap.data().user_phone
        this.Photo = docSnap.data().user_photo
        console.log('Document data:', docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }
    },
    async createUserTable() {
      const auth = useAuthStore()
      try {
        await setDoc(doc(db, 'users', auth.uid), {
          user_name: 'Your name here',
          user_lastname: 'Your last name here',
          user_phone: 'Your phone number here',
          user_photo: 'route-photo',
          user_address: 'Your address here'
        })
        console.log('Documento Creado')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async updateUserName(userName) {
      const auth = useAuthStore()
      const data = doc(db, 'users', auth.uid)

      await updateDoc(data, {
        user_name: userName
      })
      console.log('updated')
    }
  },
  persist: true
})
