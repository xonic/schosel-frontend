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

      <div class="home__section" v-if="currentMatchDayBets && currentMatchDayBets.length">
        <h1 class="h2 main__title">Current match day</h1>
        <h2 class="h3 text--center">{{ matchDate(currentMatchDayBets[0].date) }}</h2>
        <div v-if="currentMatchDayBets.length === 1" class="text--small text--gray-20 text--center main__title">{{ currentMatchDayBets.length }} match</div>
        <div v-else class="text--small text--gray-20 text--center main__title">{{ currentMatchDayBets.length }} matches</div>
        <ul class="last-match-day">
          <li :class="currentMatchDayPoints[0] > 0 ? 'text--cyan' : 'icon--zero-points'">
            <router-link :to="{ name: 'schosel' }" class="last-match-day__item">
              <img v-if="iconPaths.length" :src="getURL(0)" class="last-match-day__icon" />
              <div>
                <div class="last-match-day__name">Schosel</div>
                <div class="last-match-day__stats text--small">+{{ currentMatchDayPoints[0] }} points</div>
              </div>
            </router-link>
          </li>
          <li :class="currentMatchDayPoints[1] > 0 ? 'text--blue' : 'icon--zero-points'">
            <router-link :to="{ name: 'loser' }" class="last-match-day__item">
              <img v-if="iconPaths.length" :src="getURL(1)" class="last-match-day__icon" />
              <div>
                <div class="last-match-day__name">Loser</div>
                <div class="last-match-day__stats text--small">+{{ currentMatchDayPoints[1] }} points</div>
              </div>
            </router-link>
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
import { getRandomSeed, berlinMatchDay } from '@/utils'

function sumPoints(bets) {
  let s = [0, 0, 0, 0, 0]
  bets.forEach(bet => {
    if (!bet.bet || !bet.bet.points) return
    s = s.map((v, i) => v + ((bet.bet.points[i] && bet.bet.points[i].points) || 0))
  })
  return s.map(v => v.toFixed(2))
}

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
    _currentUserBets() {
      if (!this.allUsers || !this.loggedInUser) return []
      const user = this.allUsers.find(u => u.user_id === this.loggedInUser.user_id)
      return (user && user.public_bets) || []
    },
    currentMatchDayBets() {
      const today = berlinMatchDay(new Date())
      const todayBets = this._currentUserBets.filter(b => berlinMatchDay(b.date) === today)
      const hasStarted = todayBets.some(b => b.status === 'live' || b.status === 'over')
      const isComplete = todayBets.length > 0 && todayBets.every(b => b.status === 'over')
      return (hasStarted && !isComplete) ? todayBets : []
    },
    currentMatchDayPoints() {
      return sumPoints(this.currentMatchDayBets)
    },
    lastMatchDayBets() {
      const sorted = this._currentUserBets.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
      const days = [...new Set(sorted.map(b => berlinMatchDay(b.date)))]
      for (const day of days) {
        const dayBets = sorted.filter(b => berlinMatchDay(b.date) === day)
        if (dayBets.every(b => b.status === 'over')) return dayBets
      }
      return []
    },
    lastMatchDayPoints() {
      return sumPoints(this.lastMatchDayBets)
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
