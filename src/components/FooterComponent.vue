<template>
  <v-footer
    class="text-center d-flex flex-column"
  >
    <div class="pt-0">
      Criado de fã para fã, desenvolvido por Charles Lana
    </div>
    <v-divider />
    <div>
      {{ new Date().getFullYear() }} — Solo Leveling RPG
    </div>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
footer {
  margin-top: auto;
  flex: none;
  background: rgba(12, 12, 12, .8);
}
</style>
