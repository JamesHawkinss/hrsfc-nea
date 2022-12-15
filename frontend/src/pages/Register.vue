<template>
  <login-wrapper hide-login>
    <register-form/>
  </login-wrapper>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue'
import RegisterForm from '../components/partials/RegisterForm.vue'
import { mapGetters } from 'vuex';

export default {
  components: {
    LoginWrapper,
    RegisterForm,
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
