<script setup lang="ts">
import { sidebar } from '../scripts/sidebar'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { type Post } from '@/scripts/post'
let post: Ref<Post | null> = ref(null)

const html = computed(() => {
  if (!post.value) return ''
  const html = marked(post.value.content)
  console.log(html)
  return html
})

onMounted(() => {
  sidebar.value = false
  fetch(`/api/post/${useRoute().params.id}`)
    .then((res) => res.json())
    .then((data) => (post.value = data as Post))
})
</script>

<template>
  <v-card>
    <v-img
      v-if="post?.image"
      class="align-end text-white"
      :height="300"
      :src="`/api/image/${post.image}`"
      :cover="true"
    >
      <v-card-title primary-title>{{ post.title }}</v-card-title>
    </v-img>
    <v-card-title v-else primary-title> {{ post != null ? post.title : '' }} </v-card-title>
    <v-card-text> <div class="markdownStyle" v-html="html"></div> </v-card-text>
  </v-card>
</template>
<style>
img {
  max-width: 80%;
  display: flex;
  margin: auto;
}
</style>
