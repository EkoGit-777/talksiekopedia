<script setup lang="ts">
  import { useDateFormatter } from '@/functions/date'
  import containerAvatar from './container-avatar.vue'

  const { formatDate } = useDateFormatter()
  defineProps<{
    user: UserType
    reverse?: boolean
    message: MessageType
  }>()
</script>
<template>
  <div
    class="flex"
    :class="{ 'flex-row-reverse': reverse }"
  >
    <containerAvatar
      :avatar="user.avatar"
      class="w-48 h-48"
      :class="reverse ? 'ml-16' : 'mr-16'"
    ></containerAvatar>
    <div
      class="flex relative"
      :class="reverse ? 'pr-4' : 'pl-4'"
    >
      <div
        class="absolute top-0 w-16 h-12"
        :class="
          reverse ? 'right-0 -skew-x-50 bg-yellow-700' : 'left-0 skew-x-50 bg-primary'
        "
      ></div>
      <div
        class="min-w-128 w-full p-12 rounded-8 text-white whitespace-pre-line"
        :class="reverse ? 'bg-yellow-700' : 'bg-primary'"
      >
        <div class="text8 font-bold">{{ user.name }}</div>
        <div class="text12">{{ message.message }}</div>
        <div class="text8 text-right">
          {{ formatDate(message.created_at, 'EEE, d MMM yyyy') }}
        </div>
      </div>
    </div>
    <div class="w-56 sm:w-72 md:w-96 lg:w-128 xl:w-168 flex-none"></div>
  </div>
</template>
