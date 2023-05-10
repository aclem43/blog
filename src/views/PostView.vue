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
  <div class="pa-4" v-html="html"></div>
</template>
