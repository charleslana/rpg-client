<template>
  <AppBarComponent />
  <v-parallax
    src="@/assets/images/home/parallax.jpg"
    class="pt-5"
  >
    <div class="parallax-overlay" />
    <v-container class="fill-height min-h-100 my-5">
      <v-row
        class="justify-center align-center flex-column-reverse flex-md-row"
      >
        <v-col
          cols="12"
          md="6"
        >
          <h1 class="text-h1 mb-8 shadow-yellow text-uppercase">
            Solo Leveling RPG
          </h1>
          <h3 class="text-h3 mb-8 font-weight-thin">
            RPG Online de Navegador
          </h3>
          <v-btn
            class="elevation-4 rounded-xl mb-4"
            color="primary"
            @click="openRegister"
          >
            Quero me cadastrar
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-card
                class="mx-auto"
                prepend-icon="mdi-account-plus"
                subtitle="Tenha uma conta para poder jogar"
                width="auto"
              >
                <template #title>
                  <span class="font-weight-black">Registre-se</span>
                </template>
                <v-card-text class="bg-surface-light pt-4 text-center">
                  <RegisterComponent ref="registerRef" />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-card
                class="mx-auto"
                prepend-icon="mdi-login"
                subtitle="Vamos entrar no jogo!"
                width="auto"
              >
                <template #title>
                  <span class="font-weight-black">Login</span>
                </template>
                <v-card-text class="bg-surface-light pt-4">
                  <LoginComponent />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <InfoHomeComponent
        id="info"
        title="O Que é Solo Leveling RPG?"
        subtitle="Você já se sentiu fraco, insignificante, como se o mundo fosse muito grande e perigoso para você? Já imaginou ter o poder de mudar tudo isso? De repente, o destino lhe oferece uma chance: a oportunidade de evoluir e alcançar níveis inimagináveis de força. Esse é o mundo de Solo Leveling."
        text="Solo Leveling é uma história épica onde o protagonista, Jinwoo Sung, começa como o caçador mais fraco em um mundo devastado por portais para masmorras cheias de monstros. Ele é considerado inútil, mas após sobreviver a uma missão mortal, algo extraordinário acontece: ele ganha um poder único e um sistema semelhante ao de um jogo de RPG. A partir desse momento, ele pode crescer e se tornar o caçador mais forte, desafiando seu próprio destino e a natureza das masmorras. Solo Leveling RPG é para quem não tem medo de começar do zero e lutar até se tornar o mais forte. Aqui, você não apenas participa de caçadas, mas explora as profundezas do que significa ser um verdadeiro caçador. Cada batalha, cada missão, cada escolha é uma chance de crescer mais forte. Jinwoo é um exemplo de resiliência e evolução constante, e a história desafia você a se perguntar: até onde você iria para alcançar seu potencial?"
      />
    </v-container>
  </v-parallax>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getTitle } from '@/utils/utils';
import type RegisterComponent from '@/components/RegisterComponent.vue';

onMounted(() => {
  document.title = getTitle('Home');
});

const registerRef = ref<InstanceType<typeof RegisterComponent> | null>(null);

const openRegister = () => {
  registerRef.value?.openRegister();
};
</script>

<style scoped>
.parallax-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(45, 45, 45, 0.8) 0%, rgba(0, 20, 50, 0.8) 100%);
  z-index: -1;
}
</style>
