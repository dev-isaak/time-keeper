<script setup>
import { ref, computed } from 'vue';
import MenuIcon from '@/components/icons/MenuIcon.vue'
import { useAuthStore } from '@/stores/auth.js'
import PrimaryButton from '@/components/PrimaryButton.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'

const authStore = useAuthStore()

const drawer = ref(false)
const isLogedIn = computed(() => {
  return authStore.jwt
})
</script>

<template>
  <header>
    <v-layout>
      <v-app-bar color="var(--primary-color)" class="text-white">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
        <MenuIcon />
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          Time Keeper
        </v-toolbar-title>
        <v-spacer>
        </v-spacer>
        <ProfileAvatar v-if="isLogedIn !== null" size="50" class="mr-4" menu/>
        <!--<UserButton v-if="isLogedIn !== null"/>-->
        <div v-else class="mr-4">
          <PrimaryButton text="Log In" :to="{name: 'login'}"/>
          <PrimaryButton text="Sign Up" variant="text" :to="{name: 'register'}"/>
        </div>
        </v-app-bar>
        <v-navigation-drawer location="left" v-model="drawer" temporary>
          <v-list class="d-flex flex-column mt-6">
              <v-list-item variant="text" link color="#90A4AE" v-if="isLogedIn !== null" :to="{name: 'userMain'}">
                Daily hours
              </v-list-item>
              <v-list-item variant="text" link color="#90A4AE" v-else to="/">
                Home
              </v-list-item>
              <div v-if="isLogedIn !== null">
                <v-list-item variant="text" link color="#90A4AE" :to="{name: 'projects'}">
                  Projects
                </v-list-item>
                <v-list-item variant="text" link color="#90A4AE" :to="{name: 'calendar'}">
                  Calendar
                </v-list-item>
                <v-list-item variant="text" link color="#90A4AE" :to="{name: 'statistics'}">
                  Statistics
                </v-list-item>
              </div>
              <v-list-item variant="text" link color="#90A4AE" :to="{name: 'about'}">
                About
              </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-layout>
  </header>
</template>

<style>
</style>
