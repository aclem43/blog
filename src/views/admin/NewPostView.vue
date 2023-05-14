<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { basicSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

// The Markdown parser will dynamically load parsers
// for code blocks, using @codemirror/language-data to
// look up the appropriate dynamic import.
let editor: EditorView
const title = ref('')
const description = ref('')

onMounted(() => {
  let view = new EditorView({
    doc: "Hello\n\n```javascript\nlet x = 'y'\n```",
    extensions: [basicSetup, markdown({ codeLanguages: languages })],
    parent: document.getElementById('textEditor') as HTMLElement
  })

  editor = view
})

const upload = () => {
  fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      content: editor.contentDOM.innerText,
      image: 1
    })
  }).then((data) => console.log(data))
}
</script>
<template>
  <v-card>
    <v-card-title> New Post </v-card-title>
    <v-card-text>
      <div class="d-flex" style="gap: 10px; flex-direction: column">
        <div class="d-flex row" style="gap: 10px">
          <v-text-field label="Title" v-model="title" variant="solo-filled" hide-details />
          <v-btn color="primary" @click="upload()">Upload</v-btn>
        </div>
        <div>
          <v-text-field
            v-model="description"
            label="Description"
            variant="solo-filled"
            textarea
          ></v-text-field>
        </div>
      </div>
    </v-card-text>
    <v-card-text>
      <div id="textEditor"></div>
    </v-card-text>
  </v-card>
</template>

<style>
.bytemd {
  height: calc(100vh- 94px);
}
</style>
