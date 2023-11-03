<script setup>
import MainTemplate from '@/templates/MainTemplate.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

</script>


<template>
  <MainTemplate title="Contact Us">
    <div class="d-flex justify-center w-100 my-6">
      <v-sheet width="900" elevation="1" class="pa-8 rounded-lg mx-4">
        <v-column>
          <v-row>
            <v-col v-if="mdAndUp" class="d-flex align-center">
              <v-img src="src/assets/img/contact.svg" ></v-img>
            </v-col>
            <v-col>
              <form>
                <v-text-field label="Name"></v-text-field>
                <v-text-field label="Phone"></v-text-field>
                <v-text-field label="Email"></v-text-field>
                <v-textarea no-resize></v-textarea>
                <div class="d-flex justify-center">
                  <PrimaryButton text="Contact" />
                </div>
              </form>
            </v-col>
          </v-row>
        </v-column>
    </v-sheet>
    </div>
  </MainTemplate>
</template>