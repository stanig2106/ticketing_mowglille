/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import router from '../router';
import pinia from './pinia';
import './axios';

import { install } from 'vue-qrcode-reader';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia);
  install(app);
}
