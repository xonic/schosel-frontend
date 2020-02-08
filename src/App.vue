<template>
  <div id="app" class="app">
    <div v-if="loggedInUser && !loggedInUser.paid" class="not-paid">
      You have not paid yet.
    </div>
    <header class="header">
      <div class="wrapper header__grid">
        <div class="logo">
          <router-link :to="{ name: 'home' }">Schosel <span class="logo__tournament">WM 2018</span></router-link>
        </div>
        <nav class="nav">
          <ul class="nav__items">
            <li class="nav__item">
              <router-link v-if="authenticated" class="nav__link" to="/matches">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M17.798 1.882A11.637 11.637 0 0 0 12 .345c-2.11 0-4.089.559-5.798 1.537L12 4.93l5.798-3.047zM19.85 3.372l-1.108 6.456 4.704 4.586c.16-.769.243-1.565.243-2.38a11.66 11.66 0 0 0-3.84-8.662zM13.253 23.655c4.213-.449 7.756-3.135 9.419-6.847l-6.506.945-2.913 5.902zM4.151 3.372a11.659 11.659 0 0 0-3.84 8.662c0 .815.084 1.61.243 2.38l4.704-4.587-1.107-6.455zM1.328 16.808c1.663 3.712 5.207 6.398 9.419 6.847l-2.913-5.902-6.506-.945zM14.18 8.844l-4.535.718-.718 4.535 4.091 2.085 3.247-3.247z"/></g></svg>
                </div> Matches
              </router-link>
            </li>
            <li class="nav__item">
              <router-link v-if="authenticated" class="nav__link" to="/score">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M21.491 1.174c-.765-.169-1.65-.06-2.481.253.007-.45.005-.888-.008-1.31H4.734a28.3 28.3 0 0 0-.008 1.31c-.832-.313-1.715-.422-2.48-.253C1.112 1.424.344 2.201.08 3.364-.263 4.88.495 6.618 2.215 8.26c1.355 1.294 3.173 2.37 5.093 3.034.795 1.121 1.813 2.025 3.105 2.574-.188.688-.85 2.682-2.447 3.901h7.804c-1.598-1.22-2.259-3.213-2.447-3.9 1.292-.55 2.31-1.454 3.106-2.575 1.92-.665 3.738-1.74 5.093-3.034 1.72-1.641 2.477-3.38 2.133-4.897-.263-1.162-1.032-1.94-2.164-2.189zM3.36 7.061C2.116 5.873 1.495 4.63 1.7 3.731c.12-.53.407-.828.904-.938.655-.145 1.511.075 2.216.511.16 1.901.535 3.887 1.238 5.649-1.011-.526-1.94-1.169-2.698-1.892zm17.018 0c-.758.723-1.687 1.366-2.698 1.892.703-1.762 1.079-3.747 1.239-5.649.704-.435 1.56-.655 2.216-.51.497.109.784.406.904.937.204.898-.417 2.143-1.661 3.33zM6.857 18.815h10.022v2.166H6.857z"/></g></svg>
                </div> Score
              </router-link>
            </li>
            <!-- <li class="nav__item" v-if="authenticated">
              <router-link class="nav__link" to="/extras">
                <div class="nav__img">
                  <svg viewBox="0 0 14 16" width="14" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd"><circle cx="7" cy="6" r="6"/><path d="M11.724 11.166l1.596 2.763-.043.025-2.685-.759-.694 2.71-.042.024-1.743-3.017a6.977 6.977 0 0 0 3.611-1.746zm-9.657-.2a6.985 6.985 0 0 0 3.526 1.893l-1.773 3.07-.043-.024-.685-2.705-2.694.754-.042-.025 1.71-2.963z"/></g></svg>
                </div> Extras
              </router-link>
            </li> -->
          </ul>
        </nav>
        <div class="player-info">
          <!-- <div v-if='loggedInUser' class="player-info__score">
            <span v-if="loggedInUser && loggedInUser.points">{{ loggedInUser.points.toFixed(2) }}</span>
            <span class="player-info__label"> pts</span>
          </div>
          <div v-if="loggedInUser && loggedInUser.rank" class="player-info__rank">
            <span class="player-info__label">Rank</span> <span>{{ loggedInUser.rank }}</span>.
          </div> -->
          <div v-if="authenticated && loggedInUser" class="user-menu">
            <popover :items="userMenuItems">
              <img class="avatar avatar--small" :src="loggedInUser.avatar"/>
            </popover>
          </div>
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
