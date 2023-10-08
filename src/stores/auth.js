import { defineStore } from 'pinia'
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      jwt: null,
      userName: '',
      userEmail: '',
      userPhone: '',
      userPhoto: ''
    }
  },
  getters: {},
  actions: {
    async userLogin(email, password) {
      const auth = getAuth()
      try{
       await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          
          this.jwt = user.accessToken
          this.userName = user.displayName
          this.userEmail = user.email
          this.userPhone = user.phoneNumber
          this.userPhoto = user.photoUrl
        })
        return true
      }
      catch (e) {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode)
        console.error(errorMessage)
      }
    },
    async registerUser(email, password){
      const auth = getAuth()
      try{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          this.jwt = user.accessToken
          this.userName = user.displayName
          this.userEmail = user.email
          this.userPhone = user.phoneNumber
          // this.userPhoto = user.photoUrl
        })
        return true
      }
      catch (e) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode)
        console.error(errorMessage)
      }
    },
    async logout(){
      const auth = getAuth()
      try {
        await signOut(auth)
        this.jwt = null
        return true
      }
      catch (e){
        console.error(e)
      } 
    }
  },
  persist: true
})
