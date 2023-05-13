<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

const overlay = ref()

const images: Ref<{ id: number; imageURL: string; post?: boolean }[]> = ref([])

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
    <v-row>
      <v-col v-for="image of images" :key="image.id" class="d-flex child-flex" cols="4">
        <v-img
          v-if="image.post"
          :src="image.imageURL"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2"
        >
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
