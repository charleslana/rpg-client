<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <img
      src="@/assets/images/botao-de-inicio.png"
      alt="Ícone de Início"
      class="mr-2"
    >
    <h1 class="text-h4">
      Bem-vindo à Página Inicial
    </h1>
    <p class="text-subtitle-1">
      Esta é a página principal da aplicação.
    </p>
    <v-btn-group class="mt-4">
      <v-btn
        color="primary"
        @click="goToAbout"
      >
        Ir para About
      </v-btn>
      <v-btn
        color="error"
        to="/rota-inexistente"
      >
        Rota Inexistente
      </v-btn>
      <v-btn
        color="warning"
        class="with-icon"
      >
        Com imagem
      </v-btn>
    </v-btn-group>
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { getTitle } from '@/utils/utils';

const router = useRouter();

onMounted(() => {
  document.title = getTitle('Home');
});

const goToAbout = () => {
  router.push('/about');
};
</script>

<style scoped>
.with-icon {
  background-image: url('@/assets/images/botao-de-inicio.png');
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 36px;
}
</style>
