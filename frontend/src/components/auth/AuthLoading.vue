<template>
    <PageCard>
        <div v-if="loadState.loading">
            <h1>Loading session...</h1>
        </div>
        <div v-else-if="loadState.errored">
            <h1>Failed to load</h1>
            <button @click="$store.dispatch('loadUser')">Retry</button>
        </div>
    </PageCard>
</template>

<script>
import PageCard from '../core/PageCard.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        PageCard,
        ...mapGetters['loadState']
    }
}
</script>
