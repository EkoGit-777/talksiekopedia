<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import containerToast from './components/container/container-toast.vue'
</script>

<template>
  <router-view />
  <containerToast />
</template>
