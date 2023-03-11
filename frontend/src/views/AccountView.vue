<template>
    <LoginWrapper>
        <PageCard>
            <h1>Account page</h1>
            <p>Username: {{ user.username }}</p>
            <p>Student ID: {{ user.studentId }}</p>
            <p>Friends: {{ user.friends.length > 0 ? user.friends.join(", ") : "None" }}</p>
        </PageCard>
    </LoginWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginWrapper from '../components/auth/LoginWrapper.vue';
import PageCard from '../components/core/PageCard.vue';

export default {
    components: { LoginWrapper, PageCard },
    computed: {
        ...mapGetters(['user'])
    },
}
</script>
