<template>
    <LoginWrapper>
        <PageCard>
            <h1>Timetable</h1>
        </PageCard>
    </LoginWrapper>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginWrapper from '../components/auth/LoginWrapper.vue';
import PageCard from '../components/core/PageCard.vue';

export default {
    components: {
    ...mapGetters(["user"]),
    LoginWrapper,
    PageCard
}
}
</script>