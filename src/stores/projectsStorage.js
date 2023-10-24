import { defineStore } from 'pinia'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore'
import { db } from '@/main.js'
import { useAuthStore } from '@/stores/auth.js'

export const useProjectsStorage = defineStore('projectsStorage', {
  state: () => {
    return {
			customerProjects: [],
			documentId: '',
		}
  },
  getters: {
		currentCustomerProjects: (state) => state.customerProjects.map(project => {
			return project.project_name
		})
	},
  actions: {
		async getProjects(){
			const auth = useAuthStore()
			this.customerProjects = []
			try{
				const querySnap = await getDocs(collection(db, `projects/user_projects/${auth.currentUID}`))
				querySnap.forEach(document => {
					this.customerProjects.push(document.data())
				})
			} catch(e){
				console.error(e)
			}
		},
    async postProject(projectName) {
			const auth = useAuthStore()
			const docRef = collection(db, `projects/user_projects`, auth.currentUID)
			try{
      	await addDoc( docRef, {
					project_name: projectName.toUpperCase(),
				})
				this.customerProjects.push({
					project_name: projectName
				})
			}catch(e){
				console.error(e)
			}

    },
		async deleteProject(projectName){
			const auth = useAuthStore()
			const docRef = query(collection(db, `projects/user_projects/${auth.currentUID}`), where('project_name', '==', projectName))
			try{
				const querySnap = await getDocs(docRef)
				querySnap.forEach(doc => {
					this.documentId = doc.id
				})

				await deleteDoc(doc(db, `projects/user_projects/${auth.currentUID}/${this.documentId}`))
				const projectIndex = this.currentCustomerProjects.indexOf(projectName)
				this.customerProjects.splice(projectIndex,1)
			} catch(e){
				console.error(e)
			}
		}
  }
})
