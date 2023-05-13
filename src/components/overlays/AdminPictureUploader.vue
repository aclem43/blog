<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const file = ref()
const post = ref(false)
const image = ref('')

const onFileChange = (e: Event) => {
  if (!e.target) return
  const target = e.target as HTMLInputElement
  if (!target.files) return
  if (!target.files[0]) return
  image.value = URL.createObjectURL(target.files[0])
  file.value = target.files[0]
}

const upload = () => {
  if (file.value === undefined) return
  const data = new FormData()
  data.append('file', file.value)
  fetch('/api/image', {
    method: 'POST',
    body: data
  })
    .then((res) => {
      res.status === 200 ? (dialog.value = false) : console.log(res)
    })
    .catch((err) => console.log(err))
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
              show-size
              variant="solo"
              @change="onFileChange"
            ></v-file-input>
          </div>
          <v-btn color="primary" max-width="300" @click="upload()" block>Upload</v-btn>
          <v-switch v-model="post" label="Post"></v-switch>
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
