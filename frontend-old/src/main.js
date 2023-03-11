import { createStore } from './store/auth';
import VueRouter from 'vue-router';
import App from './App.vue';
import Vuex from 'vuex';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import User from './pages/User';
import NotFound from './pages/NotFound';

library.add(faCheck);
library.add(faTimes)

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/account', component: Account },
    { path: '/user/:id', component: User },
    { path: '*', component: NotFound }
  ]
});

const store = createStore();
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
