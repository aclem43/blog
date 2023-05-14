<script setup lang="ts">
import type { Post } from '@/scripts/post'
import { convertToDate } from '@/scripts/utils'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

const posts: Ref<Post[]> = ref([])

onMounted(() => {
  fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
      posts.value.push(...(data as Post[]))
      posts.value.sort((a: Post, b: Post) => {
        return convertToDate(b.date).getTime() - convertToDate(a.date).getTime()
      })
    })
})
</script>

<template>
  <v-card style="min-height: inherit">
    <v-card-title>Admin</v-card-title>
    <v-card-actions class="d-flex justify-end">
      <v-btn variant="outlined" href="/admin/gallery">Admin Gallery</v-btn>
      <v-btn variant="outlined" href="/admin/new">New</v-btn>
    </v-card-actions>
    <v-list>
      <v-list-item
        v-for="post in posts"
        :title="post.title"
        :subtitle="post.description"
        :key="post.id"
        link
        :href="`#${post.id}`"
      ></v-list-item>
    </v-list>
  </v-card>
</template>
