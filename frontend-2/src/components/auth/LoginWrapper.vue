<template>
    <div>
        <AuthLoading v-if="showAuthLoadScreen" />
        <div v-else-if="showLoginScreen">
            <slot v-if="hideLogin" />
        </div>
        <div v-if="isLoggedIn">
            <slot />
        </div>
    </div>
</template>

<script>
import AuthLoading from './AuthLoading.vue';
import { mapGetters } from 'vuex';

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
        shouldShowLoginScreen() {
            return !this.hideLogin && this.showLoginScreen;
        },
    },
    watch: {
        shouldShowLoginScreen(v) {
            if (v) this.$router.push('login');
        }
    },
    mounted() {
        this.$store.dispatch('loadUser');
    }
}
</script>