<template>
  <v-card class="w-100">
    <template #title>
      {{ title }}
    </template>
    <template #subtitle>
      <span v-if="subtitle">{{ subtitle }}</span>
    </template>
    <v-card-text>
      {{ text }}
    </v-card-text>
  </v-card>
</template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
    subtitle?: string;
    text: string;
  }>();
  </script>
  
  <style scoped></style>
  