import { useToastStore } from "@/stores/toast"

export function useErrorHandler() {
  const toast = useToastStore()

  const showError = (errors: string[]) => {
      errors.forEach(error => toast.add(error))
  }

  return {
    showError
  }
}