import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { useListStore } from './list'

interface State {
  user: AuthType
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {
        id: 0,
        name: '',
        avatar: '',
        passcode: '',
      },
    }
  },
  getters: {
    getAvatar(state) {
      const configStore = useConfigStore()
      return configStore.api.avatar + state.user.avatar
    }
  },
  actions: {
    setUser(auth: AuthType) {
      this.user = auth
    },
    setUsername(name: string) {
      this.user.name = name
      const listStore = useListStore()
      if(this.user.avatar == '' || this.user.avatar.includes('name'))
      this.setAvatar(`username?username=${name}&background=${listStore.colorTemplate[0].background}&color=${listStore.colorTemplate[0].text}`)
    },
    setAvatar(query: string) {
      this.user.avatar = query
    }
  },
})
