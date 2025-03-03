<template>
  <v-footer
    class="text-center d-flex flex-column"
  >
    <v-container>
      <v-row class="align-center">
        <v-col class="text-h6 font-weight-bold text-uppercase shadow-yellow fas">
          Solo Leveling RPG
        </v-col>
        <v-col>
          <v-row>
            <v-col class="text-body-2">
              Criado de fã para fã, desenvolvido por Charles Lana
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-body-2">
              {{ new Date().getFullYear() }} — Solo Leveling RPG
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex align-center justify-center">
          <a
            :href="getDiscordLink()"
            target="_blank"
          >
            <img
              src="@/assets/images/icons/discord.png"
              alt="Discord"
              width="44"
              height="44"
            >
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { getDiscordLink } from '@/utils/utils';

</script>

<style scoped>
footer {
  margin-top: auto;
  flex: none;
  background: rgba(12, 12, 12, .8);
}
</style>
