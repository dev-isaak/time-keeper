import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#315775',
          secondary: '#718696',
          tertiary: '#EBB463',
          dark: '#333333',
          success: '#82DD55',
          error: '#E23636'
        }
      }
    }
  },
  defaults: {
    PrimaryButton: {
      color: 'tertiary',
      style: 'color:white;'
    },
    VProgressCircular: {
      color: 'secondary'
    },
    VProgressLinear: {
      color: 'primary'
    },
    VList: {
      color: 'primary'
    },
    WeeklyHoursChart: {
      backgroundColor: '#718696'
    },
    ProjectHoursChart: {
      backgroundColor: '#718696'
    }
  }
})

//Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWEX1Pjm1btrSEiodyXJfO89GiQXQG7S8',
  authDomain: 'time-keeper-2ac5d.firebaseapp.com',
  projectId: 'time-keeper-2ac5d',
  storageBucket: 'time-keeper-2ac5d.appspot.com',
  messagingSenderId: '591286989751',
  appId: '1:591286989751:web:09166cbaeda785bd10ee32'
}

const firebase = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase)
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebase)
export { db, storage }

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(firebase)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
