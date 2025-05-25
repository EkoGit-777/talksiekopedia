import { defineStore } from 'pinia'
import Pusher from 'pusher-js'
import { useChatStore } from './chat'
import { useRoomModel } from '@/models/room'
import { useUserModel } from '@/models/user'

interface State {
  pusher?: Pusher
}

// Pusher.logToConsole = true // print any event from pusher to console
export const usePusherStore = defineStore('pusher', {
  state: (): State => {
    return {
      pusher: undefined
    }
  },
  getters: {},
  actions: {
    init(key: string) {
      this.pusher = new Pusher(key, {
        cluster: 'ap1',
      })
    },
    subscribeNewRoom(channel: string) {
      if(this.pusher){
        this.pusher.subscribe(channel)
        this.pusher.bind('new-room', (event: {private: boolean}) => {
          if(event.private){
            const {fetchUser} = useUserModel()
            fetchUser()
          } else {
            const {fetchRoom} = useRoomModel()
            fetchRoom()
          }
        })
      }
    },
    subscribe(channel: string) {
      if(this.pusher){
        this.pusher.subscribe(channel)
        this.pusher.bind('new-chat', (event: ChatType) => {
          const chatStore = useChatStore()
          chatStore.insertChat(event)
        })
      }
    },
  },
})
