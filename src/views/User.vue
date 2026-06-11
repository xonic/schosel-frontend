<template>
  <main>
    <div class="wrapper">
      <div v-if="user && user.avatar" class="user__avatar" @click="resetAvatar()">
        <avatar :src="user.avatar" size="xlarge" />
      </div>
      <h1 v-if="user" class="h2 text--center user__name">{{ user.name }}</h1>
      <h2 v-if="user && user.reward >= 0" class="h3 text--center text--gray-20 user__reward">{{ user.reward.toFixed(2) }} &euro;</h2>

      <div class="user-tabs">
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'stats' }" @click="setTab('stats')">Stats</button>
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'bets' }" @click="setTab('bets')">Bets</button>
      </div>

      <div v-if="activeTab === 'stats'">
        <div v-if="user && user.scores && user.scores.length" class="user-scores-section">
          <h2 class="h3 text--center user__section-heading">Scores</h2>
          <ul class="user-scores">
            <li v-for="score in user.scores.filter(s => s.challenge_id <= 2)" :key="score.challenge_id" class="user-scores__item" :class="{ 'user-scores__item--zero': !score.points }">
              <router-link :to="{ name: challengeRoute(score.challenge_id), params: { id: String(score.challenge_id) } }" class="user-scores__link">
                <img v-if="iconPaths.length" :src="getURL(score.challenge_id - 1)" class="user-scores__icon" />
                <div>
                  <div class="user-scores__name" :class="challengeColorClass(score.challenge_id)">{{ formatChallengeName(score.name) }}</div>
                  <div class="user-scores__stats text--small">{{ ordinal(score.rank) }}</div>
                  <div class="user-scores__stats text--small">{{ score.points.toFixed(2) }} pts</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <div v-if="(user && user.champion) && user.champion.name" class="user__champion">
          <h2 class="h3 text--center user__section-heading">Champion bet</h2>
          <div class="text--center user__champion-flag">
            <flag v-if="user.champion.short_name" :iso="user.champion.short_name" size="large" />
          </div>
          <div class="text--center user__champion-name">{{ user.champion.name }}</div>
          <div class="text--small text--gray-20 text--center">Odds: {{ user.champion.odds.toFixed(2) }}</div>
          <div v-if="user.champion_correct" class="user__champion-correct">Correct!</div>
        </div>
      </div>

      <div v-if="activeTab === 'bets'">
        <h2 class="h3 text--center user__section-heading">Match bets</h2>

        <div class="user__bet-stats">
          <div class="text--small text--gray-20">{{ totalBets() }} of {{ totalMatchesPlayed() }} bets placed</div>
          <div class="text--small text--gray-20">{{ remainingSuperbets() }} superbets remaining</div>
        </div>

        <apexchart
          v-if="totalBets()"
          type="bar"
          :options="betChartOptions"
          :series="betStats">
        </apexchart>

        <ul v-if="matches.live && matches.live.length">
          <li v-for="match in matches.live">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
        <ul v-if="matches.over && matches.over.length">
          <li v-for="match in matches.over">
            <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
          </li>
        </ul>
        <div v-if="!(matches.live && matches.live.length) && !(matches.over && matches.over.length)" class="blankslate">
          <div class="blankslate__text">No public bets available</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { HTTP } from '../http-constants'
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import MatchPreview from '@/components/MatchPreview'
import Flag from '@/components/Flag'

export default {
  name: 'user',
  components: {
    MatchPreview,
    Avatar,
    Flag,
  },
  data () {
    return {
      activeTab: this.$route.query.tab || 'stats',
      user: {},
      betStats: [{
        data: [],
        name: 'Bets'
      }]
    }
  },
  props: {
    id: String
  },
  mounted () {

    // Set current user
    // If allUsers hasn't been loaded from server,
    // do an async dispatch first
    if(!this.allUsers.length) {
      this.$store
      .dispatch('LOAD_USERS')
      .then((response) => {
        this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
        this.getBetStats()
      })
    }
    // Else it has already loaded and current user
    // still needs to be found and set
    else {
      this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
      this.getBetStats()
    }
  },
  computed: {
    ...mapGetters([
      'status',
      'allUsers',
      'matches',
      'avatarUrl',
      'iconPaths'
    ]),
    betChartOptions () {
      return {
        chart: {
          id: 'betChart',
          background: 'transparent',
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark'
        },
        dataLabels: {
          style: {
            colors: ['#2D292E']
          }
        },
        markers: {
          colors: ['#2D292E']
        },
        fill: {
          colors: ['#63BEFF']
        },
        grid: {
          show: false
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        xaxis: {
          categories: [ 'Home', 'Draw', 'Away' ]
        },
        yaxis: {
          show: true
        }
      }
    },
  },
  methods: {
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    },
    ordinal(n) {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0]) + ' place'
    },
    challengeColorClass(id) {
      return ['', 'text--cyan', 'text--blue', 'text--purple', 'text--magenta', 'text--orange'][id] || ''
    },
    formatChallengeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    },
    challengeRoute(id) {
      return id === 1 ? 'schosel' : 'loser'
    },
    setTab(tab) {
      this.activeTab = tab
      this.$router.replace({ query: { ...this.$route.query, tab } })
    },
    betForMatch(match) {
      if(this.user && this.user.public_bets) {
        let userBet = this.user.public_bets.find((bet) => bet.match_id === match.match_id)

        return userBet && userBet.bet ? userBet.bet : null
      }
    },
    totalMatchesPlayed() {
      if(!this.matches) return 0
      return (this.matches.live.length || 0) + (this.matches.over.length || 0)
    },
    totalBets() {
      if(!this.user || !this.user.public_bets) return 0
      return this.user.public_bets.length
    },
    homeBets() {
      if(!this.user || !this.user.public_bets) return false
      return this.user.public_bets.filter(bet => bet.bet.outcome === '1').length
    },
    drawBets() {
      if(!this.user || !this.user.public_bets) return false
      return this.user.public_bets.filter(bet => bet.bet.outcome === 'X').length
    },
    awayBets() {
      if(!this.user || !this.user.public_bets) return false
      return this.user.public_bets.filter(bet => bet.bet.outcome === '2').length
    },
    getBetStats() {
      this.betStats[0].data.push(this.homeBets())
      this.betStats[0].data.push(this.drawBets())
      this.betStats[0].data.push(this.awayBets())
    },
    remainingSuperbets () {
      if(!this.user || !this.user.public_bets) return 0
      return 8 - (this.user.public_bets.filter(bet => bet.bet.superbet).length || 0)
    },
    async resetAvatar() {
      console.log('Dispatching avatar reset')
      await this.$store.dispatch('RESET_AVATAR').then(res => {
        this.$store.dispatch('LOAD_USERS')
        .then((response) => {
          this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
        })
      })
    }
  }
}
</script>
