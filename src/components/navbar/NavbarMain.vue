<script setup>
import { ref } from 'vue';
import MenuIcon from '@/components/icons/MenuIcon.vue'
import UserButton from '@/components/navbar/UserButton.vue'

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
        <UserButton />
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
