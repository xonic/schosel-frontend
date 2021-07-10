<template>
  <main>
    <div class="wrapper">
      <div v-if="user && user.avatar" class="user__avatar" @click="resetAvatar()">
        <avatar :src="user.avatar" size="xlarge" />
      </div>
      <h1 v-if="user" class="h2 text--center">{{ user.name }}</h1>
      <h2 v-if="user && user.reward >= 0" class="h3 main__title text--gray-20">{{ user.reward.toFixed(2) }} &euro;</h2>

      <h3 v-if="(user && user.champion) && user.champion.name" class="text--center">{{ user.champion.name }}</h3>
      <div v-if="(user && user.champion) && user.champion.name" class="text--small text--gray-20 text--center">Odds: {{ user.champion.odds.toFixed(2) }}</div>

      <apexchart
        v-if="user && user.scores"
        type="radar"
        :options="radarChartOptions"
        :series="reversedDatasets">
      </apexchart>

      <h2 class="h3 main__title">Bets</h2>

      <div class="text--small text--gray-20 text--center">{{ totalBets() }} of {{ totalMatchesPlayed() }} bets placed</div>
      <div class="text--small text--gray-20 main__title">{{ remainingSuperbets() }} superbets remaining</div>

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
      <div v-else class="blankslate">
        <div class="blankslate__text">No public bets available</div>
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

export default {
  name: 'user',
  components: {
    MatchPreview,
    Avatar,
  },
  data () {
    return {
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
      'avatarUrl'
    ]),
    reversedDatasets() {
      return [{
        name: 'Points',
        data: this.radarChartOptions.datasets[0].data.map(value => this.allUsers.length + 1 - value)
      }]
    },
    radarChartOptions () {
      return {
        chart: {
          id: 'rank-chart',
          background: 'transparent',
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark'
        },
        markers: {
          colors: [
            '#FFD84D'
          ],
        },
        fill: {
          colors: [
            '#FFD84D'
          ],
        },
        stroke: {
          colors: [
            '#FFD84D'
          ],
        },
        plotOptions: {
          radar: {
            polygons: {
              connectorColors: '#3A353B',
              strokeColors: '#3A353B',
              fill: {
                  colors: ['transparent']
              }
            }
          }
        },
        xaxis: {
          categories: [
            `Schosel - ${this.user.scores.find(score => score.name === 'SCHOSEL').rank}.`,
            `Loser - ${this.user.scores.find(score => score.name === 'LOSER').rank}.`,
            `Underdog - ${this.user.scores.find(score => score.name === 'UNDERDOG').rank}.`,
            `Balanced - ${this.user.scores.find(score => score.name === 'BALANCED').rank}.`,
            `Comeback - ${this.user.scores.find(score => score.name === 'COMEBACK').rank}.`
          ],
          labels: {
            trim: true,
            style: {
              colors: [
                '#66FFDB',
                '#63BEFF',
                '#CBA6FF',
                '#FF96CB',
                '#FFA24D'
              ],
              fontSize: '.9rem'
            }
          },
        },
        yaxis: {
          show: false
        },
        datasets: [
          {
            data: [
              this.user.scores.find(score => score.name === 'SCHOSEL').rank || 0,
              this.user.scores.find(score => score.name === 'LOSER').rank || 0,
              this.user.scores.find(score => score.name === 'UNDERDOG').rank || 0,
              this.user.scores.find(score => score.name === 'BALANCED').rank || 0,
              this.user.scores.find(score => score.name === 'COMEBACK').rank || 0,
            ],
          }
        ]
      }
    },
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
    // bets () {
    //   return this.user.bets.map(bet => {
    //     return {
    //       id: bet.match.match_id,
    //       match: bet.match.team1_name + " vs. " + bet.match.team2_name,
    //       bet: bet.outcome == 1 ? bet.match.team1_name : bet.outcome == 2 ? bet.match.team2_name : bet.outcome == "X" ? "Draw" : "-",
    //       outcome: bet.match.team1_goals + " : " + bet.match.team2_goals,
    //       superbet: bet.superbet,
    //       score: bet.points ? bet.points.toFixed(2) : 0
    //     }
    //   })
    // }
  },
  methods: {
    betForMatch(match) {
      if(this.user && this.user.public_bets) {
        let userBet = this.user.public_bets.find((bet) => bet.match_id === match.match_id)

        return userBet && userBet.bet ? userBet.bet : null
      }
    },
    totalMatchesPlayed() {
      if(!this.matches) return 0
      return (this.matches.live.length || 0) + (this.matches.over.length || 0)
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
