import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuthStore } from './store/auth'

import './assets/main.css'

const app = createApp(App);

const authStore = createAuthStore();
app.use(authStore);

app.use(router);
app.mount('#app');
