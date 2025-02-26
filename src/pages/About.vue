<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <h1 class="text-h4">
      Sobre a Aplicação
    </h1>
    <p class="text-subtitle-1">
      Aqui você encontra informações sobre o projeto.
    </p>
    <v-btn
      class="mt-4"
      color="primary"
      variant="outlined"
      to="/"
    >
      Voltar para Home
    </v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { getTitle } from '@/utils/utils';

onMounted(() => {
  document.title = getTitle('Sobre');
});
</script>

<style scoped></style>
