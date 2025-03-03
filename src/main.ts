/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

import 'rpg-awesome/css/rpg-awesome.min.css';

import '@/styles/fonts.css';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
