<template>
  <main>
    <div class="wrapper">
      <div v-if="user && user.avatar" class="user__avatar" @click="resetAvatar()">
        <avatar :src="user.avatar" size="xlarge" />
      </div>
      <h1 v-if="user" class="h2 text--center">{{ user.name }}</h1>
      <h2 v-if="user && user.reward >= 0" class="h3 main__title text--gray-20">{{ user.reward.toFixed(2) }} &euro;</h2>
      <apexchart
        v-if="user && user.scores"
        type="radar"
        :options="chartOptions"
        :series="reversedDatasets">
      </apexchart>

      <h2 class="h3 main__title">Bets</h2>
      <ul v-if="matches.live && matches.live.length">
        <li v-for="match in matches.over">
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
      user: {}
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
      })
    }
    // Else it has already loaded and current user
    // still needs to be found and set
    else {
      this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
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
        data: this.chartOptions.datasets[0].data.map(value => this.allUsers.length + 1 - value)
      }]
    },
    chartOptions () {
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
            `Secret - ${this.user.scores.find(score => score.name === 'COMEBACK').rank}.`
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
    // remainingSuperbets () {
    //   return 8 - this.user.visible_superbets
    // },
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
