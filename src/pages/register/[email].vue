<template>
  <AppBarComponent />
  <v-img
    :height="400"
    aspect-ratio="16/9"
    cover
    src="@/assets/images/register/header.jpg"
  >
    <div class="overlay" />
    <div class="text-overlay">
      <h1 class="text-h1 text-white shadow-yellow">
        Solo Leveling RPG
      </h1>
    </div>
  </v-img>
  <v-container class="min-h-100">
    <!-- <h1 class="text-h4">
      E-mail
    </h1>
    <p class="text-subtitle-1">
      {{ authStore.email }}
    </p>
    <p class="text-subtitle-2">
      {{ emailParam }}
    </p>
    <v-btn
      class="mt-4"
      color="primary"
      variant="outlined"
      to="/"
    >
      Voltar para Home
    </v-btn> -->
    <form @submit.prevent="handleSubmit">
      <v-row dense>
        <v-col
          cols="12"
          md="12"
          sm="12"
        >
          <div class="text-subtitle-1 text-medium-emphasis">
            E-mail
          </div>
          <v-text-field
            v-model.trim="state.email"
            :counter="50"
            :error-messages="emailErrors"
            density="comfortable"
            placeholder="example@example.com"
            variant="outlined"
            required
            type="email"
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
          />
        </v-col>
      </v-row>
      <v-btn
        class="mt-5"
        rounded="xl"
        size="x-large"
        block
        text="Continuar"
        type="submit"
        :disabled="isFormInvalid || overlay"
        :loading="overlay"
      />
    </form>
  </v-container>
  <FooterComponent />
  <OverlayComponent :is-visible="overlay" />
</template>
    
<script lang="ts" setup>
// import { useAuthStore } from '@/stores/auth';
import { decodeBase64, getTitle } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import { email, helpers, required, maxLength } from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';
    
onMounted(() => {
  document.title = getTitle('Cadastro');
  state.email = emailParam.value;
});
  
const route = useRoute('/register/[email]');
  
// const email = ref(route.query.email || '');
  
// const authStore = useAuthStore();
  
const emailParam = computed(() => decodeBase64(route.params.email));

const overlay = ref(false);

const initialState = {
  email: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: {
    required: helpers.withMessage('O e-mail é obrigatório.', required),
    email: helpers.withMessage('O e-mail não está no formato correto, exemplo: email@email.com', email),
    maxLength: helpers.withMessage('O e-mail pode ter no máximo 50 caracteres.', maxLength(50)),
  },
}

const v$ = useVuelidate(rules, state);

const emailErrors = computed(() =>
  v$.value.email.$errors.map(e => e.$message) as string[]
);

const isFormInvalid = computed(() => {
  return v$.value.$invalid;
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    alert('Erro');
    return;
  }
  overlay.value = true;
  setTimeout(() => {
    overlay.value = false;
  }, 2000);
};
</script>
  
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