<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Matches</h1>
      <div v-if="(liveMatches && liveMatches.length) || (overMatches && overMatches.length)">
        <ul>
          <li v-if="liveMatches" v-for="match in liveMatches">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
            <!-- <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" /> -->
          </li>
          <li v-if="overMatches" v-for="match in overMatches">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
      </div>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">No matches played</div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import MatchPreview from '@/components/MatchPreview'
import Avatar from '@/components/Avatar'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'liveMatches',
      'overMatches',
      'loggedInUser',
      'avatarUrl'
    ])
  },
  components: {
    ClipLoader,
    MatchPreview,
    Avatar
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
