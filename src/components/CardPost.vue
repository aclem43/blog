<script setup lang="ts">
import { convertToDate } from '@/scripts/utils'
import type { Post } from '../scripts/post'
const props = defineProps<{ post: Post }>()

const image: boolean = props.post.image != undefined
console.log(props)
</script>
<template>
  <v-card :href="`/post/${post.id}`" hover elevation="10">
    <v-img
      v-if="image"
      class="align-end text-white"
      :height="300"
      :src="`/api/image/${post.image}`"
      :cover="true"
    >
      <v-card-title primary-title>{{ post.title }}</v-card-title>
    </v-img>
    <v-card-title v-else primary-title> {{ post.title }} </v-card-title>
    <v-card-subtitle>{{ convertToDate(post.date).toLocaleString() }}</v-card-subtitle>
    <v-card-text> {{ post.description }} </v-card-text>
  </v-card>
</template>
