<script setup lang="ts">
import buttonIndex from './button-index.vue'
</script>
<template>
  <buttonIndex
    class="bg-gradient-from-yellow-400 bg-gradient-to-yellow-600 bg-gradient-to-r font-medium text-blue rounded-8"
  >
    <slot></slot>
  </buttonIndex>
</template>
