<script setup lang="ts">
import CardPost from '@/components/CardPost.vue'
import { mockPostRequest, type BasePost } from '@/scripts/post'
import { sidebar } from '@/scripts/sidebar'
import { onMounted, ref, type Ref } from 'vue'

const posts: Ref<BasePost[]> = ref([])

onMounted(async () => {
  const fetchedPosts = mockPostRequest()
  posts.value.push(...fetchedPosts)
  sidebar.value = true
})
</script>

<template>
  <div class="d-flex gap-1 flex-column pa-4">
    <CardPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
