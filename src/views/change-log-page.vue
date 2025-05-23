<script setup lang="ts">
import containerAvatar from '@/components/container/container-avatar.vue'
import { useLogStore } from '@/stores/change-log'
import containerMessage from '@/components/container/container-message.vue'
import { computed } from 'vue'

const changeLogStore = useLogStore()
const list = computed(() =>
  changeLogStore.logs.map((log) => {
    return { date: log.date, message: log.message }
  }),
)
</script>
<template>
  <div
    class="flex w-full bg-primary-100 justify-between items-center border-b border-primary-700 flex-none p-16"
  >
    <div class="flex space-x-12 items-center">
      <containerAvatar :avatar="changeLogStore.avatar" class="w-56 h-56"></containerAvatar>
      <div class="text20 font-medium text-primary">{{ changeLogStore.username }}</div>
    </div>
  </div>
  <div class="flex-auto flex-col space-y-16 w-full h-full overflow-y-auto p-24">
    <containerMessage v-for="log in list" :key="log.date" :message="log"></containerMessage>
  </div>
</template>
