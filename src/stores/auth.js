import { defineStore } from 'pinia'

import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  sendEmailVerification,
  deleteUser,
  updatePassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      jwt: null,
      userName: '',
      userEmail: '',
      userPhone: '',
      userPhoto: '',
      message: '',
      isLoggedIn: false,
      user:null,
    }
  },
  getters: {
    providedUserName: (state) => state.userName,
    currentUser: (state) => state.user
  },
  actions: {
    async userLogin(email, password) {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in
          const user = userCredential.user
          // only can login if user verified his account
          if (user.emailVerified) {
            this.user = user
            this.jwt = user.accessToken
            this.userName = user.displayName
            this.userEmail = user.email
            this.userPhone = user.phoneNumber
            this.userPhoto = user.photoUrl
            this.isLoggedIn = true
            this.message = ''
          } else {
            this.message =
              'The account email is not verified. Please, verify the account before login.'
            this.isLoggedIn = false
          }
          return true
        })
      } catch (e) {
        this.message = e
        console.log(e)
      }
    },
    async registerUser(email, password) {
      const auth = getAuth()
      try {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
          // Signed in
          sendEmailVerification(auth.currentUser).then(() => {
            console.log('Email verification sent')
          })
        })
        return true
      } catch (e) {
        console.log(e)
      }
    },
    async logout() {
      const auth = getAuth()
      try {
        await signOut(auth)
        this.jwt = null
        this.user= null
        
        return true
      } catch (e) {
        console.error(e)
      }
    },
    async updateUserName(newName) {
      const auth = getAuth()
      console.log(auth.currentUser)

      if (this.currentUser != null){
        //funciona pero al recargar página se pierde el token¿?
        //mirar la diferencia entre currenUser al iniciar sesion y al refrescar
        await updateProfile(this.currentUser, {
          displayName: newName
        })
          .then(() => {
            this.userName = newName
          })
          .catch((error) => {
            console.log(error)
            this.message = error
          })
          return true
      } else{
        console.log('user session expired')
      }
    },
    async updatePhoneUser(newPhoneNumber) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          updateProfile(user, {
            phoneNumber: newPhoneNumber
          })
            .then(() => {
              this.userPhone = newPhoneNumber
              setTimeout(() => {
                this.message = 'Phone number updated succesfully'
              }, 2000)
            })
            .catch((error) => {
              this.message = error
            })
        } else {
          this.message = 'No user logged in'
        }
      })
    },
    async updateEmail(email) {
      const auth = getAuth()
      const user = auth.currentUser
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateEmail(auth.currentUser, email)
            .then(() => {
              this.message = 'The email was updated succesfully!'
            })
            .catch((error) => {
              console.error(error)
              this.message = error
              // An error occurred
              // ...
            })
        } else {
        }
      })
    },
    async updatePassword(newPassword) {
      const auth = getAuth()

      const user = auth.currentUser

      updatePassword(user, newPassword)
        .then(() => {
          this.message = 'Password updated succesfully'
        })
        .catch((error) => {
          this.message = error
        })
    },
    async deleteAccount() {
      const auth = getAuth()
      const user = auth.currentUser

      deleteUser(user)
        .then(() => {
          this.message = 'User deleted succesfully'
        })
        .catch((error) => {
          this.message = error
        })
    }
  },
  persist: true
})
