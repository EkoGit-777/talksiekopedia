<script setup lang="ts">
defineProps<{
  avatar: string
}>()
</script>
<template>
  <div class="rounded-full">
    <img v-lazy="avatar" alt="avatar" />
  </div>
</template>
