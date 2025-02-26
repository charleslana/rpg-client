<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <h1 class="text-h4">
      E-mail
    </h1>
    <p class="text-subtitle-1">
      {{ authStore.email }}
    </p>
    <p class="text-subtitle-2">
      {{ email }}
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
import { useAuthStore } from '@/stores/auth';
import { getTitle } from '@/utils/utils';
import { useRoute } from 'vue-router';
  
onMounted(() => {
  document.title = getTitle('Cadastro');
});

const route = useRoute();

const email = ref(route.query.email || '');

const authStore = useAuthStore();
</script>

<style scoped></style>