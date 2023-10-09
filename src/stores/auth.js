import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  deleteUser,
  updatePassword,
  updateProfile,
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
    }
  },
  getters: {},
  actions: {
    async userLogin(email, password) {
      const auth = getAuth()
      try {
          await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user
            // only can login if user verified his account
            if (user.emailVerified){
              this.jwt = user.accessToken
              this.userName = user.displayName
              this.userEmail = user.email
              this.userPhone = user.phoneNumber
              this.userPhoto = user.photoUrl
              this.isLoggedIn = true
              this.message = ''
            } else {
              this.message = 'The account email is not verified. Please, verify the account before login.'
              this.isLoggedIn = false
            }
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
            console.log("Email verification sent")
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
        console.log("logout")
        return true
      } catch (e) {
        console.error(e)
      }
    },
    async updateUserName(newName){
      const auth = getAuth();
      console.log(auth)
      updateProfile(auth.currentUser, {
        displayName: newName, 
      }).then(() => {
        this.message = 'Profile updated succesfully'
      }).catch((error) => {
        this.message = error
      });
    },
    async updateEmail(email) {
      const auth = getAuth()
      const user = auth.currentUser;
      const credential = () => {
        //pedir credenciales de alguna manera
        return user
      }
      //hay que reautenticar el user antes de cambiar el email
      //https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
      reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
      }).catch((error) => {
        this.message = error
      });
      
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
    },
    async updatePassword(newPassword){
      const auth = getAuth();

      const user = auth.currentUser;

      updatePassword(user, newPassword).then(() => {
        this.message = 'Password updated succesfully'
      }).catch((error) => {
        this.message = error
      });
    },
    async deleteAccount(){
      const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user).then(() => {
        this.message = 'User deleted succesfully'
      }).catch((error) => {
        this.message = error
      });
    }
  },
  persist: true
})
