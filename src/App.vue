<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue'
import { onMounted } from 'vue'
import { initTheme, themeRef } from './scripts/theme'
import SideBar from './components/SideBar.vue'

onMounted(() => {
  initTheme()
})
</script>
<template>
  <v-app theme="themeDark">
    <AppBar />
    <v-main class="bg-secondary">
      <v-container>
        <v-row>
          <v-col cols="2">
            <SideBar />
          </v-col>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <RouterView />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
