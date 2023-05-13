<script setup lang="ts">
import { sidebar } from '../scripts/sidebar'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { type Post, getPost } from '@/scripts/post'
let post: Ref<Post | null> = ref(null)

const html = computed(() => {
  if (!post.value) return ''
  const html = marked(post.value.content.body)
  console.log(html)
  return html
})

onMounted(() => {
  sidebar.value = false
  const value = getPost(parseInt(useRoute().params.id as string))
  if (value != undefined) post.value = value
})
</script>

<template>
  <v-card>
    <v-img
      v-if="post?.image"
      class="align-end text-white"
      :height="post.image?.height"
      :src="post.image?.url"
      :cover="post.image?.cover"
    >
      <v-card-title primary-title>{{ post.title }}</v-card-title>
    </v-img>
    <v-card-title v-else primary-title> {{ post != null ? post.title : '' }} </v-card-title>
    <v-card-text> <div v-html="html"></div> </v-card-text>
  </v-card>
</template>
