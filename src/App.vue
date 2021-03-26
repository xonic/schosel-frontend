<template>
  <div id="app" class="app">
    <div v-if="loggedInUser && !loggedInUser.paid" class="not-paid">
      You have not paid yet.
    </div>
    <schosel-header />
    <router-view class="main"/>
    <footer class="footer">
      <div class="wrapper">
        <div class="footer__title">
          <span class="text--cyan">S</span>
          <span class="text--blue">c</span>
          <span class="text--purple">h</span>
          <span class="text--magenta">o</span>
          <span class="text--red">s</span>
          <span class="text--orange">e</span>
          <span class="text--yellow">l</span>
        </div>
        <div class="footer__slogan">Nice to win. OK to lose.</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { HTTP } from './http-constants'
  import SchoselHeader from '@/components/Header.vue'

  export default {
    components: {
      SchoselHeader
    },
    created () {
      this.$store.dispatch('TRY_AUTO_LOGIN')
    },
    mounted () {

      setInterval( () => {
        if(!this.$store.authenticated) return
        this.$store.dispatch('LOAD_MATCHES')
        this.$store.dispatch('LOAD_USERS')
      }, 10000);
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
      ])
    },
  }
</script>

<style lang="scss">
  @import 'src/assets/styles/base';
</style>
