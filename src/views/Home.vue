<template>
  <main>
    <div class="wrapper">
      <div class="home__section" v-if="liveMatches && liveMatches.length">
        <h1 class="h2 main__title text--red is-live">Live</h1>
        <ul>
          <li v-for="match in liveMatches" class="match">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
        <!-- <router-link :to="{ name: 'matches' }">View all</router-link> -->
      </div>
      <div class="home__section" v-if="lastMatch && lastMatch.length">
        <h1 class="h2 main__title">Last match</h1>
        <ul>
          <li v-for="match in lastMatch" class="match">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
      </div>
      <div class="home__section" v-if="nextMatch && nextMatch.length">
        <h1 class="h2 main__title">Next match</h1>
        <ul>
          <li v-for="match in nextMatch" class="match">
            <bet :match="match" />
          </li>
        </ul>
        <!-- <router-link :to="{ name: 'bets' }">View all</router-link> -->
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import MatchPreview from '@/components/MatchPreview'
import RankProgressBar from '@/components/RankProgressBar'
import Bet from '@/components/Bet'

export default {
  name: 'home',
  data() {
    return {
      switchLayout: false
    }
  },
  components: {
    ClipLoader,
    MatchPreview,
    RankProgressBar,
    Bet
  },
  mounted () {
    let self = this
    // Check media query on resize to determine whether
    // progress bars should be rendered vertically or horizontally
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener()
  },
  computed: {
    ...mapGetters([
      'lastMatch',
      'liveMatches',
      'nextMatch',
      'loggedInUser',
      'loading',
      'allUsers'
    ]),
    recentlyPlayed () {
      // Sort played matches most recent first
      let recentFirst = this.overMatches.sort((a,b) => { return a.date < b.date }).slice()

      // Depending on the current number of live matches, return 0 - 3 played matches
      const mostRecent = recentFirst.splice(0, 3 - this.liveMatches.length)

      return mostRecent
    }
  },
  methods: {
    resizeListener(e) {
      // NOTE: DO NOT use an arrow function here. It will mess up 'this' reference
      // Check media query on resize to determine whether
      // progress bars should be rendered vertically or horizontally
      this.switchLayout = window.matchMedia("(min-width: 800px)").matches ? true : false
    },
    betForMatch(match) {
      if(this.loggedInUser && this.loggedInUser.private_bets) {
        let userBet = this.loggedInUser.private_bets.find((bet) => bet.match_id === match.match_id)

        return userBet && userBet.bet ? userBet.bet : null
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  }
}
</script>
