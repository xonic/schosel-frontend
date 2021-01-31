<template>
  <main>
    <div class="wrapper">
      <avatar :src="user.avatar" size="xlarge" />
      <h1 class="h2 main__title">{{ user.name }}</h1>
      <apexchart
        v-if="this.user && this.user.scores"
        type="radar"
        :options="chartOptions"
        :series="reversedDatasets">
      </apexchart>

      <ul v-if="matches.over && matches.over.length">
        <li v-for="match in matches.over">
          <match-preview :match="match" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
// import BetGrid from '@/components/BetGrid'
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
      'matches'
    ]),
    // matchDate () {
    //   return new Date(this.match.date).toLocaleString()
    // },
    reversedDatasets() {
      return [{
        name: 'Points',
        data: this.chartOptions.datasets[0].data.map(value => this.allUsers.length + 1 - value)
      }]
    },
    chartOptions () {
      return {
        chart: {
          id: 'vuechart-example',
          background: 'transparent',
          sparkline: {
            // enabled: true
          },
          toolbar: {
            show: false
          }
        },
        theme: {
          mode: 'dark'
        },
        grid: {
          borderColor: '#625964'
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
        xaxis: {
          categories: [
            `Kings - ${this.user.scores.find(score => score.name === 'KINGS_GAME').rank}.`,
            `Oldfashioned - ${this.user.scores.find(score => score.name === 'OLDFASHIONED').rank}.`,
            `Underdog - ${this.user.scores.find(score => score.name === 'UNDERDOG').rank}.`,
            `Balanced - ${this.user.scores.find(score => score.name === 'BALANCED').rank}.`,
            `Secret - ${this.user.scores.find(score => score.name === 'SECRET').rank}.`
            // `King's Game - ${this.user.scores.find(score => score.name === 'KINGS_GAME').rank}.`,
            // `Oldfashioned - ${this.user.scores.find(score => score.name === 'OLDFASHIONED').rank}.`,
            // `Underdog - ${this.user.scores.find(score => score.name === 'UNDERDOG').rank}.`,
            // `Balanced - ${this.user.scores.find(score => score.name === 'BALANCED').rank}.`,
            // `Secret - ${this.user.scores.find(score => score.name === 'SECRET').rank}.`
          ],
          labels: {
            style: {
              colors: [
                '#66FFDB',
                '#63BEFF',
                '#CBA6FF',
                '#FF96CB',
                '#FFA24D'
              ],
              fontSize: '1rem'
            }
          }
        },
        // $gray-10:      #2D292E;
        // $gray-12:      #3A353B;
        // $gray-14:      #625964;
        // $gray-20:      #C0BEC1;
        //
        // $cyan-100:     #66FFDB;
        // $blue-100:     #63BEFF;
        // $purple-100:   #CBA6FF;
        // $magenta-100:  #FF96CB;
        // $red-100:      #FF5757;
        // $orange-100:   #FFA24D;
        // $yellow-100:   #FFD84D;
        // $green-100:    #97FF88;
        //
        // $body-bg:      $gray-10;
        datasets: [
          {
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
