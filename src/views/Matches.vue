<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Matches</h1>
      <ul v-if="matches">
        <li v-for="match in matches.live">
          <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
        </li>
        <li v-for="match in matches.over">
          <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import MatchPreview from '@/components/MatchPreview'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'matches',
      'loggedInUser'
    ])
  },
  components: {
    ClipLoader,
    MatchPreview
  },
  methods: {
    betForMatch(match) {
      if(this.loggedInUser && this.loggedInUser.private_bets) {
        let userBet = this.loggedInUser.private_bets.find((bet) => bet.match_id === match.match_id)

        return userBet && userBet.bet ? userBet.bet : null
      }
    },
  }
}
</script>
