import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { doc, addDoc, updateDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/main.js'

export const useDateStorage = defineStore('dateStorage', {
  state: () => {
    return {
      startingTime: '00:00',
      stoppingTime: '00:00',
      totalTime: '00:00',
      isStarted : false,
      project: 'Start your journey!',
      counter: '0',
      dailyHoursList: [],
      docRef: null,
      lastDocId: null,
    }
  },
  getters:{
    currentStartingTime: (state) => state.startingTime,
    currentStoppingTime: (state) => state.stoppingTime,
    currentTotalTime: (state) => state.totalTime,
    timeIsRunning: (state) => state.isStarted,
    currentProject: (state) => state.project,
    currentCounter: (state) => parseInt(state.counter),
    currentDailyHoursList: (state) => state.dailyHoursList
  },
  actions:{
    async getDailyHours(year, month, day){
      const auth = useAuthStore()
      try{
        this.dailyHoursList = []
        const querySnap = await getDocs(collection(db, `dates/${year}/${month}/${day}/${auth.currentUID}`))
        querySnap.forEach((doc) => {
          this.dailyHoursList.push({
            id: doc.id,
            data: doc.data()
          })
        }
      )
      //order dailyHourList by date
      this.dailyHoursList.sort(function (a, b) {
        if (a.data.date > b.data.date) {
          return 1;
        }
        if (a.data.date < b.data.date) {
          return -1;
        }
        return 0
      })
      if (this.dailyHoursList[this.dailyHoursList.length -1].data.is_started === true ){
        this.isStarted = true
        this.lastDocId = this.dailyHoursList[this.dailyHoursList.length -1].id
      }
      return
      } catch(e){
        console.log(e)
      }

    },
    async postDailyHours(date, year, month, day, startingTime, project){
      const auth = useAuthStore()
      const ref = collection(db, `dates/${year}/${month}/${day}`, auth.currentUID)
      try {
          await addDoc(ref, {
          date: serverTimestamp(),
          month: month,
          year: year,
          starting_time: startingTime,
          is_started: true,
          project: project,

        })
        console.log('tiempos creados')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async postStoppingTime(year, month, day, stoppingTime, totalTime) {
      const auth = useAuthStore()
      const data = doc(db, `dates/${year}/${month}/${day}/${auth.currentUID}/${this.lastDocId}`)
      try{
        await updateDoc(data, {
          stopping_time: stoppingTime,
          total_time: totalTime,
          is_started: false,
        })
        this.isStarted = false
        console.log('tiempos actualizados')
      } catch (e){
        console.error(e)
      }
    },
  }
})