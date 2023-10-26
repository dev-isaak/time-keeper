import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/main.js'
import timeConverter from '@/utils/timeConverter.js'
import { useAuthStore } from '@/stores/auth.js'

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
    currentTotalProjectsTimeMs: (state) => timeConverter(state.totalProjectsTime)
  },
  actions: {
    async getHoursPerProject(project) {
      this.totalProjectsTime = 0
      const auth = useAuthStore()
      try {
        const getProjects = query(
          collection(db, `dates/2023/${auth.currentUID}`),
          where('project', '==', project.toUpperCase())
        )
        const querySnap = await getDocs(getProjects)
        querySnap.forEach((doc) => {
          if (doc.data().total_time_ms != undefined) {
            this.totalProjectsTime += doc.data().total_time_ms
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
})
