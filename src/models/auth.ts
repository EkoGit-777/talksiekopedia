import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/functions/api'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useErrorHandler } from '@/functions/error-handler'

export function useAuthModel() {
  const toast = useToastStore()
  const errors = ref<string[]>([])
  const auth = useAuthStore()
  const router = useRouter()
  const { showError } = useErrorHandler()

  const formRegister = reactive({
    name: '',
    avatar: '',
  })

  const attemptRegister = async () => {
    const api = useApi()
    formRegister.avatar = auth.user.avatar
    try {
      const response = await api.POST<AuthType>('user', formRegister)
      auth.setUser(response)
      toast.add('Welcome, ' + response.name)
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false
    }
  }

  const attemptLogin = async () => {
    const api = useApi()
    try {
      const response = await api.GET<AuthType>('user')
      auth.setUser(response)
      toast.add('Welcome, ' + response.name)
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false
    }
  }

  const attemptLogout = async () => {
    try {
      // auth.removeUser()
      router.replace({ name: 'login' })
    } finally {}
  }

  const resetForm = () => {
    formRegister.name = ''
    formRegister.avatar = ''
  }

  return {
    errors,
    formRegister,
    attemptRegister,
    attemptLogin,
    attemptLogout,
    resetForm
  }
}