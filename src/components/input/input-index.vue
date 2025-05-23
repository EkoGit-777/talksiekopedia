<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string | null
  allowBlank?: boolean
}>()
const emit = defineEmits<{
  (e: 'change', data: string): void
  (e: 'update:modelValue', data: string): void
}>()

const inputRef = ref<HTMLInputElement>()
const inputText = computed({
  set(newValue: string) {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  },
  get() {
    return props.modelValue ?? ''
  },
})
const focus = () => {
  inputRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <input ref="inputRef" v-model="inputText" class="focus:outline-none" type="text" />
</template>
