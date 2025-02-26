<template>
  <h1>Modelo de página</h1>
</template>

<script lang="ts" setup>
import { getTitle } from '@/utils/utils';

onMounted(() => {
  document.title = getTitle('Título da página');
});
</script>

<style scoped></style>
