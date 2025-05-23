import { defineStore } from 'pinia'

interface State {
  api: {
    avatar: string
  }
}

export const useConfigStore = defineStore('config', {
  state: (): State => {
    return {
      api: {
        avatar: 'https://avatar.iran.liara.run/'
      }
    }
  },
  getters: {},
  actions: {},
})
