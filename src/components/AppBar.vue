<script setup lang="ts">
import { mdiMenu, mdiCog } from '@mdi/js'
</script>

<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-btn variant="text" href="/"> Posts </v-btn>
      <v-btn variant="text" href="/gallery"> Gallery </v-btn>

      <v-spacer></v-spacer>

      <v-btn variant="text">
        <v-icon :icon="mdiMenu"></v-icon>
        <v-menu activator="parent" open-on-hover>
          <v-list>
            <v-list-item href="/setting">
              <v-icon size="x-small" :icon="mdiCog" />
              Settings
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>
