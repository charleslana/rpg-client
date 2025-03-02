<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
    location="left"
    class="custom-drawer"
    width="280"
  >
    <v-list v-model:opened="openedGroups">
      <v-list-group
        v-for="category in menu"
        :key="category.title"
        :value="category.title"
      >
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <template v-if="category.icon.startsWith('ra')">
              <v-icon
                left
                v-bind="{ class: category.icon }"
                class="mr-2"
              />
            </template>
            <template v-else-if="category.icon.startsWith('mdi')">
              <v-icon
                left
                v-bind="{ icon: category.icon }"
                class="mr-2"
              />
            </template>
            <template v-else>
              <v-img
                :src="category.icon"
                width="24"
                height="24"
                contain
                class="mr-2"
              />
            </template>
            {{ category.title }}
          </v-list-item>
        </template>
        <v-list-item
          v-for="item in category.items"
          :key="item.value"
          class="d-flex align-center menu-item"
          @click="handleClick(item.value, item.link)"
        >
          <template v-if="item.icon.startsWith('ra')">
            <v-icon
              left
              v-bind="{ class: item.icon }"
              class="mr-2"
            />
          </template>
          <template v-else-if="item.icon.startsWith('mdi')">
            <v-icon
              left
              v-bind="{ icon: item.icon }"
              class="mr-2"
            />
          </template>
          <template v-else>
            <v-img
              :src="item.icon"
              width="24"
              height="24"
              contain
              class="mr-2"
              eager
            />
          </template>
          {{ item.title }}
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
  
<script setup lang="ts">
import { getDiscordLink } from '@/utils/utils';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import discordIcon from '@/assets/images/icons/discord.png';

const drawer = ref(false);
const group = ref<string | null>(null);

const openedGroups = ref(['Personagem', 'Termos e Regras', 'Social']);

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
  {
    title: 'Social',
    icon: 'mdi-account-group-outline',
    items: [
      { title: 'Discord', value: 'item5', icon: discordIcon, link: getDiscordLink() },
    ],
  },
]);

const router = useRouter();

const handleClick = (value: string, link: string) => {
  group.value = value;
  if (link.startsWith('http')) {
    window.open(link, '_blank');
    return;
  }
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

const openDrawer = () => {
  drawer.value = true;
};

defineExpose({ openDrawer });
</script>
  
<style scoped></style>  