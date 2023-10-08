<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AccountIcon from '@/components/icons/AccountIcon.vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'

const drawer = ref(false)
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
        <v-btn :to="{ name: 'login' }">
          <AccountIcon />
        </v-btn>
        </v-app-bar>
        <v-navigation-drawer location="left" v-model="drawer" temporary>
          <v-list class="d-flex flex-column mt-6 mx-6">
            <v-tabs direction="vertical">
              <v-tab to="/">
                Home
              </v-tab>
              <v-tab :to="{name: 'about'}">
                About
              </v-tab>
              <v-tab :to="{name: 'userMain'}">
                User Main
              </v-tab>
            </v-tabs>
          </v-list>
        </v-navigation-drawer>
    </v-layout>
  </header>
</template>

<style>
</style>
