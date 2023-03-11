<template>
  <div>
    <div v-if="$store.state.loadState.loading">
      <h1>Loading session...</h1>
    </div>
    <div v-else-if="$store.state.loadState.errored">
      <h1>Failed to load</h1>
      <button @click="$store.dispatch('loadUser')">Retry</button>
    </div>
  </div>
</template>
