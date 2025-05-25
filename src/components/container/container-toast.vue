<script setup lang="ts">
  import { useToastStore } from '@/stores/toast'

  const toast = useToastStore()
</script>

<template>
  <div class="toast-wrapper text12">
    <transition-group name="toast">
      <div
        v-for="{ id, message } in toast.toasts"
        :key="id"
        class="text10 toast-items"
      >
        {{ message }}
      </div>
    </transition-group>
  </div>
</template>

<style lang="postcss" scoped>
  .toast-wrapper {
    @apply pointer-events-none fixed inset-x-0 bottom-48 z-50 flex flex-col;
  }
  .toast-items {
    @apply mx-auto mb-8 max-w-7xl px-16 py-4 text-white;
    background: #000000aa;
    transition: all 0.8s ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
  }
</style>
