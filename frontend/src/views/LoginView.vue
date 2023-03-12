<template>
    <PageCard>
        <LoginWrapper hideLogin>
            <h1>Login</h1>
            <LoginForm />
        </LoginWrapper>
    </PageCard>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue';
import LoginForm from '../components/auth/LoginForm.vue';
import PageCard from '../components/core/PageCard.vue';

export default {
    // watch: {
    //     isLoggedIn(v) {
    //         if (v) this.$router.push('/');
    //     }
    // },
    components: { LoginWrapper, LoginForm, PageCard }
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;

    width: 400px;
}

h1 {
    padding-bottom: 1rem;
}

.fields {
    display: flex;
    flex-direction: column;

    padding-bottom: 1rem;
}

button {
    text-align: center;
    width: 10rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
}
</style>