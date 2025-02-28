<template>
  <div class="page-wrapper">
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
    <v-container
      class="mx-auto max-container my-5"
    >
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
              id="email"
              v-model.trim="state.email"
              :counter="50"
              :error-messages="emailErrors"
              density="comfortable"
              placeholder="example@example.com"
              variant="outlined"
              required
              disabled
              type="email"
              @blur="v$.email.$touch"
              @input="v$.email.$touch"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Seu nome
            </div>
            <v-text-field
              id="name"
              v-model.trim="state.name"
              :counter="50"
              :error-messages="nameErrors"
              density="comfortable"
              placeholder="João Da Silva"
              variant="outlined"
              required
              type="text"
              @blur="v$.name.$touch"
              @input="handleNameInput"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Gênero
            </div>
            <v-select
              id="gender"
              v-model="state.gender"
              :items="genderItems"
              item-title="text"
              :error-messages="genderErrors"
              density="comfortable"
              :placeholder="GenderEnum.M"
              variant="outlined"
              required
              @blur="v$.gender.$touch"
              @input="v$.gender.$touch"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Classe
            </div>
            <v-select
              id="characterClass"
              v-model="state.characterClass"
              :items="characterClassItems"
              item-title="text"
              :error-messages="characterClassErrors"
              density="comfortable"
              :placeholder="CharacterClassEnum.Attack"
              variant="outlined"
              required
              @blur="v$.characterClass.$touch"
              @input="v$.characterClass.$touch"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Senha
            </div>
            <v-text-field
              id="password"
              v-model.trim="state.password"
              :error-messages="passwordErrors"
              density="comfortable"
              placeholder="******"
              variant="outlined"
              required
              type="password"
              @blur="v$.password.$touch"
              @input="v$.password.$touch"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Confirmar a senha
            </div>
            <v-text-field
              id="passwordConfirmation"
              v-model.trim="state.passwordConfirmation"
              :error-messages="passwordConfirmationErrors"
              density="comfortable"
              placeholder="******"
              variant="outlined"
              required
              type="password"
              @blur="v$.passwordConfirmation.$touch"
              @input="v$.passwordConfirmation.$touch"
            />
            <div class="text-subtitle-1 text-medium-emphasis">
              Nome do personagem
            </div>
            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <v-text-field
                  id="characterName"
                  v-model.trim="state.characterName"
                  :counter="20"
                  hint="Você poderá trocar este nome futuramente"
                  :error-messages="nameInvalid && v$.characterName.$dirty ? ['Nome indisponível'] : characterNameErrors"
                  density="comfortable"
                  placeholder="Jogador123"
                  variant="outlined"
                  required
                  type="text"
                  @blur="v$.characterName.$touch"
                  @input="v$.characterName.$touch"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-btn
                  class="mb-5"
                  size="large"
                  block
                  color="primary"
                  :disabled="isFormInvalid || loading"
                  :loading="loading"
                  @click="checkCharacterName"
                >
                  Verificar disponibilidade
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="text-caption">
          Ao criar meu personagem, afirmo que LI e CONCORDO com todos  
          <router-link to="/tos">
            Termos de Serviço
          </router-link> e  
          <router-link to="/rules">
            Regras
          </router-link>.
        </div>

        <v-btn
          data-testid="continueBtn"
          class="mt-5"
          rounded="xl"
          size="x-large"
          block
          text="Continuar"
          type="submit"
          :disabled="isFormInvalid || overlay || nameInvalid || loading"
          :loading="overlay || loading"
        />
      </form>
    </v-container>
    <FooterComponent />
  </div>
  <OverlayComponent :is-visible="overlay" />
</template>
    
<script lang="ts" setup>
// import { useAuthStore } from '@/stores/auth';
import { decodeBase64, getTitle } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import { email, helpers, required, maxLength } from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core';
import { GenderEnum } from '@/enums/gender-enum';
import { CharacterClassEnum } from '@/enums/character-class-enum';
import { getCharacterClassText, getGenderText } from '@/utils/character-utils';
    
onMounted(() => {
  document.title = getTitle('Cadastro');
  state.email = emailParam.value;
});
  
const route = useRoute('/register/[email]');
  
// const email = ref(route.query.email || '');
  
// const authStore = useAuthStore();
  
const emailParam = computed(() => decodeBase64(route.params.email));

