import axios, { type AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { usePageStore } from '@/stores/page'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'

export function useApi() {
  const router = useRouter()
  const page = usePageStore()
  const toast = useToastStore()
  const authStore = useAuthStore()

  const config = {
    baseURL: import.meta.env.VITE_URL_API,
    timeout: 30000, // 30s
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Timezone-Offset': -new Date().getTimezoneOffset(),
      Passcode: authStore.user.passcode
    },
    withCredentials: true,
    withXSRFToken: true,
  }

  const REQUEST = <T>(conf: AxiosRequestConfig, retryIfCsrfError = true) => {
    return new Promise<T>(async (resolve, reject) => {
      const requestConfig = { ...config, ...conf }
      try {
        const response = await axios.request(requestConfig)
        resolve(response.data)
      } catch (error) {
        if (isCsrfTokenError(error) && retryIfCsrfError) {
          await GET('/sanctum/csrf-cookie')
          resolve(REQUEST(conf, false))
        } else {
          handleErrors(error)
          reject(error)
        }
      }
    })
  }
  const GET = <T>(url: string, params?: object) =>
    REQUEST<T>({ method: 'get', url, params })
  const POST = <T>(url: string, data?: object) =>
    REQUEST<T>({ method: 'post', url, data })
  const PUT = <T>(url: string, data?: object) => REQUEST<T>({ method: 'put', url, data })
  const DELETE = <T>(url: string, data?: object) =>
    REQUEST<T>({ method: 'delete', url, data })

  const onError = {
    validationFailed: () => {
      toast.add('Terdapat kesalahan pada data yang dikirim')
      setTimeout(() => {
        const errorMessage = document.querySelector('.error-msg')
        errorMessage?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    },
    unauthorized: () => {
      if (window.location.pathname !== '/login') {
        const path = encodeURI(location.pathname.substring(1) + location.search)
        const query = path ? { r: path } : {}
        router.replace({ name: 'login', query })
      }
    },
    maintenance: () => {
      router.replace({ name: 'maintenance' })
    },
    forbidden: () => {
      page.showForbiddenError()
    },
    notFound: () => {
      page.showNotFoundError()
    },
    csrfTokenError: () => {
      toast.add('Session error, clear your cache and try again')
    },
    tooManyRequest: () => {
      toast.add('Please wait a short while before attempting again.')
    },
    networkError: () => {
      toast.add('No Internet Connection')
    },
    unknown: () => {
      //
    },
  }

  /* https://github.com/axios/axios#handling-errors */
  const handleErrors = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      /**
       * Not axios error
       * Something happened in setting up the request that triggered an Error
       */
      return
    }

    if (error.message === 'Network Error') {
      onError.networkError()
      return
    }

    if (error.response) {
      switch (error.response?.status) {
        case 401:
          return onError.unauthorized()
        case 403:
          return onError.forbidden()
        case 404:
          return onError.notFound()
        case 419:
          return onError.csrfTokenError()
        case 422:
          return onError.validationFailed()
        case 429:
          return onError.tooManyRequest()
        case 503:
          return onError.maintenance()
        default:
          return onError.unknown()
      }
    }

    /**
     * The request was made but no response was received.
     * `error.request` is an instance of XMLHttpRequest
     * in the browser and an instance of
     * http.ClientRequest in node.js
     */
    // if (error.request) {
    // }
  }

  const isCsrfTokenError = (error: unknown): boolean => {
    if (!axios.isAxiosError(error)) {
      return false
    }

    return (
      error.response?.status === 419 ||
      error.response?.data.message === 'CSRF token mismatch.'
    )
  }

  const formErrors = (error: unknown): string[] => {
    if (axios.isAxiosError(error) && error.response?.data.errors) {
      return error.response.data.errors
    }

    return []
  }

  return {
    GET,
    POST,
    DELETE,
    PUT,
    formErrors,
    onError,
    config,
  }
}
