<template>
    <PageCard>
        <div v-if="$store.state.loadState.loading">
            <h1>Loading session...</h1>
        </div>
        <div v-else-if="$store.state.loadState.errored">
            <h1>Failed to load</h1>
            <button @click="$store.dispatch('loadUser')">Retry</button>
        </div>
    </PageCard>
</template>

<script>
import PageCard from '../core/PageCard.vue'

export default {
    components: {
        PageCard,
    }
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
