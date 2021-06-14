<template>
  <main class="page--match">
    <div class="wrapper">
      <h1 class="h2 main__title">Match</h1>
      <match-preview
        v-if="match && betForMatch(match)"
        :match="match"
        :bet="betForMatch(match)"
      />
      <ul v-if="allUsers.length">
        <li v-for="user in usersByPoints">
          <user-preview v-if="match" :user="user" type="score" :match-id="match.match_id" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
  // @ is an alias to /src
  import ResultGrid from '@/components/ResultGrid'
  import UserPreview from '@/components/UserPreview.vue'
  import MatchPreview from '@/components/MatchPreview.vue'
  import { HTTP } from '../http-constants'
  import { mapGetters } from 'vuex'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

  export default {
    name: 'match',
    components: {
      ClipLoader,
      ResultGrid,
      UserPreview,
      MatchPreview
    },
    data() {
      return {
        match: {}
      }
    },
    props: ['id'],
    mounted () {
      // Set current match
      // If matches hasn't been loaded from server,
      // do an async dispatch first
      if(!this.matches.length) {
        this.$store
        .dispatch('LOAD_MATCHES')
        .then((response) => {
          this.match =
            // this.matches.scheduled.find(match => match.match_id === parseInt(this.id, 10)) ||
            this.matches.live.find(match => match.match_id === parseInt(this.id, 10)) ||
            this.matches.over.find(match => match.match_id === parseInt(this.id, 10))
        })
      }
      // Else it has already loaded and current match
      // still needs to be found and set
      else {
        this.match =
          // this.matches.scheduled.find(match => match.match_id === parseInt(this.id, 10)) ||
          this.matches.live.find(match => match.match_id === parseInt(this.id, 10)) ||
          this.matches.over.find(match => match.match_id === parseInt(this.id, 10))
      }
    },
    computed: {
      ...mapGetters([
        'matches',
        'allUsers',
        'loggedInUser'
      ]),
      usersByPoints() {

        if(!this.allUsers || !this.id) return

        const self = this

        // let allBetsOfMatch = this.allUsers.forEach(user => user.pub)
        // sort bets

        return self.allUsers.sort((a, b) => {

          let user1Bet = a.public_bets.find(bet => bet.match_id == self.id)
          let user2Bet = b.public_bets.find(bet => bet.match_id == self.id)

          // if user a has no bet, init totalpoints to zero
          if(!user1Bet) {
            user1Bet = {}
            user1Bet['bet'] = {}
            user1Bet.bet['totalPoints'] = 0
          }

          // if user b has no bet, init totalpoints to zero
          if(!user2Bet) {
            user2Bet = {}
            user2Bet['bet'] = {}
            user2Bet.bet['totalPoints'] = 0
          }

          return user2Bet.bet.totalPoints - user1Bet.bet.totalPoints
        })
      }
    },
    methods: {
      betForMatch(match) {
        if(this.loggedInUser && this.loggedInUser.private_bets) {
          let userBet = this.loggedInUser.private_bets.find((bet) => bet.match_id === this.match.match_id)

          return userBet && userBet.bet ? userBet.bet : null
        }
      }
    }
  }
</script>
