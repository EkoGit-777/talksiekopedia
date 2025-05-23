<script setup lang="ts">
defineProps<{
  reverse?: boolean
  message: MessageType
}>()
</script>
<template>
  <div class="flex" :class="{ 'flex-row-reverse': reverse }">
    <div class="flex relative" :class="reverse ? 'pr-4' : 'pl-4'">
      <div
        class="absolute top-0 w-16 h-12"
        :class="reverse ? 'right-0 -skew-x-50 bg-yellow' : 'left-0 skew-x-50 bg-primary'"
      ></div>
      <div
        class="w-full p-12 text12 rounded-8 text-white whitespace-pre-line"
        :class="reverse ? 'bg-yellow' : 'bg-primary'"
      >
        {{ message.message }}
      </div>
    </div>
    <div class="w-56 sm:w-72 md:w-96 lg:w-128 xl:w-168 flex-none"></div>
  </div>
</template>
