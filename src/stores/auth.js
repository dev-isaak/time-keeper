import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      jwt: null,
      uid: null,
      userEmail: '',
      message: '',
      errorMessage: '',
      isLoggedIn: false,
      user: null,
      passwordUpdated: false,
      emailUpdated: false,
      accountDeleted: false,
      reLogIn: false,
    }
  },
  getters: {
    providedEmail: (state) => state.userEmail,
    currentUser: (state) => state.user,
    currentUID: (state) => state.uid,
    isPasswordUpdated: (state) => state.passwordUpdated,
    isEmailUpdated: (state) => state.emailUpdated,
    isAccountDeleted: (state) => state.accountDeleted,
    needReLogIn: (state) => state.reLogIn,
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
            this.userEmail = user.email
            this.isLoggedIn = true
            this.errorMessage = ''
            this.reLogIn = false
            this.accountDeleted = false
            this.uid = user.uid
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
          this.user = user
        } else {
          // User is signed out
          // ...
          this.user = null
          this.jwt = null
          this.reLogIn = true
        }
      })
    },
    async registerUser(email, password) {
      const auth = getAuth()
      try {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in
          this.userEmail = email
          this.uid = userCredential.user.uid
          sendEmailVerification(auth.currentUser).then(() => {
            this.errorMessage = ''
          })
        })
        return true
      } catch (error) {
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
        this.uid = null
        return true
      } catch (e) {
        console.error(e)
      }
    },
    async updatePassword(newPassword) {
      if (this.currentUser != null) {
        await updatePassword(this.currentUser, newPassword)
          .then(() => {
            this.passwordUpdated = true
            this.reLogIn = false
            
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login'){
              this.errorMessage = 'Need to re-login again'
              this.reLogIn = true
            }
            else if (error.code === 'auth/weak-password'){
              this.errorMessage = 'Password must be at least 6 characters'
              this.reLogIn = false
            }
            this.passwordUpdated = false
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
          if (error.code === 'auth/invalid-email'){
            this.errorMessage = 'Email not found.'
          }
        })
        return true
    },
    async deleteAccount() {
      if (this.currentUser != null){
        await deleteUser(this.currentUser)
        .then(() => {
          this.accountDeleted = true
          this.reLogIn = false
        })
        .catch((error) => {
          console.log(error)
          this.accountDeleted = false
          if (error.code === 'auth/requires-recent-login'){
            this.reLogIn = true
          }
          this.message = error
        })
      }
    }
  },
  persist: true
})
