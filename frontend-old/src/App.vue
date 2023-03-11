<template>
  <div id='app'>
    <Header />
    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

body {
  background-color: #242630;
  color: #fff;

  margin: 0;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>

<script>
import Header from './components/partials/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
