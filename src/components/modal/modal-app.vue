<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Props {
  canClickOutside?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  canClickOutside: true,
})
const emit = defineEmits<{
  (e: 'opened'): void
  (e: 'closed'): void
  (e: 'canceled'): void
  (e: 'clickOutside'): void
}>()

const display = ref(false)
const dim = ref(false)

const open = () => {
  dim.value = true
  nextTick(() => {
    display.value = true
  })
}
const close = () => {
  display.value = false
}
const afterLeave = () => {
  dim.value = false
  emit('closed')
}
const clickOutside = () => {
  if (props.canClickOutside) {
    emit('canceled')
    close()
  } else {
    emit('clickOutside')
  }
}
defineExpose({ open, close })
</script>

<template>
  <teleport to="body">
    <div
      v-if="dim"
      class="fixed bottom-0 z-100 h-full w-full flex items-end justify-center pt-64 sm:inset-0 sm:items-center sm:py-96"
    >
      <div class="modal-background fixed inset-0" @click="clickOutside"></div>

      <transition name="modal" @after-leave="afterLeave" @after-enter="emit('opened')">
        <div
          v-if="display"
          class="z-10 h-fit max-h-full w-full sm:max-w-640 flex flex-col overflow-y-auto bg-white sm:rounded-8"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="postcss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s ease,
    margin-top 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  margin-top: -50px;
  opacity: 0;
}
</style>
