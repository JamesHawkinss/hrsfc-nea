<template>
  <div>
    <AuthLoading v-if="showAuthLoadScreen"/>
    <div v-else-if="showLoginScreen">
      <slot v-if="hideLogin"/>
    </div>
    <div v-if="isLoggedIn">
        <slot />
    </div>
  </div>
</template>

<script>
import AuthLoading from '../AuthLoading'
import { mapGetters } from 'vuex'

export default {
    props: {
        hideLogin: {
            type: Boolean,
            default: false,
        }
    },
  components: {
    AuthLoading,
  },
  computed: {
    ...mapGetters([
      'showAuthLoadScreen',
      'showLoginScreen',
      'isLoggedIn',
    ]),
    shouldShouldLoginScreen() {
        return !this.hideLogin && this.showLoginScreen;
    },
  },
  watch: {
      shouldShouldLoginScreen(val) {
          if (val) this.$router.push('login');
      },
  },
  mounted() {
    this.$store.dispatch('loadUser');
  },
}
</script>
