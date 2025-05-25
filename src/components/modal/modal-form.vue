<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoomModel } from '@/models/room'
  import buttonIndex from '../control/button-index.vue'
  import buttonPrimary from '../control/button-primary.vue'
  import inputIndex from '../input/input-index.vue'
  import ModalApp from './modal-app.vue'

  const emit = defineEmits<{
    (e: 'canceled'): void
  }>()

  const { formRoom, createRoom, resetForm } = useRoomModel()
  const modal = ref<InstanceType<typeof ModalApp>>()

  const open = () => {
    modal.value?.open()
    resetForm()
  }
  const close = () => {
    modal.value?.close()
  }
  const submit = async () => {
    const response = await createRoom()
    if (response) close()
  }
  defineExpose({ open, close })
</script>
<template>
  <ModalApp
    ref="modal"
    @canceled="emit('canceled')"
    :can-click-outside="false"
  >
    <div>
      <div class="modal-title flex justify-between items-center">
        <div class="truncate">Create New Room</div>
        <buttonIndex @click="close">
          <i class="i-fas-xmark inline-block text20"></i>
        </buttonIndex>
      </div>
      <div class="p-24">
        <inputIndex
          v-model="formRoom.name"
          class="w-full border border-gray-7 rounded-8 py-8 px-12 text10"
          placeholder="Input room name"
        ></inputIndex>
      </div>
      <div class="flex justify-end p-16">
        <buttonPrimary
          class="w-full sm:w-fit px-24 py-4"
          @click="submit"
        >
          Confirm
        </buttonPrimary>
      </div>
    </div>
  </ModalApp>
</template>
