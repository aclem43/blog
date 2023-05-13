import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { darkTheme, lightTheme } from './scripts/theme'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
      lightTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

app.use(router)
app.use(vuetify)

app.mount('#app')
