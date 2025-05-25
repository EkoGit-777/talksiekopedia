<script setup lang="ts">
  import { useStorage } from '@vueuse/core'
  import { onBeforeMount, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import sidemenuComponent from './sidemenu-component.vue'

  const router = useRouter()
  const authStore = useAuthStore()
  const authStorage = useStorage('auth', authStore.user)
  const allowMount = ref(false)

  onBeforeMount(() => {
    if (authStorage.value.passcode == '') {
      router.push({ name: 'login' })
    } else {
      authStore.setUser(authStorage.value)
      allowMount.value = true
    }
  })
</script>
<template>
  <div
    v-if="allowMount"
    class="h-dvh overflow-hidden xl:p-12 w-full bg-gray-950"
  >
    <div class="h-dvh w-full flex divide-x">
      <div
        class="hidden flex-none flex-col sm:flex sm:w-300 md:w-360 lg:w-420 bg-primary-700 h-full relative"
      >
        <sidemenuComponent></sidemenuComponent>
      </div>
      <div class="flex flex-col w-full bg-primary-100 h-dvh">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>
