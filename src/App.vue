<template>
  <div id="app" class="app">
    <div v-if="loggedInUser && !loggedInUser.paid" class="not-paid">
      You have not paid yet.
    </div>
    <header class="header">
      <div class="wrapper header__grid">
        <div class="logo">
          <router-link :to="{ name: 'home' }">Schosel
            <span class="logo__tournament">EM 2020</span>
          </router-link>
        </div>
        <nav class="nav">
          <ul class="nav__items">
            <li class="nav__item">
              <router-link v-if="authenticated" class="nav__link" to="/matches">
                Matches
              </router-link>
            </li>
            <li class="nav__item">
              <router-link v-if="authenticated" class="nav__link" to="/score">
                Score
              </router-link>
            </li>
          </ul>
        </nav>
        <div v-if="authenticated && loggedInUser" class="player-info">
          <div v-if='loggedInUser.name' class="player-info__name">
            {{ loggedInUser.name }}
          </div>
          <popover :items="userMenuItems">
            <img class="avatar avatar--small" :src="loggedInUser.avatar"/>
          </popover>
        </div>
      </div>
    </header>
    <router-view class="main"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { HTTP } from './http-constants'
  import Popover from '@/components/Popover.vue'

  export default {
    components: {
      Popover
    },
    data () {
      return {
        showMorePopover: false,
        userMenuItems: [
          {
            name: 'Profile',
            route: 'profile'
          },
          {
            name: 'Rules',
            route: 'rules'
          },
          {
            name: 'Logout',
            route: 'logout'
          }
        ]
      }
    },
    created () {
      this.$store.dispatch('TRY_AUTO_LOGIN')
    },
    mounted () {

      setInterval( () => {
        if(!this.$store.authenticated) return
        this.$store.dispatch('LOAD_MATCHES')
        this.$store.dispatch('LOAD_OWN_BETS')
        this.$store.dispatch('LOAD_USERS')
      }, 10000);
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'rewards',
        'authenticated'
      ])
    },
    methods: {
      toggleMorePopover: function(event) {
        if(event) event.preventDefault()
        this.showMorePopover = !this.showMorePopover
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/assets/styles/base';
</style>
