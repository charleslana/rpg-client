<template>
  <v-app-bar
    v-if="!drawer"
    app
    color="transparent"
    flat
    class="custom-app-bar"
  >
    <v-container fluid>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon size="36">
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
          @click="selectGroup(item.value)"
        >
          <v-icon
            left
            :class="item.icon"
          />
          {{ item.title }}
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const drawer = ref(false);
const group = ref<string | null>(null);

const openedGroups = ref(['Categoria 1', 'Categoria 2']);

const menu = ref([
  {
    title: 'Categoria 1',
    icon: 'ra ra-sword',
    items: [
      { title: 'Item 1', value: 'item1', icon: 'ra ra-shield' },
      { title: 'Item 2', value: 'item2', icon: 'ra ra-crossbow' },
    ],
  },
  {
    title: 'Categoria 2',
    icon: 'ra ra-helmet',
    items: [
      { title: 'Item 3', value: 'item3', icon: 'ra ra-dragon' },
      { title: 'Item 4', value: 'item4', icon: 'ra ra-player-dodge' },
    ],
  },
]);

const selectGroup = (value: string) => {
  group.value = value;
};

watch(group, () => {
  drawer.value = false;
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
