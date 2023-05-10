import { ref } from 'vue'
import { type ThemeDefinition } from 'vuetify'
export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#1976D2',
    secondary: '#383838',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#1976D2',
    secondary: '#cccccc',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

type Theme = 'lightTheme' | 'darkTheme'
export const themeRef = ref<Theme>('darkTheme')

export const initTheme = () => {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'darkTheme')
    themeRef.value = 'darkTheme'
  }
  themeRef.value = localStorage.getItem('theme') as Theme
}

export const saveTheme = () => {
  localStorage.setItem('theme', themeRef.value)
}
