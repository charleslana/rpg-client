<template>
  <v-app-bar
    v-if="!drawer"
    app
    color="transparent"
    flat
    absolute
  >
    <v-container class="d-flex align-center">
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon
          size="36"
        >
          mdi-menu
        </v-icon>
      </v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    location="left"
    class="custom-drawer"
  >
    <v-list v-model:opened="openedGroups">
      <v-list-group
        v-for="category in menu"
        :key="category.title"
        :value="category.title"
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-icon
              left
              :class="category.icon"
            />
            {{ category.title }}
          </v-list-item>
        </template>
        <v-list-item
          v-for="item in category.items"
          :key="item.value"
          @click="selectGroup(item.value, item.link)"
        >
          <v-icon
            left
            v-bind="item.icon.startsWith('ra') ? { class: item.icon } : { icon: item.icon }"
          />
          {{ item.title }}
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const group = ref<string | null>(null);

const openedGroups = ref(['Personagem', 'Termos e Regras']);

const menu = ref([
  {
    title: 'Personagem',
    icon: 'ra ra-monster-skull',
    items: [
      { title: 'Login', value: 'item1', icon: 'mdi-home-account', link: '/' },
      { title: 'Cadastro', value: 'item2', icon: 'mdi-home-account', link: '/register/ZW1haWxAZW1haWwuY29t' },
    ],
  },
  {
    title: 'Termos e Regras',
    icon: 'ra ra-help',
    items: [
      { title: 'Termos de Serviço', value: 'item3', icon: 'ra ra-shield', link: '/tos' },
      { title: 'Regras', value: 'item4', icon: 'ra ra-metal-gate', link: '/rules' },
    ],
  },
]);

const router = useRouter();

const selectGroup = (value: string, link: string) => {
  group.value = value;
  router.push(link);
};

watch(group, () => {
  drawer.value = false;
});

watch(drawer, (isOpen) => {
  const html = document.documentElement;
  if (isOpen) {
    html.classList.add('v-overlay-scroll-blocked');
    html.style.setProperty('--v-body-scroll-x', '0px');
    html.style.setProperty('--v-body-scroll-y', '0px');
    return;
  }
  html.classList.remove('v-overlay-scroll-blocked');
  html.style.removeProperty('--v-body-scroll-x');
  html.style.removeProperty('--v-body-scroll-y');
});
</script>

<style>
.v-main {
  padding-top: 0px !important;
}
</style>

<style scoped>
.custom-drawer {
  top: 0 !important;
  height: 100vh !important;
}
</style>
