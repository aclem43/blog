<script setup lang="ts">
import AdminPictureUploader from '@/components/overlays/AdminPictureUploader.vue'
import { onMounted, ref, type Ref } from 'vue'

const overlay = ref()

const images: Ref<{ id: number; imageURL: string }[]> = ref([])

const openOverlay = () => {
  overlay.value.openDialog()
}

onMounted(() => {
  fetch('/api/images', {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((data) => {
      images.value = data
      console.log(images.value)
    })
    .catch((err) => console.log(err))
})
</script>

<template>
  <v-container>
    <AdminPictureUploader ref="overlay" />
    <v-row class="d-flex justify-end pa-2">
      <v-btn variant="outlined" @click="openOverlay()">Add</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="image of images" :key="image.id" class="d-flex child-flex" cols="4">
        <v-img :src="image.imageURL" aspect-ratio="1" cover class="bg-grey-lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
