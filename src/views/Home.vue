<template>
  <main>
    <div class="wrapper">
      <div class="home__section" v-if="liveMatches && liveMatches.length">
        <h1 class="h2 main__title text--red is-live">Live now</h1>
        <ul>
          <li v-for="match in liveMatches" class="match">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
      </div>
      <div class="home__section" v-if="lastMatchDayBets && lastMatchDayBets.length">
        <h1 class="h2 main__title">Last match day</h1>
        <h2 class="h3 text--center">{{ matchDate(lastMatchDayBets[0].date) }}</h2>
        <div class="text--small text--gray-20 text--center main__title">{{ lastMatchDayBets.length }} matches</div>
        <ul class="last-match-day text--center text--gray-20">
          <li :class="lastMatchDayPoints[0] > 0 ? 'text--cyan' : 'icon--zero-points'">
            <router-link :to="{ name: 'schosel' }">
              <img v-if="iconPaths.length" :src="getURL(0)" />
              <div>
                <div class="text--small">Schosel</div>
                <div>+{{ lastMatchDayPoints[0] }}</div>
                <div v-if="loggedInUser" class="text--small">{{ loggedInUser.scores[0].rank }}.</div>
              </div>
            </router-link>
          </li>
          <li :class="lastMatchDayPoints[1] > 0 ? 'text--blue' : 'icon--zero-points'">
            <router-link :to="{ name: 'loser' }">
              <img v-if="iconPaths.length" :src="getURL(1)" />
              <div>
                <div class="text--small">Loser</div>
                <div>+{{ lastMatchDayPoints[1] }}</div>
                <div v-if="loggedInUser" class="text--small">{{ loggedInUser.scores[1].rank }}.</div>
              </div>
            </router-link>
          </li>
          <li :class="lastMatchDayPoints[2] > 0 ? 'text--purple' : 'icon--zero-points'">
            <router-link :to="{ name: 'underdog' }">
              <img v-if="iconPaths.length" :src="getURL(2)" />
              <div>
                <div class="text--small">Underdog</div>
                <div>+{{ lastMatchDayPoints[2] }}</div>
                <div v-if="loggedInUser" class="text--small">{{ loggedInUser.scores[2].rank }}.</div>
              </div>
            </router-link>
          </li>
          <li :class="lastMatchDayPoints[3] > 0 ? 'text--magenta' : 'icon--zero-points'">
            <router-link :to="{ name: 'balanced' }">
              <img v-if="iconPaths.length" :src="getURL(3)" />
              <div>
                <div class="text--small">Balanced</div>
                <div>+{{ lastMatchDayPoints[3] }}</div>
                <div v-if="loggedInUser" class="text--small">{{ loggedInUser.scores[3].rank }}.</div>
              </div>
            </router-link>
          </li>
          <li :class="lastMatchDayPoints[4] > 0 ? 'text--orange' : 'icon--zero-points'">
            <router-link :to="{ name: 'comeback' }">
              <img v-if="iconPaths.length" :src="getURL(4)" />
              <div>
                <div class="text--small">Comeback</div>
                <div>+{{ lastMatchDayPoints[4] }}</div>
                <div v-if="loggedInUser" class="text--small">{{ loggedInUser.scores[4].rank }}.</div>
              </div>
            </router-link>
          </li>
        </ul>

      </div>

      <div class="home__section" v-if="nextMatchDay && nextMatchDay.length">
        <h1 class="h2 main__title">Next match day</h1>
        <h2 class="h3 text--center">{{ matchDate(nextMatchDay[0].date) }}</h2>
        <div class="text--small text--gray-20 text--center main__title">{{ nextMatchDay.length }} matches</div>
        <ul>
          <li v-for="match in nextMatchDay" class="match">
            <bet :match="match" />
          </li>
        </ul>
      </div>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">Move on, nothing to see here yet</div>
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
import Avatar from '@/components/Avatar'
import AvailableSuperBets from '@/components/AvailableSuperBets'

export default {
  name: 'home',
  components: {
    ClipLoader,
    MatchPreview,
    RankProgressBar,
    Bet,
    Avatar,
    AvailableSuperBets
  },
  computed: {
    ...mapGetters([
      'lastMatch',
      'liveMatches',
      'nextMatch',
      'nextMatchDay',
      'loggedInUser',
      'loading',
      'allUsers',
      'iconPaths',
      'avatarUrl'
    ]),
    lastMatchDayBets() {
      if(!this.allUsers || !this.loggedInUser) return

      let lastMatchDayBets = []
      let currentUser = this.allUsers.find(user => user.user_id === this.loggedInUser.user_id)
      if(!currentUser) return
      let currentUserBets = currentUser.public_bets

      currentUserBets.sort((a, b) => new Date(b.date) - new Date(a.date))

      const lastMatchDate = new Date(currentUserBets[0].date)

      lastMatchDayBets = currentUserBets.filter(bet => {

        const betDate = new Date(bet.date)

        return (betDate.getFullYear() === lastMatchDate.getFullYear() &&
                betDate.getMonth() === lastMatchDate.getMonth()) &&
                betDate.getDate() === lastMatchDate.getDate()
      })

      return lastMatchDayBets
    },
    lastMatchDayPoints() {
      if(!this.lastMatchDayBets || !this.lastMatchDayBets.length) return

      let schoselPoints = 0
      let loserPoints = 0
      let underdogPoints = 0
      let balancedPoints = 0
      let secretPoints = 0

      this.lastMatchDayBets.forEach((bet, i) => {
        schoselPoints += bet.bet.points[0].points
        loserPoints += bet.bet.points[1].points
        underdogPoints += bet.bet.points[2].points
        balancedPoints += bet.bet.points[3].points
        secretPoints += bet.bet.points[4].points
      })


      return [
        schoselPoints.toFixed(2),
        loserPoints.toFixed(2),
        underdogPoints.toFixed(2),
        balancedPoints.toFixed(2),
        secretPoints.toFixed(2)
      ]
    }
  },
  methods: {
    betForMatch(match) {
      if(this.loggedInUser && this.loggedInUser.private_bets) {
        let userBet = this.loggedInUser.private_bets.find((bet) => bet.match_id === match.match_id)

        return userBet && userBet.bet ? userBet.bet : null
      }
    },
    matchDate: date => {
      let theDate = new Date(date)
      let dateOptions = {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      }
      return theDate.toLocaleString('en-GB', dateOptions)
    },
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    }
  }
}
</script>
