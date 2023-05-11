<script setup lang="ts">
import AdminPictureUploader from '@/components/overlays/AdminPictureUploader.vue'
import { ref } from 'vue'

const overlay = ref()

const openOverlay = () => {
  overlay.value.openDialog()
}
</script>

<template>
  <v-container>
    <AdminPictureUploader ref="overlay" />
    <v-row class="d-flex justify-end pa-2">
      <v-btn variant="outlined" @click="openOverlay()">Add</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img> </v-col
    ></v-row>
  </v-container>
</template>
