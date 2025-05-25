<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import containerAvatar from '@/components/container/container-avatar.vue'
  import containerMessage from '@/components/container/container-message.vue'
  import buttonIndex from '@/components/control/button-index.vue'
  import inputIndex from '@/components/input/input-index.vue'
  import { useRoomModel } from '@/models/room'
  import { useAuthStore } from '@/stores/auth'
  import { useChatStore } from '@/stores/chat'
  import { usePusherStore } from '@/stores/pusher'

  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()
  const pusherStore = usePusherStore()
  const chatStore = useChatStore()
  const { room, formChat, viewRoom, sendChat } = useRoomModel()
  const roomCode = computed(() => String(route.params.code ?? ''))

  const attemptSendChat = async () => {
    await sendChat()
  }

  onMounted(() => {
    pusherStore.init('965e719119116a6d8f01')
    if (roomCode.value != '') {
      pusherStore.subscribe(roomCode.value)
      viewRoom(roomCode.value)
    }
  })
</script>
<template>
  <div
    class="flex w-full h-80 bg-primary-100 justify-between items-center border-b border-primary-700 flex-none p-16"
  >
    <div class="flex space-x-12 items-center">
      <buttonIndex
        @click="router.go(-1)"
        class="block sm:hidden"
      >
        <i class="i-fas-arrow-left inline-block text20 text-primary"></i>
      </buttonIndex>
      <template v-if="room?.participant">
        <containerAvatar
          :avatar="room.participant.avatar"
          class="w-56 h-56"
        ></containerAvatar>
        <div class="text20 font-medium text-primary">{{ room.participant.name }}</div>
      </template>
      <template v-else>
        <div class="w-56 h-56 rounded-full bg-primary flex justify-center items-center">
          <i class="i-fas-comments inline-block text20 text-yellow"></i>
        </div>
        <div class="text20 font-medium text-primary">{{ room?.name }}</div>
      </template>
    </div>
  </div>
  <div class="flex flex-auto flex-col space-y-16 w-full grow overflow-y-auto p-24">
    <containerMessage
      v-for="chat in chatStore.messages"
      :key="chat.created_at"
      :message="chat"
      :user="chat.user"
      :reverse="chat.user.id == authStore.user.id"
    ></containerMessage>
  </div>
  <div class="flex bg-primary p-4 h-48 w-full">
    <inputIndex
      v-model="formChat.message"
      class="w-full py-8 p-4"
    ></inputIndex>
    <buttonIndex
      class="text18 flex justify-center items-center px-12 text-yellow space-x-8"
      @click="attemptSendChat"
    >
      <i class="i-fas-paper-plane inline-block"></i>
      <span>Send</span>
    </buttonIndex>
  </div>
</template>
