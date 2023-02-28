<template>
    <LoginWrapper hideLogin>
        <LoginForm />
    </LoginWrapper>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue';
import LoginForm from '../components/auth/LoginForm.vue';

export default {
    watch: {
        isLoggedIn(v) {
            if (v) this.$router.push('/');
        }
    },
    components: { LoginWrapper, LoginForm }
}
</script>