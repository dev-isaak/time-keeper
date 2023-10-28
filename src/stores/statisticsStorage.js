import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/main.js'
import { useAuthStore } from '@/stores/auth.js'
import { DateConverter } from '../utils/DateConverter'

export const useStatisticsStorage = defineStore('statisticsStorage', {
  state: () => {
    return {
      projectList: [],
      totalProjectsTime: 0
    }
  },
  getters: {
    currentProjectList: (state) => state.projectList,
    currentTotalProjectsTime: (state) => state.totalProjectsTime,
  },
  actions: {
    async getHoursPerProject(project) {
      const date = new DateConverter()
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
          if (doc.data().total_time_ms != undefined) {
            hoursArray.push(doc.data().total_time)
          }
        })
        this.totalProjectsTime = date.getTotalHours(hoursArray)
      } catch (e) {
        console.error(e)
      }
    }
  }
})
