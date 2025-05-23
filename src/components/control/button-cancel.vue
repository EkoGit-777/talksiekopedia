<script setup lang="ts">
import buttonIndex from './button-index.vue'
</script>
<template>
  <buttonIndex
    class="bg-gradient-from-gray-400 bg-gradient-to-gray-600 bg-gradient-to-r text-white font-medium rounded-8"
  >
    <slot></slot>
  </buttonIndex>
</template>
