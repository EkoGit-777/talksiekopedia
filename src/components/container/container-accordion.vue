<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const content = ref<HTMLDivElement>()

const height = computed(() => content.value?.scrollHeight ?? 0)
</script>

<template>
  <div>
    <slot name="header"></slot>
    <div
      ref="content"
      class="h-0 overflow-hidden duration-500 ease-in-out divide-y divide-gray-200"
      :style="{ height: isOpen ? height + 'px' : 0 }"
    >
      <slot></slot>
    </div>
  </div>
</template>
