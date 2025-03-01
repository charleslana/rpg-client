<template>
  <v-app-bar
    app
    flat
    class="app-bar"
    height="38"
  >
    <v-container class="d-flex align-center justify-space-between">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </v-container>
  </v-app-bar>
</template>
  
<script setup lang="ts"></script>
  
<style scoped>
.app-bar {
  border-bottom: 2px solid #4e5254 !important;
  background: linear-gradient(180deg, #020a13 0%, #002f5e 100%) !important;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, .75) !important;
}
</style>  