<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const file = ref(null)
const image = ref('')

const onFileChange = (e: unknown) => {
  //   if (!e.target) return
  //   const file = e.target.files[0]
  //   image.value = URL.createObjectURL(file)
}
const openOverlay = () => {
  dialog.value = true
}

defineExpose({ openDialog: openOverlay })
</script>

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="90%" min-width="500px">
      <v-card>
        <v-card-title>Upload Picture</v-card-title>
        <v-card-text>
          <div class="pa-2">
            <v-file-input
              accept="image/*"
              label="Select a picture"
              prepend-icon="mdi-camera"
              v-model="file"
              show-size
              variant="solo"
              @change="onFileChange"
            ></v-file-input>
            <v-btn color="primary" max-width="300" block>Upload</v-btn>
          </div>
          <div class="d-flex flex-grow-1" style="height: 300px">
            <v-img v-if="image" :src="image"></v-img>
            <div v-else>Image Preview</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
