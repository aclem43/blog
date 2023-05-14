import { ref } from 'vue'

export const snackBar = ref()
export const timeout = ref(2000)
export const text = ref('')
export const openSnackBar = (message: string, timeoutValue = 2000) => {
  text.value = message
  snackBar.value = true
  timeout.value = timeoutValue
}
