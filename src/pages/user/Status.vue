<template>
  <div class="page-wrapper">
    <AppBarUserComponent />
    <v-container
      class="mx-auto max-container my-5"
    >
      <h1
        v-for="n in 50"
        :key="n"
      >
        Contagem: {{ n }}
      </h1>
    </v-container>
    <FooterComponent />
    <BottomBarUserComponent />
  </div>
</template>
  
<script lang="ts" setup>
import { getTitle } from '@/utils/utils';
  
onMounted(() => {
  document.title = getTitle('Status do personagem');
});
</script>
  
<style scoped></style>