<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Matches</router-link> |
      <router-link to="/score">Score</router-link> |
      <router-link to="/stats">Stats</router-link> |
      <router-link to="/help">Help</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$store.dispatch('LOAD_MATCHES')
      this.$store.dispatch('LOAD_STATUS')
      this.$store.dispatch('LOAD_OWN_BETS')
      this.$store.dispatch('LOAD_USERS')
    }
  }
</script>

<style lang="scss">
  @import 'src/assets/styles/base';
</style>
