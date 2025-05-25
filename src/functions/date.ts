import { format } from 'date-fns'

export function useDateFormatter() {
  const formatDate = (dt: string | number | Date, fmt: string) => {
    return format(new Date(dt), fmt)
  }

  return {
    formatDate,
  }
}
