<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { ref, onBeforeMount } from 'vue'
import { useProjectsStorage } from '@/stores/projectsStorage.js'
import SnackBar from '../SnackBar.vue'
import DeleteButton from '../icons/DeleteButton.vue'

const projectName = ref('')
const projectStorage = useProjectsStorage()
const message = ref('')
const openSnackbar = ref(false)
const errorMessage = ref(false)

const rules = {
        required: value => !!value || 'Field is required',
      }

onBeforeMount(async() => {
	await projectStorage.getProjects()
})

const handleUploadProject = async () => {
	console.log(projectName.value)
	if(projectName.value != ''){
		console.log('entra aquí')
		projectStorage.postProject(projectName.value)
		message.value = 'Project created.'
		projectName.value = null
		openSnackbar.value = true
		setTimeout(() => {
			openSnackbar.value = false
		},3000)
	} else{
		errorMessage.value = true
		message.value = 'Enter a project name'
		openSnackbar.value = true
		setTimeout(() => {
			openSnackbar.value = false
		}, 3000)
	}
}

const handleDeleteProject = async(projectName) => {
	await projectStorage.deleteProject(projectName)
	message.value = 'Project deleted.'
	openSnackbar.value = true
	setTimeout(() => {
		openSnackbar.value = false
	},3000)
}
</script>

<template>
	<SnackBar :text="message" :openSnackbar="openSnackbar" :error="errorMessage ? true : false" />
	<v-container class="d-flex justify-center">
		<v-sheet max-width="400" class="ma-4 w-100">
			<form @submit.prevent>
				<v-text-field label="Project name" v-model="projectName" :rules="[rules.required]"></v-text-field>
				<div class="d-flex justify-center">
					<PrimaryButton type="submit" text="Add Project" @click="handleUploadProject" color="#90A4AE"/>
				</div>
			</form>
		</v-sheet>
	</v-container>
	<v-container class="d-flex flex-column align-center">
		<v-sheet v-for="(project, index) in projectStorage.currentCustomerProjects" :key="index" class="d-flex align-center justify-space-between px-2 py-1 my-2 w-100" max-width="200" elevation=1>
			<h3 class="ml-4">{{ project}}</h3>
			<PrimaryButton variant="plain" icon>
				<DeleteButton @click="() => handleDeleteProject(project)"/>
			</PrimaryButton>
		</v-sheet>
	</v-container>
</template>