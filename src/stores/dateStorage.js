import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { doc, addDoc, updateDoc, getDocs, collection, serverTimestamp, query, where } from 'firebase/firestore'
import { db } from '@/main.js'
import timeConverter from '@/utils/timeConverter.js'

export const useDateStorage = defineStore('dateStorage', {
  state: () => {
    return {
      startingTime: '00:00',
      stoppingTime: '00:00',
      totalTime: '00:00',
      isStarted: false,
      project: 'Start your journey!',
      counter: '0',
      dailyHoursList: [],
      docRef: null,
      lastDocId: null,
      lastTimeStart: null,
      totalTimeToday: 0
    }
  },
  getters: {
    currentStartingTime: (state) => state.startingTime,
    currentStoppingTime: (state) => state.stoppingTime,
    currentTotalTime: (state) => state.totalTime,
    timeIsRunning: (state) => state.isStarted,
    currentProject: (state) => state.project,
    currentCounter: (state) => parseInt(state.counter),
    currentDailyHoursList: (state) => state.dailyHoursList,
    currentLastTimeStart: (state) => state.lastTimeStart,
    currentTotalTimeToday: (state) => timeConverter(state.totalTimeToday)
  },
  actions: {
    async getDailyHours(year, month, day) {
      const auth = useAuthStore()
      try {
        this.dailyHoursList = []
        this.totalTimeToday = 0
        const querySnap = await getDocs(
          collection(db, `dates/${year}/${month}/${day}/${auth.currentUID}`)
        )
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            this.totalTimeToday += doc.data().total_time_ms
          }
          this.dailyHoursList.push({
            id: doc.id,
            data: doc.data()
          })
        })

        //order dailyHourList by date
        this.dailyHoursList.sort(function (a, b) {
          if (a.data.date > b.data.date) {
            return -1
          }
          if (a.data.date < b.data.date) {
            return 1
          }
          return 0
        })
        if (this.dailyHoursList[0].data.is_started === true) {
          this.isStarted = true
          this.lastDocId = this.dailyHoursList[0].id
          this.lastTimeStart = this.dailyHoursList[0].data.starting_time_ms
        }
        return
      } catch (e) {
        console.log(e)
      }
    },
    async postDailyHours(year, month, day, startingTime, project, notes) {
      const auth = useAuthStore()

      //Convert date to hour format
      let hours = startingTime.getHours()
      let minutes = startingTime.getMinutes()

      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes

      const startingHour = `${hours}:${minutes} h`

      const ref = collection(db, `dates/${year}/${month}/${day}`, auth.currentUID)
      try {
        await addDoc(ref, {
          date: serverTimestamp(),
          starting_time: startingHour,
          starting_time_ms: +startingTime,
          is_started: true,
          project: project,
          notes: notes
        })
        console.log('tiempos creados')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async postStoppingTime(year, month, day, stoppingTime, totalTime) {
      const auth = useAuthStore()

      //Convert date to hour format
      let hours = stoppingTime.getHours()
      let minutes = stoppingTime.getMinutes()

      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes

      const stoppingHour = `${hours}:${minutes} h`
      const data = doc(db, `dates/${year}/${month}/${day}/${auth.currentUID}/${this.lastDocId}`)
      try {
        await updateDoc(data, {
          stopping_time: stoppingHour,
          stopping_ms: +stoppingTime,
          total_time: timeConverter(totalTime),
          total_time_ms: totalTime,
          is_started: false
        })
        this.isStarted = false
        console.log('tiempos actualizados')
      } catch (e) {
        console.error(e)
      }
    },
    async getMonthlyHours(year, month, day){
      const auth = useAuthStore()
      try{
        const querySnap = await getDocs(collection(db, `dates/${year}/${month}/21/${auth.currentUID}`))
        querySnap.forEach((doc) => {
          console.log(doc)
        })

      } catch(e){

      }
    }
  }
})
