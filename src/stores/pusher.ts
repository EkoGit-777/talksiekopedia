import { defineStore } from 'pinia'
import Pusher from 'pusher-js'
import { useChatStore } from './chat'

interface State {
  pusher?: Pusher
}

Pusher.logToConsole = true // print any event from pusher to console
export const usePusherStore = defineStore('pusher', {
  state: (): State => {
    return {
      pusher: undefined
    }
  },
  getters: {},
  actions: {
    init() {
      this.pusher = new Pusher('965e719119116a6d8f01', {
        cluster: 'api',
      })
    },
    subscribe(channel: string) {
      if(this.pusher){
        this.pusher.subscribe(channel)
        this.pusher.bind('pusher:subscription_succeeded', () => console.log('subscription succeeded'))
        this.pusher.bind('new-chat', (event: ChatType) => {
          const chatStore = useChatStore()
          chatStore.insertChat(event)
        })
      }
    },
  },
})
