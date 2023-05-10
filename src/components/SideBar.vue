<script setup lang="ts">
import { sidebar } from '@/scripts/sidebar'
</script>

<template>
  <v-sheet rounded="lg" v-if="sidebar">
    <v-list rounded="lg">
      <v-list-item v-for="n in 5" :key="n" link>
        <v-list-item-title> List Item {{ n }} </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item link color="grey-lighten-4">
        <v-list-item-title> Refresh </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>
