import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/main.js'
import { useAuthStore } from '@/stores/auth.js'
import { DateConverter } from '../utils/DateConverter'

export const useStatisticsStorage = defineStore('statisticsStorage', {
  state: () => {
    return {
      projectList: [],
      totalProjectsTime: 0,
      totalProjectsTimeMs: 0,
      projectTotalTimeList: [],
      projectsFilteredByWeekDay: [],
    }
  },
  getters: {
    currentProjectList: (state) => state.projectList,
    currentTotalProjectsTime: (state) => state.totalProjectsTime,
    currentTotalProjectsTimeMs: (state) => state.totalProjectsTimeMs,
    currentProjectTotalTimeList: (state) => state.projectTotalTimeList,
    currentProjectsFilteredByWeekDay: (state) => state.projectsFilteredByWeekDay,
  },
  actions: {
    async getHoursPerProject(project) {
      const auth = useAuthStore(),
            dateConvert = new DateConverter()
      this.totalProjectsTime = 0
      let hoursArray = []

      try {
        const getProjects = query(
          collection(db, `dates/2023/${auth.currentUID}`), 
          where('project', '==', project.toUpperCase()))
        const querySnap = await getDocs(getProjects)

        querySnap.forEach((doc) => {
          if (doc.data().total_time != undefined) {
            hoursArray.push(doc.data().total_time)
          }
        })
        this.totalProjectsTime = dateConvert.getTotalHours(hoursArray)
        const projectMs = dateConvert.getMilliseconds(this.totalProjectsTime)
        this.totalProjectsTimeMs = projectMs / 1000 / 60 / 60
      } catch (e) {
        console.error(e)
      }
    },
    async getAllProjectsTotalHours(){
      const auth = useAuthStore(),
            dateConvert = new DateConverter()
      let projectNames = []
      
      try{
        const getProjects = query(collection(db, `dates/2023/${auth.currentUID}`)),
              querySnap = await getDocs(getProjects)

        querySnap.forEach((doc) => {
          if (doc.data().total_time != undefined) {
            this.projectList.push({
              project_name: doc.data().project,
              total_time: doc.data().total_time,
              day: doc.data().day,
              month: doc.data().month
            })
          }
        })
        
        // Get a new array of project names        
        this.projectList.map(project => {
          if (!projectNames.includes(project.project_name)){
            projectNames.push(project.project_name)
          }
        })
        // Get a new array of each project total times in float format hours
        projectNames.forEach(item => {
          const totalHours = this.currentProjectList.reduce((accumulator, current) => {
            if (current.project_name === item) {
              const toDecimalHours = dateConvert.getMilliseconds(current.total_time) / 3600000
              return accumulator + toDecimalHours
            }
            return accumulator
          }, 0)
        
          if (totalHours > 0) {
            this.projectTotalTimeList.push({
              project_name: item,
              total_hours: totalHours
            })
          }
        })
      } catch(e){
        console.error(e)
      }
    },
    async getHoursPerWeekDay(){
      let projects = []
      let test = []
      const dateConvert = new DateConverter(),
            auth = useAuthStore(),
            getProjects = query(collection(db, `dates/2023/${auth.currentUID}`)),

      querySnap = await getDocs(getProjects)
      querySnap.forEach((doc) => {
        projects.push(doc.data())
      })

      console.log(dateConvert.currentDay)
      console.log(dateConvert.getWeekDay())
      try{
        
        if (dateConvert === 1) {
          // si es lunes, solo buscar el mismo día
          this.projectsFilteredByWeekDay = this.projectList.map(project => {
            if (project.day === dateConvert.currentDay) return project
          })
        } else{
          // si es otro día de la semana, buscar todos los días que comprenden entre el currentDay - weekDay
          const sinceDay = dateConvert.currentDay - dateConvert.getWeekDay()

          //
          //-----------------------------------------------------------------
 
          test = projects.map((project) => {

            if (project.date > sinceDay && project.date <= dateConvert.currentDay){
              return project
            }
            
          })

          //-----------------------------------------------------------------
        }
        console.log(test)
      } catch(e){
        console.error(e)
      }
    }
  }
})
