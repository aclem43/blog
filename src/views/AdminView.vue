<script setup lang="ts">
import { mockPostRequest } from '@/scripts/post'

const posts = mockPostRequest()
</script>

<template>
  <v-card style="min-height: inherit">
    <v-toolbar color="">
      <template v-slot:prepend>
        <v-btn icon="$menu"></v-btn>
      </template>

      <v-toolbar-title primary-title class="text-h6"> Admin </v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>
    <v-card-actions>
      <button>Add</button>
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
