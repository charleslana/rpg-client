<template>
  <div class="page-wrapper">
    <AppBarComponent />
    <HeaderImageComponent />
    <v-container class="mx-auto max-container my-5">
      <div class="text-h4 text-center mb-5">
        Termos de Serviço
      </div>
      <v-list
        :items="terms"
        lines="three"
        item-props
        class="v-list-transparent v-list-item--99-line"
      >
        <template #subtitle="{ subtitle }">
          <ul class="pl-4">
            <li
              v-for="(item, i) in subtitle"
              :key="i"
            >
              {{ item }}
            </li>
          </ul>
        </template>
      </v-list>
    </v-container>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getTitle } from '@/utils/utils';

const terms = ref([
  {
    title: '1. Notas Preliminares',
    subtitle: [
      'O uso do Solo Leveling RPG requer a aceitação dos Termos de Serviço.',
      'As disposições garantem um ambiente seguro e justo para todos os usuários.',
    ],
  },
  {
    title: '2. Serviços e Conteúdos',
    subtitle: [
      'Solo Leveling RPG é um jogo de RPG online.',
      'O usuário tem direito de acessar o jogo mediante cadastro.',
    ],
  },
  {
    title: '3. Obrigações dos Usuários',
    subtitle: [
      'O usuário deve utilizar a plataforma de forma legal.',
      'Informações fornecidas no cadastro devem ser corretas e atualizadas.',
    ],
  },
  {
    title: '4. Responsabilidade',
    subtitle: [
      'Solo Leveling RPG não garante disponibilidade de 100% dos serviços.',
      'Não nos responsabilizamos por danos decorrentes da indisponibilidade dos serviços.',
    ],
  },
  {
    title: '5. Proteção de Dados',
    subtitle: [
      'O usuário aceita que suas informações sejam processadas conforme os Termos de Serviço.',
      'Os dados são tratados de forma confidencial e com a autorização do usuário.',
    ],
  },
  {
    title: '6. Regulamento para a Atividade do Jogo',
    subtitle: [
      'Todos os conteúdos e serviços seguem as regras do jogo.',
      'O usuário deve cumprir as regras estabelecidas.',
    ],
  },
  {
    title: '7. Cláusula Final',
    subtitle: [
      'Os conteúdos são protegidos por direitos autorais.',
      'O usuário deve revisar regularmente os Termos de Serviço para se manter atualizado.',
    ],
  },
]);

onMounted(() => {
  document.title = getTitle('Termos de Serviço');
});
</script>

<style scoped></style>
