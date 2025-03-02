<template>
  <v-app-bar
    app
    flat
    location="bottom"
    class="app-bar"
    height="47"
  >
    <v-container class="d-flex align-center justify-space-between min-w-100">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="flex-grow-1 cursor-pointer d-flex justify-center icon-wrapper"
        @click="icon.click"
      >
        <div class="flex-grow-1 cursor-pointer d-flex justify-center">
          <template v-if="icon.icon.startsWith('ra')">
            <v-icon
              v-bind="{ class: icon.icon }"
            />
          </template>
          <template v-else-if="icon.icon.startsWith('mdi')">
            <v-icon
              v-bind="{ icon: icon.icon }"
            />
          </template>
        </div>
      </div>
    </v-container>
  </v-app-bar>
  <MenuUserComponent ref="drawerRef" />
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import type MenuUserComponent from './MenuUserComponent.vue';

const drawerRef = ref<InstanceType<typeof MenuUserComponent> | null>(null);

const openDrawer = () => {
  drawerRef.value?.openDrawer();
};

const icons = ref([
  { name: "menu", icon: "mdi-menu", click: openDrawer },
  { name: "battle", icon: "ra ra-crossed-swords", click: () => console.log("Battle clicked") },
  { name: "npc", icon: "ra ra-wyvern", click: () => console.log("Npc battle clicked") },
  { name: "skill", icon: "ra ra-book", click: () => console.log("Skill clicked") },
  { name: "inventory", icon: "ra ra-vest", click: () => console.log("Inventory clicked") },
  { name: "chat", icon: "mdi-chat", click: () => console.log("Chat clicked") },
]);
</script>
    
<style scoped>
.app-bar {
  border-top: 2px solid #4e5254 !important;
  background: linear-gradient(180deg, #002f5e 0, #0c0809 100%) !important;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, .75) !important;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper i {
  width: 36px;
  height: 36px;
  font-size: 36px;
  transition: background-color .3s, transform .3s, box-shadow .3s;
  border-radius: 50%;
}

.icon-wrapper:hover i {
  width: 44px;
  height: 44px;
  background-color: #004a8f;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, .75);
  transform: translateY(-2px);
  border-radius: 50%;
}
</style>  