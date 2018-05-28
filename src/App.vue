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
            <!-- <li class="nav__item">
              <router-link class="nav__link" to="/stats">
                <div class="nav__img">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 15h6v9H0zM9 9h6v15H9zM18 0h6v24h-6z"/></g></svg>
                </div> Stats
              </router-link>
            </li> -->
            <li class="nav__item popover-container">
              <a class="nav__link" href @click="toggleMorePopover">
                <div class="nav__img">
                  <svg viewBox="0 -12 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><circle cx="3" cy="3" r="3"/><circle cx="12" cy="3" r="3"/><circle cx="21" cy="3" r="3"/></g></svg>
                </div> More
              </a>
              <div class="popover" v-if="showMorePopover">
                <ul>
                  <li>
                    <a href="../about">
                      <svg width="16px" height="14px" viewBox="0 0 16 14">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g fill="#000000" fill-rule="nonzero">
                                  <path d="M15.8545455,9.74545455 C15.8545455,9.44420832 15.6103371,9.2 15.3090909,9.2 L13.0545455,9.2 L13,2.12727273 C12.9900227,1.02981024 12.0975078,0.145409193 11,0.145454545 L2.14545455,0.145454545 C1.04088505,0.145454545 0.145454545,1.04088505 0.145454545,2.14545455 L0.145454545,11.0727273 C0.140610317,11.765435 0.412398073,12.4314357 0.900518694,12.9229698 C1.38863931,13.4145038 2.05272988,13.690926 2.74545455,13.6909091 L13.3454545,13.6909091 C14.7528534,13.64171 15.8652531,12.4809451 15.8545455,11.0727273 L15.8545455,9.74545455 Z M2.74545455,12.6 C1.91200665,12.6 1.23636364,11.924357 1.23636364,11.0909091 L1.23636364,2.14545455 C1.23636364,1.6433775 1.6433775,1.23636364 2.14545455,1.23636364 L10.9818182,1.23636364 C11.4838952,1.23636364 11.8909091,1.6433775 11.8909091,2.14545455 L11.9454545,9.21818182 L4.81818182,9.21818182 C4.51693559,9.21818182 4.27272727,9.46239014 4.27272727,9.76363636 L4.27272727,11.0909091 C4.27275655,11.4943151 4.11127008,11.8809396 3.82431602,12.1644775 C3.53736195,12.4480155 3.14883127,12.6048603 2.74545455,12.6 Z M14.7636364,11.0909091 C14.7636364,11.924357 14.0879933,12.6 13.2545455,12.6 L4.87272727,12.6 C5.19073474,12.1609811 5.36248689,11.6330023 5.36363636,11.0909091 L5.36363636,10.2909091 L14.7636364,10.2909091 L14.7636364,11.0909091 Z" id="Shape"></path>
                                  <rect x="2.69090909" y="2.52727273" width="4.27272727" height="1.09090909"></rect>
                                  <rect x="2.69090909" y="4.70909091" width="7.90909091" height="1.09090909"></rect>
                                  <rect x="2.69090909" y="6.89090909" width="7.90909091" height="1.09090909"></rect>
                              </g>
                          </g>
                      </svg>&nbsp;Rules</a>
                  </li>
                  <li>
                    <a href="../profile">
                      <svg width="16px" height="16px" viewBox="0 0 16 16">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g fill="#000000">
                                  <g>
                                      <path d="M8,16 C12.4182782,16 16,12.4182782 16,8 C16,3.58172185 12.4182782,0 8,0 C3.58172185,0 0,3.58172185 0,8 C0,12.4182782 3.58172185,16 8,16 Z M8,8.61538462 C9.69933785,8.61538462 11.0769231,7.23779938 11.0769231,5.53846154 C11.0769231,3.83912369 9.69933785,2.46153846 8,2.46153846 C6.30066215,2.46153846 4.92307692,3.83912369 4.92307692,5.53846154 C4.92307692,7.23779938 6.30066215,8.61538462 8,8.61538462 Z M2.21043015,11.5095268 C3.39759569,13.4637705 5.54634462,14.7692308 8,14.7692308 C10.4536554,14.7692308 12.6024043,13.4637705 13.7895698,11.5095268 C13.7825206,11.4557015 13.7611348,11.4030578 13.7247489,11.3575729 C12.9661637,10.4092874 11.7651754,9.84615385 10.1538462,9.84615385 L5.84615385,9.84615385 C4.23482462,9.84615385 3.03383631,10.4092874 2.27525108,11.3575729 C2.23886523,11.4030578 2.21747938,11.4557015 2.21043015,11.5095268 Z"></path>
                                  </g>
                              </g>
                          </g>
                      </svg>&nbsp;My&nbsp;Account</a>
                  </li>
                  <li>
                    <a href="../logout">
                      <svg width="16px" height="14px" viewBox="0 0 16 14">
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g fill="#000000" fill-rule="nonzero">
                                  <polygon points="8.71304348 12.2434783 1.82608696 12.2434783 1.82608696 1.66956522 8.71304348 1.66956522 8.71304348 5.49565217 10.3826087 5.49565217 10.3826087 0 0.156521739 0 0.156521739 13.9130435 10.3826087 13.9130435 10.3826087 8.4173913 8.71304348 8.4173913"></polygon>
                                  <polygon points="12.6608696 7.79130435 11.4434783 9.00869565 12.626087 10.1913043 15.2695652 7.54782609 15.8434783 6.95652174 15.2695652 6.36521739 12.626087 3.72173913 11.4434783 4.90434783 12.6608696 6.12173913 7.04347826 6.12173913 7.04347826 7.79130435"></polygon>
                              </g>
                          </g>
                      </svg>&nbsp;Logout</a>
                  </li>
                </ul>
              </div>
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
      this.$store.dispatch('LOAD_MATCHES')
      this.$store.dispatch('LOAD_STATUS')
      this.$store.dispatch('LOAD_OWN_BETS')
      this.$store.dispatch('LOAD_USERS')

      setInterval( () => {
        this.$store.dispatch('LOAD_MATCHES')
      }, 10000);
    },
    computed: {
      ...mapGetters([
        'loggedInUser'
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
