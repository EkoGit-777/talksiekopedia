<script setup lang="ts">
  import { computed, ref } from 'vue'
  import containerAvatar from '@/components/container/container-avatar.vue'
  import { useAuthStore } from '@/stores/auth'
  import { useConfigStore } from '@/stores/config'
  import { useListStore } from '@/stores/list'
  import buttonPrimary from '../control/button-primary.vue'
  import ModalApp from './modal-app.vue'

  const emit = defineEmits<{
    (e: 'canceled'): void
    (e: 'submit', data: string): void
  }>()

  const authStore = useAuthStore()
  const listStore = useListStore()
  const configStore = useConfigStore()
  const modal = ref<InstanceType<typeof ModalApp>>()
  const selected = ref('')
  const avatarList = computed(() => {
    return [
      ...listStore.colorTemplate.map(
        (color) =>
          `name?name=${authStore.user.name}` +
          `&background=${color.background}&color=${color.text}`,
      ),
      ...listStore.publicAvatar,
    ]
  })
  const open = (avatar: string) => {
    selected.value = avatar
    modal.value?.open()
  }
  const close = () => {
    modal.value?.close()
  }
  const submit = () => {
    emit('submit', selected.value)
    close()
  }
  defineExpose({ open, close })
</script>
<template>
  <ModalApp
    ref="modal"
    @canceled="emit('canceled')"
  >
    <div>
      <div class="modal-title truncate">Select Avatar</div>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-16 p-16 lg:px-24">
        <template
          v-for="avatar in avatarList"
          :key="avatar"
        >
          <div
            class="flex justify-center p-8 items-center rounded-8 cursor-pointer"
            :class="{
              'bg-yellow-200 bg-opacity-50 border border-yellow': avatar == selected,
            }"
            @click="selected = avatar"
          >
            <containerAvatar
              :avatar="configStore.api.avatar + avatar"
              class="w-64 h-64 sm:w-48 sm:h-48"
            ></containerAvatar>
          </div>
        </template>
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
