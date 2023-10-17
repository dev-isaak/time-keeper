import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWEX1Pjm1btrSEiodyXJfO89GiQXQG7S8",
  authDomain: "time-keeper-2ac5d.firebaseapp.com",
  projectId: "time-keeper-2ac5d",
  storageBucket: "time-keeper-2ac5d.appspot.com",
  messagingSenderId: "591286989751",
  appId: "1:591286989751:web:09166cbaeda785bd10ee32"
}

const firebase = initializeApp(firebaseConfig)

const app = createApp(App)
const pinia = createPinia()
const db = getFirestore(firebase)
pinia.use(piniaPluginPersistedstate)

app.use(firebase)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
