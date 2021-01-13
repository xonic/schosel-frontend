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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