const overlay = ref(false);

const nameInvalid = ref(true);

const loading = ref(false);

const initialState = {
  email: '',
  name: '',
  gender: GenderEnum.M,
  characterClass: CharacterClassEnum.Attack,
  password: '',
  passwordConfirmation: '',
  characterName: ''
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
  name: {
    required: helpers.withMessage('O nome é obrigatório.', required),
    minLength: helpers.withMessage('O nome deve ter no mínimo 3 caracteres.', (value: string) => value.length >= 3),
    maxLength: helpers.withMessage('O nome pode ter no máximo 50 caracteres.', (value: string) => value.length <= 50),
    onlyLettersAndSpaces: helpers.withMessage(
      'O nome deve conter apenas letras e espaços.',
      (value: string) => /^[A-Za-zÀ-ÿ\s]+$/.test(value)
    ),
  },
  gender: {
    required: helpers.withMessage('O gênero é obrigatório.', required),
    validGender: helpers.withMessage(
      'O gênero selecionado é inválido.',
      (value: GenderEnum) => Object.values(GenderEnum).includes(value)
    ),
  },
  characterClass: {
    required: helpers.withMessage('A classe do personagem é obrigatório.', required),
    validGender: helpers.withMessage(
      'A classe do personagem selecionado é inválido.',
      (value: CharacterClassEnum) => Object.values(CharacterClassEnum).includes(value)
    ),
  },
  password: {
    required: helpers.withMessage('A senha é obrigatória.', required),
    minLength: helpers.withMessage('A senha deve ter no mínimo 6 caracteres.', (value: string) => value.length >= 6),
  },
  passwordConfirmation: {
    required: helpers.withMessage('A confirmação de senha é obrigatória.', required),
    sameAsPassword: helpers.withMessage(
      'A confirmação de senha deve ser igual à senha.',
      (value: string) => value === state.password
    ),
  },
  characterName: {
    required: helpers.withMessage('O nome do personagem é obrigatório.', required),
    minLength: helpers.withMessage('O nome do personagem deve ter no mínimo 3 caracteres.', (value: string) => value.length >= 3),
    maxLength: helpers.withMessage('O nome do personagem pode ter no máximo 20 caracteres.', (value: string) => value.length <= 20),
    onlyLettersNumbersUnderscore: helpers.withMessage(
      'O nome do personagem só pode conter letras, números e underscore (_).',
      (value: string) => /^[A-Za-z0-9_]+$/.test(value)
    ),
  }
}

const genderItems = Object.keys(GenderEnum).map(key => ({
  text: getGenderText(GenderEnum[key as keyof typeof GenderEnum]),
  value: GenderEnum[key as keyof typeof GenderEnum],
}));

const characterClassItems = Object.keys(CharacterClassEnum).map(key => ({
  text: getCharacterClassText(CharacterClassEnum[key as keyof typeof CharacterClassEnum]),
  value: CharacterClassEnum[key as keyof typeof CharacterClassEnum],
}));

const v$ = useVuelidate(rules, state);

const emailErrors = computed(() =>
  v$.value.email.$errors.map(e => e.$message) as string[]
);

const nameErrors = computed(() =>
  v$.value.name.$errors.map(e => e.$message) as string[]
);

const genderErrors = computed(() =>
  v$.value.gender.$errors.map(e => e.$message) as string[]
);

const characterClassErrors = computed(() =>
  v$.value.characterClass.$errors.map(e => e.$message) as string[]
);

const passwordErrors = computed(() =>
  v$.value.password.$errors.map(e => e.$message) as string[]
);

const passwordConfirmationErrors = computed(() =>
  v$.value.passwordConfirmation.$errors.map(e => e.$message) as string[]
);

const characterNameErrors = computed(() =>
  v$.value.characterName.$errors.map(e => e.$message) as string[]
);

const isFormInvalid = computed(() => {
  return v$.value.$invalid;
});

const handleNameInput = () => {
  state.name = state.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  v$.value.name.$touch();
};

const checkCharacterName = () => {
  console.log('Verificando nome do personagem:', state.characterName);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    const isNameAvailable = Math.random() > 0.5;
    nameInvalid.value = !isNameAvailable;
    nameInvalid.value = false;
  }, 1000);
};

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    alert('Erro');
    return;
  }
  console.log(state.gender);
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