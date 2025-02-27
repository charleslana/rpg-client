<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        density="default"
        v-bind="activatorProps"
      >
        Cadastrar
      </v-btn>
    </template>
    <form @submit.prevent="handleSubmit">
      <v-card
        prepend-icon="mdi-account"
        title="Novo cadastro"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                v-model.trim="state.email"
                :counter="50"
                :error-messages="emailErrors"
                label="Seu E-mail"
                required
                type="email"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
              />
            </v-col>
          </v-row>
          <small
            v-if="errorMessage !== ''"
            class="text-caption text-medium-emphasis text-error"
          >{{ errorMessage }}</small>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Fechar"
            variant="plain"
            @click="dialog = false"
          />
          <v-btn
            color="primary"
            text="Continuar"
            variant="tonal"
            type="submit"
            :disabled="isFormInvalid || overlay"
            :loading="overlay"
          />
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
  <OverlayComponent :is-visible="overlay" />
</template>
  
<script setup lang="ts">
import { email, helpers, required, maxLength } from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { encodeBase64 } from '@/utils/utils';

const router = useRouter(); 

const dialog = ref(false);
const overlay = ref(false);
const errorMessage = ref('');
const error = ref(false);

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

const authStore = useAuthStore();

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    alert('Erro');
    return;
  }
  errorMessage.value = '';
  overlay.value = true;
  setTimeout(() => {
    validateForm();
    overlay.value = false;
  }, 2000);
};

const validateForm = () => {
  if (error.value) {
    errorMessage.value = 'Tente outro e-mail';
    return;
  }
  authStore.setEmail(state.email);
  // router.push({ path: '/register', query: { email: state.email } });
  const encodedEmail = encodeBase64(state.email);
  router.push({ path: `/register/${encodedEmail}` });
}
</script>

<style scoped></style>
