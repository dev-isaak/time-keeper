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
    }
  },
  getters: {
    currentProjectList: (state) => state.projectList,
    currentTotalProjectsTime: (state) => state.totalProjectsTime,
    currentTotalProjectsTimeMs: (state) => state.totalProjectsTimeMs,
    currentProjectTotalTimeList: (state) => state.projectTotalTimeList
  },
  actions: {
    async getHoursPerProject(project) {
      const dateConvert = new DateConverter()
      this.totalProjectsTime = 0
      let hoursArray = []
      const auth = useAuthStore()
      try {
        const getProjects = query(
          collection(db, `dates/2023/${auth.currentUID}`),
          where('project', '==', project.toUpperCase())
        )
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
      const auth = useAuthStore()
      const dateConvert = new DateConverter()
      const projectsListTest = [ 'WEB DEVELOPMENT', 'TEST',]
      let lista = []
      try{
        const getProjects = query(collection(db, `dates/2023/${auth.currentUID}`))
        const querySnap = await getDocs(getProjects)
        querySnap.forEach((doc) => {
          if (doc.data().total_time != undefined) {
            this.projectList.push({
              project_name: doc.data().project,
              total_time: doc.data().total_time
            })
          }
        })

        // --------------------------------------

        //Por cada projecto del array, crear un nuevo array con nombre de ese proyecto y horas totales
        
        projectsListTest.map(item => {
          
          this.currentProjectList.reduce((accumulator, current) => {
            // coger el total time parseado en ms del current y añadirlo en accumulator
            if (current.project_name === item){
              // El acumulador equivale a lo que contiene mas el valor actual
              const hourToMs = dateConvert.getMilliseconds(current.total_time)
              return  parseInt(accumulator) + parseInt(hourToMs)
            }
  
            if (lista.project_name != current.project_name){
              lista.push({
                project_name: current.project_name,
                total_hours: accumulator
              })
            }
            
            return accumulator
          }, 0)

        })
          
        
        console.log(lista)
        
        // --------------------------------------
      } catch(e){
        console.error(e)
      }
    }
  }
})
