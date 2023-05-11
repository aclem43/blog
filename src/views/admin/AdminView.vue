<script setup lang="ts">
import { mockPostRequest } from '@/scripts/post'

const posts = mockPostRequest()
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
        :subtitle="post.descriptionBody"
        :key="post.id"
        link
        :href="`#${post.id}`"
      ></v-list-item>
    </v-list>
  </v-card>
</template>
