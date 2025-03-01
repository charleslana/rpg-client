<template>
  <v-img
    :height="400"
    aspect-ratio="16/9"
    cover
    src="@/assets/images/header.jpg"
    class="header-image"
  >
    <div class="overlay" />
    <div class="text-overlay">
      <h1 class="text-h1 text-white shadow-yellow blur-5px">
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

@media (max-width: 520px) {
  .header-image {
    height: 134px !important;
  }
  .text-overlay .text-h1 {
    font-size: 1.9rem !important;
  }
}

@media (min-width: 1341px) and (max-width: 1468px) {
  .header-image {
    height: 332px !important;
  }
  .text-overlay .text-h1 {
    font-size: 4rem !important;
  }
}
</style>  