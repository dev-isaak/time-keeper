<script setup>
import PrimaryButton from '@/components/PrimaryButton.vue'
</script>

<template>
  <footer data-cy="footer" class="footer-container">
    <v-divider class="my-6"></v-divider>
    <v-column>
      <v-row class="d-flex justify-space-between">
        <v-col class="d-flex flex-column align-center">
          <h3>Company</h3>
          <PrimaryButton
            text="Contact Us"
            variant="plain"
            color="black"
            :to="{ name: 'contact' }"
          />
          <PrimaryButton text="About Us" variant="plain" color="black" :to="{ name: 'about' }" />
        </v-col>
      </v-row>
    </v-column>
  </footer>
</template>

<style scoped>
.footer-container {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
