<template>
  <login-wrapper>
    <Header />
    <h1>Account page</h1>
    <p>yoink: {{user}}</p>
    <hr/>
    <button @click="logout()">logout</button>
    <p v-if="logoutState.loading">logging out...</p>
    <p v-if="logoutState.error">failed to logout</p>
  </login-wrapper>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue'
import Header from '../components/partials/Header.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    LoginWrapper,
    Header
  },
  data() {
    return {
      logoutState: {
        error: false,
        loading: false,
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
  },
  methods: {
    async logout() {
      if (this.logoutState.loading) return;

      this.logoutState.loading = true;
      this.logoutState.error = false;

      try {
        const res = await fetch(`${window._env_.FRONTEND_API_URL}/api/v1/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        
        const data = await res.json();
        if (!data.status) {
          throw new Error("failed to logout");
        }

        this.$store.commit('removeUser');
        this.$router.push('/');

        this.logoutState.loading = false;
        this.logoutState.error = false;
      } catch (err) {
        console.error("failed to logout", err);

        this.logoutState.loading = false;
        this.logoutState.error = true;

        return;
      }
    }
  }
}
</script>
