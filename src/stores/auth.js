import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
      user: null,
      passwordUpdated: false,
      emailUpdated: false,
      accountDeleted: false,
      reLogIn: false,
    }
  },
  getters: {
    providedUserName: (state) => state.userName,
    providedEmail: (state) => state.userEmail,
    currentUser: (state) => state.user,
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
            this.userName = user.displayName
            this.userEmail = user.email
            this.userPhone = user.phoneNumber
            this.userPhoto = user.photoUrl
            this.isLoggedIn = true
            this.errorMessage = ''
            this.reLogIn = false
            this.accountDeleted = false
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
          this.reLogIn = false
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
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
          // Signed in
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
    async updatePassword(newPassword) {
      if (this.currentUser != null) {
        await updatePassword(this.currentUser, newPassword)
          .then(() => {
            this.passwordUpdated = true
          })
          .catch((error) => {
            if (error.code === 'auth/requires-recent-login'){
              this.reLogIn = true
            }
            else if (error.code === 'auth/weak-password'){
              this.errorMessage = 'Password must be at least 6 characters'
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
