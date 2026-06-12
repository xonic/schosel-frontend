<template>
  <main>
    <div class="wrapper">
      <div class="home__section" v-if="liveMatches && liveMatches.length">
        <h1 class="h2 main__title text--red is-live">Now live</h1>
        <ul>
          <li v-for="match in liveMatches" class="match">
            <match-preview :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
      </div>
      <div class="home__section" v-if="lastMatchDayBets && lastMatchDayBets.length">
        <h1 class="h2 main__title">Last match day</h1>
        <h2 class="h3 text--center">{{ matchDate(lastMatchDayBets[0].date) }}</h2>
        <div v-if="lastMatchDayBets.length === 1" class="text--small text--gray-20 text--center main__title">{{ lastMatchDayBets.length }} match</div>
        <div v-else class="text--small text--gray-20 text--center main__title">{{ lastMatchDayBets.length }} matches</div>
<ul class="last-match-day">
          <li :class="lastMatchDayPoints[0] > 0 ? 'text--cyan' : 'icon--zero-points'">
            <router-link :to="{ name: 'schosel' }" class="last-match-day__item">
              <img v-if="iconPaths.length" :src="getURL(0)" class="last-match-day__icon" />
              <div>
                <div class="last-match-day__name">Schosel</div>
                <div class="last-match-day__stats text--small">
                  +{{ lastMatchDayPoints[0] }} points<span v-if="loggedInUser && loggedInUser.scores && loggedInUser.scores.length"> · {{ ordinal(loggedInUser.scores[0].rank) }}</span>
                </div>
              </div>
            </router-link>
          </li>
          <li :class="lastMatchDayPoints[1] > 0 ? 'text--blue' : 'icon--zero-points'">
            <router-link :to="{ name: 'loser' }" class="last-match-day__item">
              <img v-if="iconPaths.length" :src="getURL(1)" class="last-match-day__icon" />
              <div>
                <div class="last-match-day__name">Loser</div>
                <div class="last-match-day__stats text--small">
                  +{{ lastMatchDayPoints[1] }} points<span v-if="loggedInUser"> · {{ ordinal(loggedInUser.scores[1].rank) }}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>

      </div>

      <div class="home__section" v-if="nextMatchDay && nextMatchDay.length">
        <h1 class="h2 main__title">Next match day</h1>
        <h2 class="h3 text--center">{{ matchDate(nextMatchDay[0].date) }}</h2>
        <div v-if="nextMatchDay.length === 1" class="text--small text--gray-20 text--center main__title">{{ nextMatchDay.length }} match</div>
        <div v-else class="text--small text--gray-20 text--center main__title">{{ nextMatchDay.length }} matches</div>
        <ul>
          <li v-for="match in nextMatchDay" class="match">
            <bet :match="match" />
          </li>
        </ul>
      </div>
      <div v-if="!(liveMatches && liveMatches.length) && !(lastMatchDayBets && lastMatchDayBets.length) && !(nextMatchDay && nextMatchDay.length)" class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + getRandomSeed()" size="xlarge" />
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
import { getRandomSeed } from '@/utils'

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

      if(!currentUserBets || !currentUserBets.length) return []

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
        if(!bet.bet || !bet.bet.points) return
        schoselPoints += (bet.bet.points[0] && bet.bet.points[0].points) || 0
        loserPoints += (bet.bet.points[1] && bet.bet.points[1].points) || 0
        underdogPoints += (bet.bet.points[2] && bet.bet.points[2].points) || 0
        balancedPoints += (bet.bet.points[3] && bet.bet.points[3].points) || 0
        secretPoints += (bet.bet.points[4] && bet.bet.points[4].points) || 0
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
    getRandomSeed,
    ordinal(n) {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0]) + ' place'
    },
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
