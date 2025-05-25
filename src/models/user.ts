import { ref } from 'vue'
import { useApi } from '@/functions/api'
import { useErrorHandler } from '@/functions/error-handler'
import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'
import { useUsersStore } from '@/stores/users'

export function useUserModel() {
  const api = useApi()
  const autStore = useAuthStore()
  const configStore = useConfigStore()
  const usersStore = useUsersStore()
  const errors = ref<string[]>([])
  const user = ref<UserType>()
  const users = ref<UserRoomType[]>([])
  const { showError } = useErrorHandler()
  
  const fetchUser = async() => {
    try {
      const response = await api.GET<UserRoomResponseType[]>('users')
      let room = <RoomUserType|null>null
      users.value = response.map(user => {
        const  room1 = user.rooms_1.filter(room => room.participant_2_id == autStore.user.id)
        if(room1.length > 0) {
          room = room1[0]
        } else {
          const  room2 = user.rooms_2.filter(room => room.participant_1_id == autStore.user.id)
          if(room2.length > 0) room = room2[0]
        }
        return {
          id: user.id,
          name: user.name,
          avatar: configStore.api.avatar + user.avatar,
          room: room,
        }
      })
      usersStore.setUsers(users.value)
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false  
    }
  }

  const viewUser = async () => {
    try {
      user.value = await api.GET<UserType>('user')
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false      
    }
  }

  const startChat = async (target: number) => {
    try {
      const response = await api.POST<RoomType>('room', {target: target})
      return response
    } catch (error) {
      showError(api.formErrors(error))
      return false      
    }
  }

  return {
    user,
    users,
    errors,
    fetchUser,
    viewUser,
    startChat
  }
}