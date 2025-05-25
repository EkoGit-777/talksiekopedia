<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import containerAccordion from '@/components/container/container-accordion.vue'
  import buttonIndex from '@/components/control/button-index.vue'
  import buttonNewChat from '@/components/control/button-new-chat.vue'
  import ModalForm from '@/components/modal/modal-form.vue'
  import { useRoomModel } from '@/models/room'
  import { useUserModel } from '@/models/user'
  import { usePusherStore } from '@/stores/pusher'
  import { useRoomsStore } from '@/stores/rooms'
  import { useUsersStore } from '@/stores/users'

  const router = useRouter()
  const roomsStore = useRoomsStore()
  const usersStore = useUsersStore()
  const pusherStore = usePusherStore()
  const { fetchRoom } = useRoomModel()
  const { fetchUser, startChat } = useUserModel()
  const roomAccordion = ref(true)
  const userAccordion = ref(true)
  const modalFormRef = ref<InstanceType<typeof ModalForm>>()

  const attemptCreateChatRoom = () => {
    modalFormRef.value?.open()
  }
  const attemptStartChat = async (target: number) => {
    const room = await startChat(target)
    if (room) {
      router.push({ name: 'privateChat', params: { code: room.code } })
    }
  }

  onMounted(() => {
    fetchRoom()
    fetchUser()
    pusherStore.init('965e719119116a6d8f01')
    pusherStore.subscribeNewRoom('talksiekopedia')
  })
</script>
<template>
  <div class="flex justify-between items-center flex-none p-16">
    <div class="font-bold text-yellow text20">Talksiekopedia</div>
    <div class="hidden sm:block">
      <buttonNewChat @click="attemptCreateChatRoom"></buttonNewChat>
    </div>
  </div>
  <div class="flex-auto flex-col w-full h-full overflow-y-auto space-y-16 px-12 pb-24">
    <containerAccordion
      :is-open="roomAccordion"
      :content-height="(roomsStore.rooms.length + 1) * 35"
    >
      <template #header>
        <buttonIndex
          class="w-full text-left flex justify-between items-center"
          @click="roomAccordion = !roomAccordion"
        >
          <div class="text16 font-medium text-yellow-300">
            # Rooms ({{ roomsStore.rooms.length + 1 }})
          </div>
          <i
            v-if="!roomAccordion"
            class="i-fas-caret-up inline-block text16 text-yellow"
          ></i>
          <i
            v-if="roomAccordion"
            class="i-fas-caret-down inline-block text16 text-yellow"
          ></i>
        </buttonIndex>
      </template>
      <div class="w-full py-4">
        <RouterLink :to="{ name: 'changeLog' }">
          <div class="text16 font-medium text-yellow-300 w-full"># Change Log</div>
        </RouterLink>
      </div>
      <div
        v-for="room in roomsStore.rooms"
        :key="room.code"
        class="w-full py-4"
      >
        <RouterLink :to="{ name: 'room', params: { code: room.code } }">
          <div class="text16 font-medium text-yellow-300 w-full"># {{ room.name }}</div>
        </RouterLink>
      </div>
    </containerAccordion>
    <containerAccordion
      :is-open="userAccordion"
      :content-height="(usersStore.users.length + 1) * 35"
    >
      <template #header>
        <buttonIndex
          class="w-full text-left flex justify-between items-center"
          @click="userAccordion = !userAccordion"
        >
          <div class="text16 font-medium text-yellow-300">
            # Users ({{ usersStore.users.length }})
          </div>
          <i
            v-if="!userAccordion"
            class="i-fas-caret-up inline-block text16 text-yellow"
          ></i>
          <i
            v-if="userAccordion"
            class="i-fas-caret-down inline-block text16 text-yellow"
          ></i>
        </buttonIndex>
      </template>
      <div
        v-for="user in usersStore.users"
        :key="user.id"
        class="w-full py-4"
      >
        <RouterLink
          v-if="user.room?.code"
          :to="{ name: 'privateChat', params: { code: user.room.code } }"
        >
          <div class="text16 font-medium text-yellow-300 w-full"># {{ user.name }}</div>
        </RouterLink>
        <buttonIndex
          v-else
          class="text16 font-medium text-yellow-300 w-full text-left"
          @click="attemptStartChat(user.id)"
        >
          # {{ user.name }}
        </buttonIndex>
      </div>
    </containerAccordion>
  </div>
  <div class="absolute block sm:hidden bottom-24 right-24 p-8 rounded-8 bg-primary-100">
    <buttonNewChat @click="attemptCreateChatRoom"></buttonNewChat>
  </div>
  <ModalForm ref="modalFormRef"></ModalForm>
</template>
