<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-icon
      size="100"
      color="primary"
    >
      mdi-alert-circle-outline
    </v-icon>
    <h1 class="text-h4 mt-4">
      404 - Página Não Encontrada
    </h1>
    <p class="text-subtitle-1">
      A página que você tentou acessar não existe.
    </p>
    <v-btn
      class="mt-4"
      color="primary"
      @click="goHome"
    >
      Voltar para Home
    </v-btn>
    <!-- <v-icon
      size="100"
      color="primary"
    >
      mdi-account
    </v-icon>
    <v-btn
      href="https://pictogrammers.com/library/mdi/"
      target="_blank"
    >
      Link
    </v-btn> -->
  </v-container>
</template>

<script lang="ts" setup>
import { getTitle } from '@/utils/utils';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  document.title = getTitle('Página Não Encontrada');
});

const goHome = () => {
  router.push('/');
};
</script>

<style scoped></style>
