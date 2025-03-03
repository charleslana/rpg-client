<template>
  <v-dialog
    v-model="visible"
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">
        {{ dialogTitle }}
      </v-card-title>
      <v-card-text>{{ dialogMessage }}</v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text="Fechar"
          @click="closeDialog"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  dialogVisible: boolean;
  dialogTitle: string;
  dialogMessage: string;
}>();

const emit = defineEmits(['close']);

const visible = computed(() => props.dialogVisible);

function closeDialog() {
  emit('close');
}
</script>

<style scoped></style>
