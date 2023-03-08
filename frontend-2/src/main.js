import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuthStore } from './store/auth'

import './assets/main.css'

window._env_ = {
    FRONTEND_API_URL: "http://localhost:8080"
}

const app = createApp(App);

const authStore = createAuthStore();
app.use(authStore);

app.use(router);
app.mount('#app');
