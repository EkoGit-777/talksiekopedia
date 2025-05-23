<script setup lang="ts">
import buttonIndex from './button-index.vue'
</script>
<template>
  <buttonIndex
    class="bg-gradient-from-blue-400 bg-gradient-to-blue-600 bg-gradient-to-r font-medium text-yellow rounded-8"
  >
    <slot></slot>
  </buttonIndex>
</template>
