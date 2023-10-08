import { useAuthStore } from "../stores/auth"

export default class Client {
  jwt
  constructor(){
    const authStore = useAuthStore()
    this.jwt = authStore.jwt
  }

  isLogedIn(){
    if (this.jwt) {
      console.log('jwt', this.jwt)
      return true
    }
    else {
      console.log('no hay jwt')
      return false
    }
  }
}