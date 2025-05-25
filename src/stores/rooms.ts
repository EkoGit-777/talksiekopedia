import { defineStore } from 'pinia'
import Pusher from 'pusher-js'

interface State {
  rooms: RoomType[]
}

Pusher.logToConsole = true // print any event from pusher to console
export const useRoomsStore = defineStore('rooms', {
  state: (): State => {
    return {
      rooms: []
    }
  },
  getters: {},
  actions: {
    setRooms(rooms: RoomType[]) {
      this.rooms = rooms
    },
  },
})
