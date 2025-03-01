<template>
  <v-img
    :height="400"
    aspect-ratio="16/9"
    cover
    src="@/assets/images/header.jpg"
  >
    <div class="overlay" />
    <div class="text-overlay">
      <h1 class="text-h1 text-white shadow-yellow">
        Solo Leveling RPG
      </h1>
    </div>
  </v-img>
</template>
  
<script setup lang="ts"></script>
  
<style scoped>
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>  