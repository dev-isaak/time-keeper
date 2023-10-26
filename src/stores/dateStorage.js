import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { useFirestoreDB } from './firestoreDB'
import {
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore'
import { db } from '@/main.js'
import timeConverter from '@/utils/timeConverter.js'
import timeConverterSeconds from '@/utils/timeConverterSeconds.js'
import fiveMinutesInterval from '../utils/fiveMinutesInterval.js'
import oneMinuteInterval from '@/utils/oneMinuteInterval.js'

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
      lastTimeStartFormatted: '',
      totalTimeToday: 0,
      monthlyHours: 0,
      januaryHours: 0,
      februaryHours: 0,
      marchHours: 0,
      aprilHours: 0,
      mayHours: 0,
      juneHours: 0,
      julyHours: 0,
      augustHours: 0,
      septemberHours: 0,
      octoberHours: 0,
      novemberHours: 0,
      decemberHours: 0,
      weeklyHours: 0,
      todayProjects: [],
      allProjects: [],
      cronoTime: 0,
      cronoInterval: 0,
      isfiveMinutesInterval: false,
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
    currentTotalTimeToday: (state) => timeConverter(state.totalTimeToday),
    currentMonthlyHours: (state) => timeConverter(state.monthlyHours),
    currentMonthlyHoursMs: (state) => state.monthlyHours,
    currentJanuaryHours: (state) => timeConverter(state.januaryHours),
    currentFebruaryHours: (state) => timeConverter(state.februaryHours),
    currentMarchHours: (state) => timeConverter(state.marchHours),
    currentAprilHours: (state) => timeConverter(state.aprilHours),
    currentMayHours: (state) => timeConverter(state.mayHours),
    currentJuneHours: (state) => timeConverter(state.juneHours),
    currentJulyHours: (state) => timeConverter(state.julyHours),
    currentAugustHours: (state) => timeConverter(state.augustHours),
    currentSeptemberHours: (state) => timeConverter(state.septemberHours),
    currentOctoberHours: (state) => timeConverter(state.octoberHours),
    currentNovemberHours: (state) => timeConverter(state.novemberHours),
    currentDecemberHours: (state) => timeConverter(state.decemberHours),
    currentWeeklyHours: (state) => timeConverter(state.weeklyHours),
    currentWeeklyHoursMs: (state) => state.weeklyHours,
    currentTodayProjects: (state) => state.todayProjects,
    currentAllProjects: (state) => state.allProjects,
    currentCronoTime: (state) => timeConverterSeconds(state.cronoTime),
    currentCronoTimeMs: (state) => state.cronoTime,
    currentLastTimeStartFormatted: (state) => state.lastTimeStartFormatted
  },
  actions: {
    async getDailyHours(year, month, day) {
      const auth = useAuthStore()

      try {
        this.dailyHoursList = []
        this.totalTimeToday = 0
        const querySnap = await getDocs(
          query(
            collection(db, `dates/${year}/${auth.currentUID}`),
            where('day', '==', day),
            where('month', '==', month),
            where('year', '==', year)
          )
        )
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            this.todayProjects.push(doc.data())
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
          this.lastTimeStartFormatted = this.dailyHoursList[0].data.starting_time
        }
        return
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectCurrentTime() {
      clearInterval(this.cronoInterval)
      const auth = useAuthStore()
      const date = new Date()
      const docRef = doc(db, `dates/${date.getFullYear()}/${auth.currentUID}/${this.lastDocId}`)
      try {
        const querySnap = await getDoc(docRef)
        let projectDate = new Date(querySnap.data().date.seconds * 1000)
        this.cronoTime = date - projectDate
        this.cronoInterval = setInterval(() => {
          this.cronoTime += 1000
        }, 1000)
      } catch (e) {
        console.error(e)
      }
    },
    async postDailyHours(year, month, day, startingTime, project, notes) {
      const auth = useAuthStore()
      const fireStoreDB = useFirestoreDB()
      let startingHour = ''
      //Convert date to hour format
      let hours = startingTime.getHours()
      let minutes = startingTime.getMinutes()
      const start = true
      if (fireStoreDB.currentTimeInterval === '5 minutes') {
        startingHour = fiveMinutesInterval(hours, minutes, start)
      } else if (fireStoreDB.currentTimeInterval === '15 minutes') {
        //
      } else {
        startingHour = oneMinuteInterval(hours, minutes, start)
      }

      const ref = collection(db, 'dates', `/${year}`, auth.currentUID)
      try {
        await addDoc(ref, {
          date: serverTimestamp(),
          year: year,
          month: month,
          day: day,
          starting_time: `${startingHour} h`,
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
      const fireStoreDB = useFirestoreDB()
      //Convert date to hour format
      let hours = stoppingTime.getHours()
      let minutes = stoppingTime.getMinutes()
      let stoppingHour = ''

      if (fireStoreDB.currentTimeInterval === '5 minutes') {
        stoppingHour = fiveMinutesInterval(hours, minutes)
        this.isfiveMinutesInterval = true
      } else if (fireStoreDB.currentTimeInterval === '15 minutes') {
        //nothing
      } else {
        stoppingHour = oneMinuteInterval(hours, minutes)
      }
      const data = doc(db, `dates/${year}/${auth.currentUID}/${this.lastDocId}`)
      try {
        //Si el tiempo de crono es menor de 10 minutos, no se ejecuta la acción
        if (this.currentCronoTimeMs < 600000 && this.isfiveMinutesInterval === true) {
          await updateDoc(data, {
            stopping_time: this.currentLastTimeStartFormatted,
            stopping_ms: this.currentLastTimeStart,
            total_time: timeConverter(0),
            total_time_ms: 0,
            is_started: false
          })
          clearInterval(this.cronoInterval)
          this.cronoTime = 0
          this.isStarted = false
          this.fiveMinutesInterval = false
          // NO ACTUALIZA EL CRONO
          console.log('tiempos actualizados')
        } else {
          await updateDoc(data, {
            stopping_time: `${stoppingHour} h`,
            stopping_ms: +stoppingTime,
            total_time: timeConverter(totalTime),
            total_time_ms: totalTime,
            is_started: false
          })
          clearInterval(this.cronoInterval)
          this.cronoTime = 0
          this.isStarted = false
          console.log('tiempos actualizados')
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getWeeklyHours(year) {
      const auth = useAuthStore()
      this.weeklyHours = 0
      //const q = query(collection(db, `dates/${year}/${auth.currentUID}`), where('month', '==', month))

      // obtengo número de la semana
      let date = new Date()
      let today = date.getDate()
      let weekDate = date.getDay()
      let restWeekDate = weekDate
      let queryDate = ''
      let dayCounter = 0
      // si date es 0 (domingo) lo cambiamos a 7
      if (weekDate === 0) {
        weekDate = 7
      }
      // el número obtenido lo resto hasta que sea cero. Por cada resta, sumo uno a un contador
      // para obtener el número de días que tengo que obtener
      while (restWeekDate > 1) {
        restWeekDate -= 1
        dayCounter += 1
      }
      // Si es lunes solo hacemos una query con el día de hoy
      if (weekDate === 1) {
        queryDate = query(
          collection(db, `dates/${year}/${auth.currentUID}`),
          where('day', '==', today)
        )
      }
      // Si es otro día de la semana hacemos la query entre dos días
      else {
        let sinceDay = today - dayCounter
        queryDate = query(
          collection(db, `dates/${year}/${auth.currentUID}`),
          where('day', '>=', sinceDay),
          where('day', '<=', today)
        )
      }
      try {
        const querySnap = await getDocs(queryDate)
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            this.weeklyHours += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    async getCurrentMonthlyHours(year, month) {
      const auth = useAuthStore()
      const q = query(
        collection(db, `dates/${year}/${auth.currentUID}`),
        where('month', '==', month)
      )
      this.monthlyHours = 0
      try {
        const querySnap = await getDocs(q)
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            this.monthlyHours += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    async getYearMonthlyHours(year) {
      const auth = useAuthStore()
      const q = collection(db, `dates/${year}/${auth.currentUID}`)

      try {
        const querySnap = await getDocs(q)
        querySnap.forEach((doc) => {
          if (doc.data().month === 1) {
            this.januaryHours += doc.data().total_time_ms
          } else if (doc.data().month === 2) {
            this.februaryHours += doc.data().total_time_ms
          } else if (doc.data().month === 3) {
            this.marchHoursHours += doc.data().total_time_ms
          } else if (doc.data().month === 4) {
            this.aprilHours += doc.data().total_time_ms
          } else if (doc.data().month === 5) {
            this.mayHours += doc.data().total_time_ms
          } else if (doc.data().month === 6) {
            this.juneHours += doc.data().total_time_ms
          } else if (doc.data().month === 7) {
            this.julyHours += doc.data().total_time_ms
          } else if (doc.data().month === 8) {
            this.augustHours += doc.data().total_time_ms
          } else if (doc.data().month === 9) {
            this.septemberHours += doc.data().total_time_ms
          } else if (doc.data().month === 10) {
            this.octoberHours += doc.data().total_time_ms
          } else if (doc.data().month === 11) {
            this.novemberHours += doc.data().total_time_ms
          } else if (doc.data().month === 12) {
            this.decemberHours += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    async getAllEvents(year) {
      const auth = useAuthStore()
      const q = collection(db, `dates/${year}/${auth.currentUID}`)
      this.allProjects = []
      try {
        const querySnap = await getDocs(q)
        querySnap.forEach((doc) => {
          if (doc.data()) {
            this.allProjects.push(doc.data())
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
})
