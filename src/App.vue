<template>
  <div id="app" class="app" @click="clickHandler">
    <message v-if="loggedInUser && !loggedInUser.paid" type="error" position="floating">
      Hey, where's the money?!
    </message>
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
  import SchoselHeader from '@/components/Header'
  import Message from '@/components/Message'

  export default {
    components: {
      SchoselHeader,
      Message
    },
    created () {
      this.$store.dispatch('TRY_AUTO_LOGIN')
    },
    mounted () {
      let self = this

      setInterval( () => {
        if(!self.authenticated) return
        self.$store.dispatch('LOAD_STATUS')
        self.$store.dispatch('LOAD_MATCHES')
        self.$store.dispatch('LOAD_USERS')
      }, 60000);
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'authenticated'
      ])
    },
    methods: {
      clickHandler(e) {
        this.$store.dispatch('HIDE_POPOVER')
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/assets/styles/base';
</style>
