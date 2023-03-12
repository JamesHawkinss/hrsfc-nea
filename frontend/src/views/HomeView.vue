<template>
    <LoginWrapper>
        <PageCard>
            <h1>Hills Timetables</h1>
            <p v-if="!isLoggedIn">Click "Login" or "Register" in the top right to get started</p>
        </PageCard>
    </LoginWrapper>
</template>

<script>
import LoginWrapper from '../components/auth/LoginWrapper.vue'
import PageCard from '../components/core/PageCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: { PageCard, LoginWrapper, ...mapGetters['isLoggedIn'] }
}
</script>
