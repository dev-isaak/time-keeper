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
import totalHours from '@/utils/totalHours.js'
import { DateConverter } from '@/utils/DateConverter'

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
    currentTotalTimeToday: (state) => state.totalTimeToday,
    currentMonthlyHours: (state) => state.monthlyHours,
    currentMonthlyHoursMs: (state) => state.monthlyHours,
    currentWeeklyHours: (state) => state.weeklyHours,
    currentWeeklyHoursMs: (state) => state.weeklyHours,
    currentTodayProjects: (state) => state.todayProjects,
    currentAllProjects: (state) => state.allProjects,
    currentCronoTime: (state) => timeConverterSeconds(state.cronoTime),
    currentCronoTimeMs: (state) => state.cronoTime,
    currentLastTimeStartFormatted: (state) => state.lastTimeStartFormatted,
  },
  actions: {
    async getDailyHours() {
      const auth = useAuthStore()
      const date = new DateConverter()
      const year = date.currentYear
      const month = date.currentMonth
      const day = date.currentDay

      let hoursArray = []
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
            hoursArray.push(doc.data().total_time)
          }
          this.dailyHoursList.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.totalTimeToday = date.getTotalHours(hoursArray)
        
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
    async postDailyHours(project, notes) {
      const auth = useAuthStore()
      const date = new DateConverter()
      const fireStoreDB = useFirestoreDB()
      const startYear = date.currentYear
      const startMonth = date.currentMonth
      const startDay = date.currentDay
      let startingHour = ''
      const startPressed = true
      if (fireStoreDB.currentTimeInterval === '5 minutes') {
       startingHour = date.getFiveMinutesInterval(startPressed)
      } else if (fireStoreDB.currentTimeInterval === '15 minutes') {
        //
      } else {
        startingHour = date.getOneMinuteInterval()
      }

      const ref = collection(db, 'dates', `/${startYear}`, auth.currentUID)
      try {
        await addDoc(ref, {
          date: serverTimestamp(),
          year: startYear,
          month: startMonth,
          day: startDay,
          starting_time: startingHour,
          //starting_time_ms: +startingDate,
          is_started: true,
          project: project,
          notes: notes
        })
        console.log('tiempos creados')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async postStoppingTime() {
      const auth = useAuthStore()
      const fireStoreDB = useFirestoreDB()
      const date = new DateConverter()
      // Hacemos la resta del start_time obtenido del server y le restamos la hora actual para obtener el total
      let stoppingHours = date.currentHour
      let stoppingMinutes = date.currentMinutes
      let totalTime = ''
      let stoppingHour = ''

      if (fireStoreDB.currentTimeInterval === '5 minutes') {
        stoppingHour = date.getFiveMinutesInterval()
        totalTime = date.getDifferenceBetweenTwoHours(this.currentLastTimeStartFormatted, stoppingHour)
        this.isfiveMinutesInterval = true
      } else if (fireStoreDB.currentTimeInterval === '15 minutes') {
        //nothing
      } else {
        let stoppingTime = date.getCurrentTime()
        totalTime = date.getDifferenceBetweenTwoHours(this.currentLastTimeStartFormatted, stoppingTime)
        console.log(totalTime)
        stoppingHour = totalTime
      }
      const data = doc(db, `dates/${date.currentYear}/${auth.currentUID}/${this.lastDocId}`)
      try {
        //Si el tiempo de crono es menor de 10 minutos, no se ejecuta la acción
        if (this.currentCronoTimeMs < 600000 && this.isfiveMinutesInterval === true) {
          await updateDoc(data, {
            stopping_time: this.currentLastTimeStartFormatted,
            //stopping_ms: this.currentLastTimeStart,
            total_time: '00:00',
            total_time_ms: 0,
            is_started: false
          })
          clearInterval(this.cronoInterval)
          this.cronoTime = 0
          this.isStarted = false
          this.fiveMinutesInterval = false
        } 
        else if(this.isfiveMinutesInterval === true){
          await updateDoc(data, {
            stopping_time: stoppingHour,
            //stopping_ms: this.currentLastTimeStart,
            total_time: totalTime,
            total_time_ms: 0,
            is_started: false
          })
          clearInterval(this.cronoInterval)
          this.cronoTime = 0
          this.isStarted = false
          this.fiveMinutesInterval = false
        }
        else {
          await updateDoc(data, {
            stopping_time: `${stoppingHours}:${stoppingMinutes}`,
            total_time: stoppingHour,
            total_time_ms: totalTime,
            is_started: false
          })
          clearInterval(this.cronoInterval)
          this.cronoTime = 0
          this.isStarted = false
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getWeeklyHours() {
      const auth = useAuthStore()
      const date = new DateConverter()
      const weekDay = date.getWeekStatistics()[0]
      const dayCounter = date.getWeekStatistics()[1]
      let hoursArray = []

      this.weeklyHours = 0
      let queryDate = ''
      
      // If it's Monday, only query for the current day
      if (weekDay === 1) {
        queryDate = query(
          collection(db, `dates/${date.currentYear}/${auth.currentUID}`),
          where('day', '==', date.currentDay)
        )
      }
      // If it is not Monday, query between two days
      else {
        let sinceDay = date.currentDay - dayCounter
        queryDate = query(
          collection(db, `dates/${date.currentYear}/${auth.currentUID}`),
          where('day', '>=', sinceDay),
          where('day', '<=', date.currentDay)
        )
      }
      try {
        const querySnap = await getDocs(queryDate)
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            hoursArray.push(doc.data().total_time)
          }
        })
        this.weeklyHours = date.getTotalHours(hoursArray)
      } catch (e) {
        console.error(e)
      }
    },
    async getCurrentMonthHours() {
      const auth = useAuthStore()
      const date = new DateConverter()
      const year = date.currentYear
      const month = date.currentMonth
      let hoursArray = []

      const q = query(
        collection(db, `dates/${year}/${auth.currentUID}`),
        where('month', '==', month)
      )
      this.monthlyHours = 0
      try {
        const querySnap = await getDocs(q)
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms !== undefined) {
            hoursArray.push(doc.data().total_time)
          }
        })
        this.monthlyHours = date.getTotalHours(hoursArray)
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
