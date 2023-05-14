<script setup lang="ts">
import CardPost from '@/components/CardPost.vue'
import type { Post } from '@/scripts/post'
import { sidebar } from '@/scripts/sidebar'
import { onMounted, ref, type Ref } from 'vue'
import { convertToDate } from '@/scripts/utils'

const posts: Ref<Post[]> = ref([])

onMounted(async () => {
  fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
      posts.value.push(...(data as Post[]))
      posts.value.sort((a: Post, b: Post) => {
        return convertToDate(b.date).getTime() - convertToDate(a.date).getTime()
      })
    })

  sidebar.value = true
})
</script>

<template>
  <div class="d-flex gap-1 flex-column pa-4">
    <CardPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
