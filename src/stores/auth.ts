import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
  }),
  actions: {
    setEmail(newEmail: string) {
      this.email = newEmail;
    },
  },
});
