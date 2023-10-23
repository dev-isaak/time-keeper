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
    currentWeeklyHoursMs: (state) => state.weeklyHours
  },
  actions: {
    async getDailyHours(year, month, day) {
      const auth = useAuthStore()
      try {
        this.dailyHoursList = []
        this.totalTimeToday = 0
        const querySnap = await getDocs(
          query(collection(db, `dates/${year}/${auth.currentUID}`), where('day','==',day), where('month', '==', month), where('year', '==', year))
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

      const ref = collection(db, 'dates', `/${year}`, auth.currentUID)
      try {
        await addDoc(ref, {
          date: serverTimestamp(),
          year: year,
          month: month,
          day: day,
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
      const data = doc(db, `dates/${year}/${auth.currentUID}/${this.lastDocId}`)
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
    async getWeeklyHours(year){
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
      if (weekDate === 0){
        weekDate = 7
      }
      // el número obtenido lo resto hasta que sea cero. Por cada resta, sumo uno a un contador
      // para obtener el número de días que tengo que obtener
      while (restWeekDate > 1){
        restWeekDate -= 1
        dayCounter += 1
      }
      // Si es lunes solo hacemos una query con el día de hoy
      if (weekDate === 1){
        queryDate = query(collection(db, `dates/${year}/${auth.currentUID}`), where('day', '==', today))
      } 
      // Si es otro día de la semana hacemos la query entre dos días
      else {
        let sinceDay = today - dayCounter
        queryDate = query(collection(db, `dates/${year}/${auth.currentUID}`), where('day', '>=', sinceDay), where('day', '<=', today))
      }
      try{
        const querySnap = await getDocs(queryDate);
        querySnap.forEach((doc) => {
          if(doc.data().total_time_ms !== undefined){
            this.weeklyHours += doc.data().total_time_ms
          }
        })
      } catch(e){
        console.error(e)
      }      
    },
    async getCurrentMonthlyHours(year, month) {
      const auth = useAuthStore()
      const q = query(collection(db, `dates/${year}/${auth.currentUID}`), where('month', '==', month))
        this.monthlyHours = 0
      try {
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          if(doc.data().total_time_ms !== undefined){
            this.monthlyHours += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e);
      }
    },
    async getYearMonthlyHours(year){
      const auth = useAuthStore()
      const q = collection(db, `dates/${year}/${auth.currentUID}`)
        
      try {
        const querySnap = await getDocs(q);
        querySnap.forEach((doc) => {
          if(doc.data().month === 1){
            this.januaryHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 2){
            this.februaryHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 3){
            this.marchHoursHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 4){
            this.aprilHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 5){
            this.mayHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 6){
            this.juneHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 7){
            this.julyHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 8){
            this.augustHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 9){
            this.septemberHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 10){
            this.octoberHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 11){
            this.novemberHours += doc.data().total_time_ms
          }
          else if(doc.data().month === 12){
            this.decemberHours += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e);
      }
    }
  }
})
