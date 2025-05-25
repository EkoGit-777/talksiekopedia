<script setup lang="ts">
  import sidemenuComponent from '@/layouts/sidemenu-component.vue'
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()
</script>
<template>
  <div class="sm:hidden flex-col flex w-full bg-primary-700 h-full relative">
    <sidemenuComponent></sidemenuComponent>
  </div>
  <div class="hidden flex-col sm:flex w-full justify-center p-24 h-full items-center">
    <img
      src="/images/logo-small.png"
      alt="logo"
      class="w-80 md:w-88 lg:w-104 xl:w-128"
    />
    <div class="text20 text-yellow-600 font-bold">Welcome {{ authStore.user.name }},</div>
    <div class="text-yellow-600 text18 text-center">
      Your chat is not encrypted. So, use this app at your own risk. Hehe...
    </div>
  </div>
</template>
