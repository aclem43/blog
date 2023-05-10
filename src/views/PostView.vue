<script setup lang="ts">
import { sidebar } from '@/scripts/sidebar'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  console.log(useRoute().params.id)
  sidebar.value = false
})
</script>

<template>
  <div></div>
</template>
