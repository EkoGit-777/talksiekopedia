<script setup lang="ts"></script>
<template>
  <div class="h-dvh">
    <router-view :key="$route.fullPath" />
  </div>
</template>
