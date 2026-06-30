<template>
  <main>
    <div class="wrapper">
      <div class="home__section" v-if="futureUnbetMatches && futureUnbetMatches.length">
        <message type="warning" :to="{ name: 'matches', params: { tab: 'upcoming' } }" class="msg--banner">
          <span>{{ futureUnbetMatches.length }} upcoming match{{ futureUnbetMatches.length !== 1 ? 'es' : '' }} need{{ futureUnbetMatches.length === 1 ? 's' : '' }} your bet</span>
          <img src="../assets/img/icons/i--chevron-right.svg" class="msg__chevron" />
        </message>
      </div>

      <div class="home__section" v-if="liveMatches && liveMatches.length">
        <h1 class="h2 main__title text--red is-live">Now live</h1>
        <ul>
          <li v-for="match in liveMatches" class="match">
            <match-preview :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
      </div>

      <div class="home__section" v-if="currentMatchDayBets && currentMatchDayBets.length">
        <table class="match-day-table">
          <colgroup>
            <col class="match-day-table__col--team" />
            <col class="match-day-table__col--score" />
            <col class="match-day-table__col--team" />
            <col class="match-day-table__col--pts" />
            <col class="match-day-table__col--pts" />
          </colgroup>
          <thead>
            <tr>
              <th class="match-day-table__day" colspan="3">Current match day</th>
              <th class="match-day-table__pts"><img :src="icons[0]" class="match-day-table__mode-icon" /></th>
              <th class="match-day-table__pts"><img :src="icons[1]" class="match-day-table__mode-icon" /></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bet in currentMatchDayBets" :key="bet.match_id">
              <td>
                <div class="match-day-table__team match-day-table__team--home">
                  <flag :iso="bet.team1_iso" size="small" />
                  <span class="text--small match-day-table__name">{{ bet.team1_name }}</span>
                  <span class="text--small match-day-table__iso">{{ bet.team1_iso.toUpperCase() }}</span>
                </div>
              </td>
              <td class="match-day-table__score text--small">{{ bet.team1_goals !== null ? bet.team1_goals + ':' + bet.team2_goals : '–:–' }}</td>
              <td>
                <div class="match-day-table__team match-day-table__team--away">
                  <span class="text--small match-day-table__name">{{ bet.team2_name }}</span>
                  <span class="text--small match-day-table__iso">{{ bet.team2_iso.toUpperCase() }}</span>
                  <flag :iso="bet.team2_iso" size="small" />
                </div>
              </td>
              <td class="match-day-table__pts" :class="betPoints(bet, 0) > 0 ? 'text--cyan' : 'text--gray-14'">
                <span class="text--small">{{ betPoints(bet, 0) > 0 ? '+' + betPoints(bet, 0).toFixed(2) : '-' }}</span>
              </td>
              <td class="match-day-table__pts" :class="betPoints(bet, 1) > 0 ? 'text--blue' : 'text--gray-14'">
                <span class="text--small">{{ betPoints(bet, 1) > 0 ? '+' + betPoints(bet, 1).toFixed(2) : '-' }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td class="match-day-table__pts" :class="currentMatchDayPoints[0] > 0 ? 'text--cyan' : 'text--gray-14'">
                <div class="text--small"><strong>{{ currentMatchDayPoints[0] > 0 ? '+' + currentMatchDayPoints[0] : '-' }}</strong></div>
              </td>
              <td class="match-day-table__pts" :class="currentMatchDayPoints[1] > 0 ? 'text--blue' : 'text--gray-14'">
                <div class="text--small"><strong>{{ currentMatchDayPoints[1] > 0 ? '+' + currentMatchDayPoints[1] : '-' }}</strong></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="home__section" v-if="lastMatchDayBets && lastMatchDayBets.length">
        <table class="match-day-table">
          <colgroup>
            <col class="match-day-table__col--team" />
            <col class="match-day-table__col--score" />
            <col class="match-day-table__col--team" />
            <col class="match-day-table__col--pts" />
            <col class="match-day-table__col--pts" />
          </colgroup>
          <thead>
            <tr>
              <th class="match-day-table__day" colspan="3">Last match day</th>
              <th class="match-day-table__pts"><img :src="icons[0]" class="match-day-table__mode-icon" /></th>
              <th class="match-day-table__pts"><img :src="icons[1]" class="match-day-table__mode-icon" /></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bet in lastMatchDayBets" :key="bet.match_id">
              <td>
                <div class="match-day-table__team match-day-table__team--home">
                  <flag :iso="bet.team1_iso" size="small" />
                  <span class="text--small match-day-table__name">{{ bet.team1_name }}</span>
                  <span class="text--small match-day-table__iso">{{ bet.team1_iso.toUpperCase() }}</span>
                </div>
              </td>
              <td class="match-day-table__score text--small">{{ bet.team1_goals }}:{{ bet.team2_goals }}</td>
              <td>
                <div class="match-day-table__team match-day-table__team--away">
                  <span class="text--small match-day-table__name">{{ bet.team2_name }}</span>
                  <span class="text--small match-day-table__iso">{{ bet.team2_iso.toUpperCase() }}</span>
                  <flag :iso="bet.team2_iso" size="small" />
                </div>
              </td>
              <td class="match-day-table__pts" :class="betPoints(bet, 0) > 0 ? 'text--cyan' : 'text--gray-14'">
                <span class="text--small">{{ betPoints(bet, 0) > 0 ? '+' + betPoints(bet, 0).toFixed(2) : '-' }}</span>
              </td>
              <td class="match-day-table__pts" :class="betPoints(bet, 1) > 0 ? 'text--blue' : 'text--gray-14'">
                <span class="text--small">{{ betPoints(bet, 1) > 0 ? '+' + betPoints(bet, 1).toFixed(2) : '-' }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"></td>
              <td class="match-day-table__pts" :class="lastMatchDayPoints[0] > 0 ? 'text--cyan' : 'text--gray-14'">
                <div class="text--small"><strong>{{ lastMatchDayPoints[0] > 0 ? '+' + lastMatchDayPoints[0] : '-' }}</strong></div>
                <div v-if="loggedInUser && loggedInUser.scores && loggedInUser.scores.length" class="text--small match-day-table__rank text--cyan">{{ ordinal(loggedInUser.scores[0].rank) }}</div>
              </td>
              <td class="match-day-table__pts" :class="lastMatchDayPoints[1] > 0 ? 'text--blue' : 'text--gray-14'">
                <div class="text--small"><strong>{{ lastMatchDayPoints[1] > 0 ? '+' + lastMatchDayPoints[1] : '-' }}</strong></div>
                <div v-if="loggedInUser && loggedInUser.scores" class="text--small match-day-table__rank text--blue">{{ ordinal(loggedInUser.scores[1].rank) }}</div>
              </td>
            </tr>
          </tfoot>
        </table>
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
import Flag from '@/components/Flag'
import Message from '@/components/Message'
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
  data () {
    return {
      icons: [
        require('@/assets/img/icons/i--1.svg'),
        require('@/assets/img/icons/i--2.svg')
      ]
    }
  },
  components: {
    ClipLoader,
    MatchPreview,
    RankProgressBar,
    Bet,
    Avatar,
    AvailableSuperBets,
    Flag,
    Message
  },
  computed: {
    ...mapGetters([
      'lastMatch',
      'liveMatches',
      'nextMatch',
      'nextMatchDay',
      'futureUnbetMatches',
      'loggedInUser',
      'loading',
      'allUsers',
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
    berlinMatchDay,
    ordinal(n) {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0])
    },
    betPoints(bet, index) {
      return (bet.bet && bet.bet.points && bet.bet.points[index] && bet.bet.points[index].points) || 0
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
  }
}
</script>
