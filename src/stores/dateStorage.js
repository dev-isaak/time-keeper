import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/main.js'

export const useDateStorage = defineStore('dateStorage', {
  state: () => {
    return {
      startingTime: '00:00',
      stoppingTime: '00:00',
      totalTime: '00:00',
    }
  },
  getters:{
    currentStartingTime: (state) => state.startingTime,
    currentStoppingTime: (state) => state.stoppingTime,
    currentTotalTime: (state) => state.totalTime
  },
  actions:{
    async getDailyHours(year, month, day){
      const auth = useAuthStore()
      const docRef = doc(db, `dates/${auth.currentUID}/${year}/${month}/${day}`, auth.currentUID)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.startingTime = docSnap.data().starting_time
        this.stoppingTime = docSnap.data().stopping_time
        this.totalTime = docSnap.data().total_time
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }
    },
    async postDailyHours(date, year, month, day, startingTime){
      const auth = useAuthStore()
      try {
        await setDoc(doc(db, `dates/${auth.currentUID}/${year}/${month}/${day}`, auth.currentUID), {
          date: date,
          month: month,
          year: year,
          starting_time: startingTime,
        })
        console.log('tiempos creados')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async postStoppingTime(year, month, day, stoppingTime, totalTime) {
      const auth = useAuthStore()
      const data = doc(db, `dates/${auth.currentUID}/${year}/${month}/${day}`, auth.currentUID)
      try{
        await updateDoc(data, {
          stopping_time: stoppingTime,
          total_time: totalTime
        })
        console.log('tiempos actualizados')
      } catch (e){
        console.error(e)
      }
    },
  }
})