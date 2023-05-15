<script setup lang="ts">
import CardPost from '@/components/CardPost.vue'
import type { Post } from '@/scripts/post'
import { sidebar } from '@/scripts/sidebar'
import { onMounted, ref, type Ref } from 'vue'
import { convertToDate } from '@/scripts/utils'
import { mdiSortCalendarAscending, mdiSortCalendarDescending } from '@mdi/js'

const posts: Ref<Post[]> = ref([])
const sort = ref()

onMounted(async () => {
  fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
      posts.value.push(...(data as Post[]))
      posts.value.sort((a: Post, b: Post) => {
        return convertToDate(b.date).getTime() - convertToDate(a.date).getTime()
      })
      sort.value = 0
    })

  sidebar.value = true
})

const filter = () => {
  if (sort.value == 0) {
    posts.value.sort((a: Post, b: Post) => {
      return convertToDate(b.date).getTime() - convertToDate(a.date).getTime()
    })
  } else {
    posts.value.sort((a: Post, b: Post) => {
      return convertToDate(a.date).getTime() - convertToDate(b.date).getTime()
    })
  }
}
</script>

<template>
  <v-card>
    <v-card-title class="text-body-2 d-flex align-center">
      <v-btn-toggle
        @click="filter()"
        v-model="sort"
        color="primary"
        variant="flat"
        mandatory
        max="1"
      >
        <v-btn :icon="mdiSortCalendarAscending"></v-btn>
        <v-btn :icon="mdiSortCalendarDescending"></v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-divider></v-divider>
    <div class="d-flex gap-1 flex-column pa-4">
      <CardPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </v-card>
</template>
