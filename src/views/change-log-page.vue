<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import containerAvatar from '@/components/container/container-avatar.vue'
  import containerMessage from '@/components/container/container-message.vue'
  import buttonIndex from '@/components/control/button-index.vue'
  import { useLogStore } from '@/stores/change-log'

  const router = useRouter()
  const changeLogStore = useLogStore()
  const user = computed(() => {
    return { id: 0, name: changeLogStore.name, avatar: changeLogStore.avatar }
  })
  const list = computed(() =>
    changeLogStore.logs.map((log) => {
      return { created_at: log.date, message: log.message }
    }),
  )
</script>
<template>
  <div
    class="flex w-full bg-primary-100 justify-between items-center border-b border-primary-700 flex-none p-16"
  >
    <div class="flex space-x-12 items-center">
      <buttonIndex
        @click="router.go(-1)"
        class="block sm:hidden"
      >
        <i class="i-fas-arrow-left inline-block text20 text-primary"></i>
      </buttonIndex>
      <containerAvatar
        :avatar="changeLogStore.avatar"
        class="w-56 h-56"
      ></containerAvatar>
      <div class="text20 font-medium text-primary">{{ changeLogStore.name }}</div>
    </div>
  </div>
  <div class="flex-auto flex-col space-y-16 w-full h-full overflow-y-auto p-24">
    <containerMessage
      v-for="log in list"
      :key="log.created_at"
      :user="user"
      :message="log"
    ></containerMessage>
  </div>
</template>
