<script setup>
import { ref, computed, onMounted } from 'vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import { useAuthStore } from '@/stores/auth.js'
import PrimaryButton from '@/components/PrimaryButton.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { useDisplay } from 'vuetify'
import logo from '@/assets/img/logo_timekeeper.svg'

const authStore = useAuthStore()
const { mdAndUp } = useDisplay()

const drawer = ref(false)
const navbarMoved = ref(false)
const isLogedIn = computed(() => {
  return authStore.jwt
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
      navbarMoved.value = true
    } else{
      navbarMoved.value = false
    }
  })

})

</script>

<template>
  <header>
    <v-layout>
      <v-app-bar color="primary" :elevation="navbarMoved ? '5' : '0'">
        <div v-if="!mdAndUp">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
            <MenuIcon />
          </v-app-bar-nav-icon>
        </div>
        <div v-else class="d-flex align-center ml-6">
          <a href="/"><v-img :src="logo" width="55" class="mr-6" /></a>
          <PrimaryButton v-if="isLogedIn !== null" :to="{ name: 'userMain' }" text="Home"/>
          <PrimaryButton v-else to="/" text="Home"/>
          <div v-if="isLogedIn !== null">
              <PrimaryButton text="Projects" :to="{ name: 'projects' }" />
              <PrimaryButton text="Calendar" :to="{ name: 'calendar' }" />
              <PrimaryButton text="Statistics" :to="{ name: 'statistics' }" />
          </div>
        </div>
        <div v-if="!mdAndUp" class="d-flex w-100 justify-center">
          <a href="/"><v-img :src="logo" width="45" /></a>
          </div>
        <v-spacer> </v-spacer>
        <ProfileAvatar v-if="isLogedIn !== null" size="50" class="mr-6" menu />
        <div v-else class="mr-2">
          <PrimaryButton text="Log In" variant="text" :to="{ name: 'login' }" />
          <PrimaryButton text="Sign Up" variant="text" :to="{ name: 'register' }" />
        </div>
      </v-app-bar>
      <v-navigation-drawer location="left" v-model="drawer" temporary>
        <v-list class="d-flex flex-column mt-6">
          <v-list-item variant="text" link v-if="isLogedIn !== null" :to="{ name: 'userMain' }">
            Daily hours
          </v-list-item>
          <v-list-item variant="text" link v-else to="/"> Home </v-list-item>
          <div v-if="isLogedIn !== null">
            <v-list-item variant="text" link :to="{ name: 'projects' }"> Projects </v-list-item>
            <v-list-item variant="text" link :to="{ name: 'calendar' }"> Calendar </v-list-item>
            <v-list-item variant="text" link :to="{ name: 'statistics' }"> Statistics </v-list-item>
          </div>
          <v-list-item variant="text" link :to="{ name: 'about' }"> About </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </header>
</template>

<style scoped>
.v-btn{
  color:white !important;
}
</style>
