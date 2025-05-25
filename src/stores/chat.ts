import { defineStore } from 'pinia'
import { useConfigStore } from './config'

interface State {
  messages: ChatType[]
}

export const useChatStore = defineStore('chat', {
  state: (): State => {
    return {
      messages: []
    }
  },
  getters: {},
  actions: {
    insertChat(newChat: ChatType) {
      const configStore = useConfigStore()
      this.messages.push({...newChat, user: {
        id: newChat.user.id,
        name: newChat.user.name,
        avatar: configStore.api.avatar + newChat.user.avatar,
      }})
    }
  },
})
