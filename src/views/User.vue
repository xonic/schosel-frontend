<template>
  <main>
    <div class="wrapper">
      <avatar :src="user.avatar" size="xlarge" />
      <h1 class="h2 main__title">{{ user.name }}</h1>
      <radar-chart
        v-if="this.user.scores"
        :labels="chartData.labels"
        :datasets="reversedDatasets"
      ></radar-chart>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
// import BetGrid from '@/components/BetGrid'
import { HTTP } from '../http-constants'
import { mapGetters } from 'vuex'
import RadarChart from '@/components/RadarChart'
import Avatar from '@/components/Avatar'
// import RankProgressBar from '@/components/RankProgressBar'

export default {
  name: 'user',
  components: {
    // BetGrid,
    RadarChart,
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
      'allUsers'
    ]),
    // matchDate () {
    //   return new Date(this.match.date).toLocaleString()
    // },
    reversedDatasets() {
      return [{data: this.chartData.datasets[0].data.map(value => this.allUsers.length + 1 - value)}]
    },
    chartData () {
      return {
        labels: [
          `King's Game - ${this.user.scores.find(score => score.name === 'KINGS_GAME').rank}.`,
          `Oldfashioned - ${this.user.scores.find(score => score.name === 'OLDFASHIONED').rank}.`,
          `Underdog - ${this.user.scores.find(score => score.name === 'UNDERDOG').rank}.`,
          `Balanced - ${this.user.scores.find(score => score.name === 'BALANCED').rank}.`,
          `Secret - ${this.user.scores.find(score => score.name === 'SECRET').rank}.`
        ],
        datasets: [
          {
            // backgroundColor: 'rgba(205, 90, 100, .5)',
            data: [
              this.user.scores.find(score => score.name === 'KINGS_GAME').rank || 0,
              this.user.scores.find(score => score.name === 'OLDFASHIONED').rank || 0,
              this.user.scores.find(score => score.name === 'UNDERDOG').rank || 0,
              this.user.scores.find(score => score.name === 'BALANCED').rank || 0,
              this.user.scores.find(score => score.name === 'SECRET').rank || 0,
            ],
          }
        ]
      }
    },
    // remainingSuperbets () {
    //   return 8 - this.user.visible_supertips
    // },
    // bets () {
    //   return this.user.bets.map(bet => {
    //     return {
    //       id: bet.match.match_id,
    //       match: bet.match.team1_name + " vs. " + bet.match.team2_name,
    //       bet: bet.outcome == 1 ? bet.match.team1_name : bet.outcome == 2 ? bet.match.team2_name : bet.outcome == "X" ? "Draw" : "-",
    //       outcome: bet.match.team1_goals + " : " + bet.match.team2_goals,
    //       superbet: bet.supertip,
    //       score: bet.points ? bet.points.toFixed(2) : 0
    //     }
    //   })
    // }
  }
}
</script>
