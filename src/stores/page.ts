import { defineStore } from 'pinia'

export const usePageStore = defineStore('Page', {
  state: () => ({
    showError403: false,
    showError404: false,
  }),
  actions: {
    resetErrorState() {
      this.showError403 = false
      this.showError404 = false
    },
    showNotFoundError() {
      this.showError404 = true
    },
    showForbiddenError() {
      this.showError403 = true
    },
  },
})
