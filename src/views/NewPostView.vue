<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { basicSetup, EditorView } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

// The Markdown parser will dynamically load parsers
// for code blocks, using @codemirror/language-data to
// look up the appropriate dynamic import.
onMounted(() => {
  let view = new EditorView({
    doc: "Hello\n\n```javascript\nlet x = 'y'\n```",
    extensions: [basicSetup, markdown({ codeLanguages: languages })],
    parent: document.getElementById('textEditor') as HTMLElement
  })
})
</script>
<template>
  <div id="textEditor"></div>
</template>

<style>
.bytemd {
  height: calc(100vh- 94px);
}
</style>
