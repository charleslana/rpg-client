<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field
      v-model.trim="state.email"
      :counter="50"
      :error-messages="emailErrors"
      label="Seu E-mail"
      required
      @blur="v$.email.$touch"
      @input="v$.email.$touch"
    />
    <v-text-field
      v-model.trim="state.password"
      :error-messages="passwordErrors"
      label="Insira a senha"
      required
      class="mt-4"
      @blur="v$.password.$touch"
      @input="v$.password.$touch"
    />
    <div class="text-center">
      <v-btn
        :disabled="overlay"
        :loading="overlay"
        class="me-4 mt-4"
        type="submit"
      >
        Logar
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {email, helpers, required} from '@vuelidate/validators';

const initialState = {
  email: '',
  password: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  email: {
    required: helpers.withMessage('O e-mail é obrigatório.', required),
    email: helpers.withMessage('O e-mail não está no formato correto, exemplo: email@email.com', email),
  },
  password: {
    required: helpers.withMessage('A senha é obrigatória.', required),
  },
}

const v$ = useVuelidate(rules, state);

const emailErrors = computed(() =>
  v$.value.email.$errors.map(e => e.$message) as string[]
);

const passwordErrors = computed(() =>
  v$.value.password.$errors.map(e => e.$message) as string[]
);

const dialogVisible = ref(false);
const dialogTitle = ref('');
const dialogMessage = ref('');
const overlay = ref(false);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    dialogTitle.value = 'Erro';
    dialogMessage.value = 'Por favor, preencha os campos corretamente.';
    dialogVisible.value = true;
    alert('Erro');
    return;
  }
  overlay.value = true;
};
</script>

<style scoped></style>
