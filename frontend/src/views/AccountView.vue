<template>
    <h1>Account page</h1>
    <p>{{ user ? 'true' : 'false' }}</p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user'])
    },
}
</script>
