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
      projectTotalTimeList: []
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
      // projectTotalTimeList = []

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
        
        const result = this.projectList.reduce((acc, current) => {
          const existingProject = acc.find(item => item.project_name === current.project_name)
        
          if (existingProject) {
            existingProject.total_time = addTimes(existingProject.total_time, current.total_time)
          } else {
            acc.push({ "project_name": current.project_name, "total_time": current.total_time })
          }
        
          return acc
        }, [])
        
        function addTimes(time1, time2) {
          const [hours1, minutes1] = time1.split(":").map(Number)
          const [hours2, minutes2] = time2.split(":").map(Number)
          let totalHours = hours1 + hours2
          let totalMinutes = minutes1 + minutes2
        
          return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}`
        }
        this.projectTotalTimeList = result
        // --------------------------------------
      } catch(e){
        console.error(e)
      }
    }
  }
})
