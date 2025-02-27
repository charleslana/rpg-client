<template>
  <v-overlay
    v-model="visible"
    persistent
    scroll-strategy="block"
  />
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
  
const props = defineProps<{ isVisible: boolean }>();
  
const visible = computed(() => props.isVisible);
</script>

<style scoped></style>