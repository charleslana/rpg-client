<template>
  <v-app-bar
    app
    flat
    location="bottom"
    class="app-bar"
    height="47"
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
  border-top: 2px solid #4e5254 !important;
  background: linear-gradient(180deg, #002f5e 0, #0c0809 100%) !important;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, .75) !important;
}
</style>  