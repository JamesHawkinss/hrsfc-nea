<template>
  <PageCard>
    <h1>Hills Timetables</h1>
    <p v-if="!$store.state.isLoggedIn">Click "Login" or "Register" in the top right to get started</p>
  </PageCard>
</template>

<script>
import PageCard from '../components/core/PageCard.vue';

export default {
  components: { PageCard }
}
</script>
