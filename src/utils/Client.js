import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default class Client {
  auth
  jwt = null
  uid = null
  userName = 'bro'
  emailVerified = false
  user

  constructor() {
    this.auth = getAuth()
  }

  getUser() {
    console.log('hola', this.userName)
    return this.user
  }
}
