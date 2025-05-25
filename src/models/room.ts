import { reactive, ref } from 'vue'
import { useApi } from '@/functions/api'
import { useErrorHandler } from '@/functions/error-handler'
import { useRoomsStore } from '@/stores/rooms'
import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'
import { useChatStore } from '@/stores/chat'

export function useRoomModel() {
  const api = useApi()
  const errors = ref<string[]>([])
  const authStore = useAuthStore()
  const roomStore = useRoomsStore()
  const chatStore = useChatStore()
  const configStore = useConfigStore()
  const room = ref<RoomUserResponseType>()
  const { showError } = useErrorHandler()

  const formRoom = reactive({
    name: '',
  })

  const formChat = reactive({
    room_id: 0,
    message: '',
  })
  
  const fetchRoom = async() => {
    try {
      const response = await api.GET<RoomType[]>('rooms')
      roomStore.setRooms(response)
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false  
    }
  }

  const createRoom = async () => {
    try {
      await api.POST<RoomUserType>('room', formRoom)
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false      
    }
  }

  const viewRoom = async (code: string) => {
    try {
      room.value = await api.GET<RoomUserResponseType>(`room/${code}`)
      chatStore.messages = room.value.room_messages.map(chat => {
        return {
          ...chat,
          user: {
            id: chat.user.id,
            name: chat.user.name,
            avatar: configStore.api.avatar + chat.user.avatar,
          }
        }
      })
      let participant = null
      if(room.value.participant_1_id && room.value.participant_2_id){
        participant = room.value.participant_1_id == authStore.user.id ? room.value.participant_2 : room.value.participant_1
      }
      formChat.room_id = room.value.id
      if(participant) room.value.participant = {...participant, avatar: configStore.api.avatar + participant.avatar}
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false      
    }
  }

  const sendChat = async () => {
    try {
      await api.POST('chat', formChat)
      resetForm()
      return true
    } catch (error) {
      showError(api.formErrors(error))
      return false      
    }
  }

  const resetForm = () => {
    formRoom.name = ''
    formChat.message = ''
  }

  return {
    room,
    errors,
    formChat,
    formRoom,
    fetchRoom,
    createRoom,
    viewRoom,
    sendChat,
    resetForm
  }
}