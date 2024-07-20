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

// styles
import '@/styles/style.scss';
import '@/styles/settings.scss';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
