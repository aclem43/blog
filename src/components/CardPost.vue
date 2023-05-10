<script setup lang="ts">
import type { BasePost } from '../scripts/post'
const props = defineProps<{ post: BasePost }>()

const image: boolean = props.post.image != undefined
console.log(props)
</script>
<template>
  <v-card :href="`/post/${post.id}`" hover elevation="10" class="bg-secondary">
    <v-img
      v-if="image"
      class="align-end text-white"
      :height="post.image?.height"
      :src="post.image?.url"
      :cover="post.image?.cover"
    >
      <v-card-title primary-title>{{ post.title }}</v-card-title>
    </v-img>
    <v-card-title v-else primary-title> {{ post.title }} </v-card-title>
    <v-card-text> {{ post.descriptionBody }} </v-card-text>
  </v-card>
</template>
