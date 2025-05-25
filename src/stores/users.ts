import { defineStore } from 'pinia'
import Pusher from 'pusher-js'

interface State {
  users: UserRoomType[]
}

Pusher.logToConsole = true // print any event from pusher to console
export const useUsersStore = defineStore('users', {
  state: (): State => {
    return {
      users: []
    }
  },
  getters: {},
  actions: {
    setUsers(users: UserRoomType[]) {
      this.users = users
    },
  },
})
