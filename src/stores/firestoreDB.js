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
      userPhoto: '',
      userBirthDate:'',
      userNameUpdated: false,
      userLastnameUpdated: false,
      userAddressUpdated: false,
      userPhoneUpdated: false,
      userBirthDateUpdated: false,
    }
  },
  getters: {
    currentUserName: (state) => state.userName.toUpperCase(),
    currentUserLastname: (state) => state.userLastname.toUpperCase(),
    currentUserAddress: (state) => state.userAddress.toUpperCase(),
    currentUserPhone: (state) => state.userPhone,
    currentUserPhoto: (state) => state.userPhoto,
    currentUserBirthDate: (state) => state.userBirthDate,
    isUserNameUpdated: (state) => state.userNameUpdated,
    isUserLastnameUpdated: (state) => state.userLastnameUpdated,
    isUserAddressUpdated: (state) => state.userAddressUpdated,
    isUserPhoneUpdated: (state) => state.userPhoneUpdated,
    isUserBirthDateUpdated: (state) => state.userBirthDateUpdated,
    initials: (state) => {
      return state.userName.charAt(0).toUpperCase() + state.userLastname.charAt(0).toUpperCase()
    }
  },
  actions: {
    //https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
    async getUserData() {
      const auth = useAuthStore()
      
      const docRef = doc(db, 'users', auth.currentUID)
      const docSnap = await getDoc(docRef)
      console.log(docSnap.data())
      if (docSnap.exists()) {
        this.userName = docSnap.data().user_name
        this.userLastname = docSnap.data().user_lastname
        this.userAddress = docSnap.data().user_address
        this.userPhone = docSnap.data().user_phone
        this.userBirthDate = docSnap.data().user_birth_date
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
        await setDoc(doc(db, 'users', auth.currentUID), {
          user_name: 'Your name here',
          user_lastname: 'Your last name here',
          user_birth_date: 'Your birth date here',
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
      const data = doc(db, 'users', auth.currentUID)
      try{
        await updateDoc(data, {
          user_name: userName
        })
        this.userNameUpdated = true
        this.userName = userName
      } catch (e){
        console.error(e)
      }
    },
    async updateUserLastname(lastName) {
      const auth = useAuthStore()
      const data = doc(db, 'users', auth.currentUID)
      try{
        await updateDoc(data, {
          user_lastname: lastName
        })
        this.userLastnameUpdated = true
        this.userLastname = lastName
      } catch(e){
        console.error(e)
      }
    },
    async updateUserBirthDate(birthDate) {
      const auth = useAuthStore()
      const data = doc(db, 'users', auth.currentUID)
      try{
        await updateDoc(data, {
          user_birth_date: birthDate
        })
        this.userBirthDateUpdated = true
        this.userBirthDate = birthDate
      } catch(e){
        console.error(e)
      }
    },
    async updateUserAddress(address) {
      const auth = useAuthStore()
      const data = doc(db, 'users', auth.currentUID)
      try{
        await updateDoc(data, {
          user_address: address
        })
        this.userAddressUpdated = true
        this.userAddress = address
      } catch(e){
        console.error(e)
      }
    },
    async updateUserPhone(phone) {
      const auth = useAuthStore()
      const data = doc(db, 'users', auth.currentUID)
      try{
        await updateDoc(data, {
          user_phone: phone
        })
        this.userPhoneUpdated = true
        this.userPhone = phone
      } catch(e){
        console.error(e)
      }

    },
  },
  persist: true
})
