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
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      jwt: null,
      userName: '',
      userEmail: '',
      userPhoto: '',
      message: '',
      errorMessage: '',
      isLoggedIn: false,
      user: null
    }
  },
  getters: {
    providedUserName: (state) => state.userName,
    providedEmail: (state) => state.userEmail,
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
            this.errorMessage = ''
          } else {
            this.errorMessage =
              'The email account is not verified yet. Please, verify it before continue.'
          }
        })
        return true
      } catch (error) {
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/invalid-login-credentials'
        ) {
          this.errorMessage = 'The user or password is invalid.'
        } else if (error.code === 'auth/user-disabled') {
          this.errorMessage = 'Your account is disabled.'
        } else {
          this.errorMessage = 'Something wrong happened.'
        }
      }
    },
    async userStatus() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          this.user = user
        } else {
          // User is signed out
          // ...
          console.log(user)
          this.user = null
          this.jwt = null
        }
      })
    },
    async registerUser(email, password) {
      const auth = getAuth()
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
          // Signed in
          sendEmailVerification(auth.currentUser).then(() => {
            this.errorMessage = ''
          })
        })
        return true
      } catch (error) {
        console.log(error.code)
        if (error.code == 'auth/missing-password') {
          this.errorMessage = 'Password must be provided.'
        } else if (error.code === 'auth/weak-password') {
          this.errorMessage = 'Password must have at least 6 characters.'
        } else if (error.code === 'auth/invalid-email') {
          this.errorMessage = 'Email format is wrong.'
        } else if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'The email provided is already in use.'
        } else {
          this.errorMessage = 'Something wrong happened.'
        }
        return false
      }
    },
    async logout() {
      const auth = getAuth()
      try {
        await signOut(auth)
        this.jwt = null
        this.user = null

        return true
      } catch (e) {
        console.error(e)
      }
    },
    async updateUserName(newName) {
      if (this.currentUser != null) {
        await updateProfile(this.currentUser, {
          displayName: newName
        })
          .then(() => {
            this.userName = newName
          })
          .catch((error) => {
            this.message = error
          })
        return true
      } else {
        console.log('user session expired')
      }
    },
    async updateEmail(newEmail) {
      if (this.currentUser != null) {
        updateEmail(this.currentUser, newEmail)
          .then(() => {
            console.log('email updated')
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error)
          })
        return true
      } else {
        console.log('user session expired')
      }
    },
    async updatePassword(newPassword) {
      if (this.currentUser != null) {
        updatePassword(this.currentUser, newPassword)
          .then(() => {
            this.message = 'Password updated succesfully'
          })
          .catch((error) => {
            this.message = error
          })
      } else {
        console.log('user session expired')
      }
    },
    async passwordRecovery(email) {
      const auth = getAuth()
      sendPasswordResetEmail(auth, email)
        .then(() => {
          this.message = 'Email sent.'
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          if (error.code === 'auth/invalid-email'){
            this.errorMessage = 'Email not found.'
          }
          console.log(errorCode, errorMessage)
        })
        return true
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
