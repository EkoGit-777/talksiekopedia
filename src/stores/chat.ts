import { defineStore } from 'pinia'

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
      this.messages.push(newChat)
    }
  },
})
