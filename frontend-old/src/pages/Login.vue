<template>
  <login-wrapper hide-login>
    <login-form />
  </login-wrapper>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue'
import LoginForm from '../components/partials/LoginForm.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    LoginWrapper,
    LoginForm
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push('/');
      }
    }
  }
}
</script>
