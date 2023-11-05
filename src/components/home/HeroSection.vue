<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useDisplay } from 'vuetify'
import svgHero from '@/assets/img/timings.svg'

const { mdAndUp } = useDisplay()


</script>


<template>
  <v-container class="hero-container">
    <v-row>
      <v-col align="center" class="align-self-center">
        <h1 class="text-center text-dark">Stop wasting your time counting hours</h1>
        <h4 class="text-dark">Empieza a controlar en qué gastas tú tiempo. Tanto para uso propio como para empresas.</h4>

        <div class="my-6">
          <PrimaryButton text="Start Now" :to="{name: 'register'}" />
        </div>
      </v-col>
      <v-col align="center" class="align-self-center">
        <v-img :width="mdAndUp ? 400 : 300" :src="svgHero" ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1{
  font-size: 36px;
}
h3{
  font-size: 20px;
}

@media(min-width:600px){
  h1{
    font-size: 42px;
  }
  h4{
    font-size: 20px;
  }
}
.hero-container{
  max-width: 1200px !important;
}
</style>