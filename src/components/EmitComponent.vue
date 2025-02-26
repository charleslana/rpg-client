<template>
  <h1 @onclick="click">
    Emit
  </h1>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

function click(): void {
  emit("close");
}
</script>

<style scoped></style>
