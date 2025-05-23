<script setup lang="ts">
import containerAccordion from '@/components/container/container-accordion.vue'
import buttonIndex from '@/components/control/button-index.vue'
import buttonNewChat from '@/components/control/button-new-chat.vue'
import { ref } from 'vue'
import ModalForm from '@/components/modal/modal-form.vue'

const roomAccordion = ref(true)
const modalFormRef = ref<InstanceType<typeof ModalForm>>()

const attemptCreateChatRoom = () => {
  modalFormRef.value?.open()
}
</script>
<template>
  <div class="flex justify-between items-center flex-none p-16">
    <div class="font-bold text-yellow text20">Talksiekopedia</div>
    <div class="hidden sm:block">
      <buttonNewChat @click="attemptCreateChatRoom"></buttonNewChat>
    </div>
  </div>
  <div class="flex-auto flex-col w-full h-full overflow-y-auto px-12 pb-24">
    <containerAccordion :is-open="roomAccordion">
      <template #header>
        <buttonIndex
          class="w-full text-left flex justify-between items-center"
          @click="roomAccordion = !roomAccordion"
        >
          <div class="text16 font-medium text-yellow-300"># Rooms (10)</div>
          <i v-if="!roomAccordion" class="i-fas-caret-up inline-block text16 text-yellow"></i>
          <i v-if="roomAccordion" class="i-fas-caret-down inline-block text16 text-yellow"></i>
        </buttonIndex>
      </template>
      <div class="text16 font-medium text-yellow-300">
        <RouterLink :to="{ name: 'changeLog' }"># Change Log</RouterLink>
      </div>
      <div v-for="i in 10" :key="i">
        <div class="text16 font-medium text-yellow-300"># Room {{ i }}</div>
      </div>
    </containerAccordion>
  </div>
  <div class="absolute block sm:hidden bottom-24 right-24 p-8 rounded-8 bg-primary-100">
    <buttonNewChat @click="attemptCreateChatRoom"></buttonNewChat>
  </div>
  <ModalForm ref="modalFormRef"></ModalForm>
</template>
