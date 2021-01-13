<template>
  <div id="app">
    <div v-if="loggedInUser && !loggedInUser.paid" class="not-paid">
      You have not paid yet.
    </div>
    <header class="header">
      <div class="wrapper header__grid">
        <div class="logo">
          Schosel <span class="logo__tournament">WM 2018</span>
        </div>
        <nav class="nav">
          <ul class="nav__items">
            <li class="nav__item">
              <router-link class="nav__link" to="/matches">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M17.798 1.882A11.637 11.637 0 0 0 12 .345c-2.11 0-4.089.559-5.798 1.537L12 4.93l5.798-3.047zM19.85 3.372l-1.108 6.456 4.704 4.586c.16-.769.243-1.565.243-2.38a11.66 11.66 0 0 0-3.84-8.662zM13.253 23.655c4.213-.449 7.756-3.135 9.419-6.847l-6.506.945-2.913 5.902zM4.151 3.372a11.659 11.659 0 0 0-3.84 8.662c0 .815.084 1.61.243 2.38l4.704-4.587-1.107-6.455zM1.328 16.808c1.663 3.712 5.207 6.398 9.419 6.847l-2.913-5.902-6.506-.945zM14.18 8.844l-4.535.718-.718 4.535 4.091 2.085 3.247-3.247z"/></g></svg>
                </div> Matches
              </router-link>
            </li>
            <li class="nav__item">
              <router-link class="nav__link" to="/score">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="nonzero"><path d="M21.491 1.174c-.765-.169-1.65-.06-2.481.253.007-.45.005-.888-.008-1.31H4.734a28.3 28.3 0 0 0-.008 1.31c-.832-.313-1.715-.422-2.48-.253C1.112 1.424.344 2.201.08 3.364-.263 4.88.495 6.618 2.215 8.26c1.355 1.294 3.173 2.37 5.093 3.034.795 1.121 1.813 2.025 3.105 2.574-.188.688-.85 2.682-2.447 3.901h7.804c-1.598-1.22-2.259-3.213-2.447-3.9 1.292-.55 2.31-1.454 3.106-2.575 1.92-.665 3.738-1.74 5.093-3.034 1.72-1.641 2.477-3.38 2.133-4.897-.263-1.162-1.032-1.94-2.164-2.189zM3.36 7.061C2.116 5.873 1.495 4.63 1.7 3.731c.12-.53.407-.828.904-.938.655-.145 1.511.075 2.216.511.16 1.901.535 3.887 1.238 5.649-1.011-.526-1.94-1.169-2.698-1.892zm17.018 0c-.758.723-1.687 1.366-2.698 1.892.703-1.762 1.079-3.747 1.239-5.649.704-.435 1.56-.655 2.216-.51.497.109.784.406.904.937.204.898-.417 2.143-1.661 3.33zM6.857 18.815h10.022v2.166H6.857z"/></g></svg>
                </div> Score
              </router-link>
            </li>
            <li class="nav__item" v-if="loggedInUser && loggedInUser.achievements">
              <router-link class="nav__link" to="/extras">
                <div class="nav__img">
                  <svg viewBox="0 0 14 16" width="14" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd"><circle cx="7" cy="6" r="6"/><path d="M11.724 11.166l1.596 2.763-.043.025-2.685-.759-.694 2.71-.042.024-1.743-3.017a6.977 6.977 0 0 0 3.611-1.746zm-9.657-.2a6.985 6.985 0 0 0 3.526 1.893l-1.773 3.07-.043-.024-.685-2.705-2.694.754-.042-.025 1.71-2.963z"/></g></svg>
                </div> Extras
              </router-link>
            </li>
            <!-- <li class="nav__item" v-if="loggedInUser && loggedInUser.achievements">
              <router-link class="nav__link" to="/stats">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 15h6v9H0zM9 9h6v15H9zM18 0h6v24h-6z"/></g></svg>
                </div> Stats
              </router-link>
            </li> -->
            <li class="nav__item">
              <a class="nav__link" href="../about">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" width="24" height="21" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="nonzero"><path d="M23.782 14.617a.817.817 0 0 0-.819-.817h-3.38L19.5 3.19a3 3 0 0 0-3-2.973H3.217a3 3 0 0 0-3 3V16.61a3.9 3.9 0 0 0 3.9 3.927h15.9a3.9 3.9 0 0 0 3.765-3.927v-1.992zM4.117 18.9a2.265 2.265 0 0 1-2.263-2.265V3.219c0-.753.612-1.364 1.365-1.363h13.254c.753 0 1.364.611 1.364 1.364l.08 10.608H7.228a.817.817 0 0 0-.817.82v1.99A2.265 2.265 0 0 1 4.117 18.9zm18.029-2.265a2.265 2.265 0 0 1-2.265 2.265H7.311a3.86 3.86 0 0 0 .735-2.265v-1.2h14.1v1.2z"/><path d="M4.037 3.79h6.409v1.637h-6.41V3.791zm0 3.274H15.9V8.7H4.036V7.064zm0 3.272H15.9v1.637H4.036v-1.637z"/></g></svg>
                </div> Rules
              </a>
            </li>
            <li class="nav__item">
              <a href="../profile" class="nav__link">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-11.078a4.616 4.616 0 1 0 .166-9.229 4.616 4.616 0 0 0-.166 9.23zm-8.685 4.343A10.147 10.147 0 0 0 12 22.155a10.147 10.147 0 0 0 8.685-4.89.459.459 0 0 0-.098-.228c-1.138-1.423-2.94-2.268-5.356-2.268H8.769c-2.417 0-4.218.845-5.355 2.268a.459.459 0 0 0-.099.228z" fill="#fff" fill-rule="evenodd"/></svg>
                </div>&nbsp;Account
              </a>
            </li>
            <li class="nav__item">
              <a href="../logout" class="nav__link">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" width="24" height="21" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="nonzero"><path d="M13.07 18.365H2.74V2.505h10.33v5.738h2.504V0H.234v20.87h15.34v-8.244H13.07z"/><path d="M18.991 11.687l-1.826 1.826 1.774 1.774 3.965-3.965.861-.887-.86-.887-3.966-3.965-1.774 1.774 1.826 1.826h-8.426v2.504z"/></g></svg>
                </div> Logout
              </a>
            </li>
          </ul>
        </nav>
        <div class="player-info">
          <div v-if='loggedInUser' class="player-info__score">
            <span v-if="loggedInUser && loggedInUser.points">{{ loggedInUser.points.toFixed(2) }}</span>
            <span class="player-info__label"> pts</span>
          </div>
          <div v-if="loggedInUser && loggedInUser.rank" class="player-info__rank">
            <span class="player-info__label">Rank</span> <span>{{ loggedInUser.rank }}</span>.
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

  export default {
    data () {
      return {
        showMorePopover: false
      }
    },
    mounted () {
      // this.$store.dispatch('LOAD_MATCHES')
      // this.$store.dispatch('LOAD_STATUS')
      // this.$store.dispatch('LOAD_OWN_BETS')
      // this.$store.dispatch('LOAD_USERS')
      //
      // setInterval( () => {
      //   this.$store.dispatch('LOAD_MATCHES')
      //   this.$store.dispatch('LOAD_OWN_BETS')
      //   this.$store.dispatch('LOAD_USERS')
      // }, 10000);
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'rewards'
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
