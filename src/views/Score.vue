<template>
  <div class="score">
    <h1>Score</h1>
    <div v-if='loggedInUser'>{{ loggedInUser.points.toFixed(2) }} pts</div>
    <div v-if='loggedInUserRank'>{{ loggedInUserRank }}. rank</div>
    <div class="">
      <h2>Achievements</h2>
      <ul>
        <li>
          <div class="">
            National expert
          </div>
          <div class="">
            Most correct bets for one team
          </div>
          <div class="">
            12 times North Korea
          </div>
        </li>
        <li>
          <div class="">
            Gambler
          </div>
          <div class="">
            Most bets on highest odds
          </div>
          <div class="">
            18 times
          </div>
        </li>
      </ul>
      <h2>Ranking</h2>
      <grid
        :data="gridData"
        :columns="gridColumns">
      </grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'score',
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser'
    ])
  },
  components: {
    Grid
  },
  data: function () {
    return {
      loggedInUserRank: 0,
      gridColumns: ['rank', 'name', 'difference', 'score'],
      gridData: undefined
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_USERS')
    this.gridData = this.allUsers

    this.gridData.forEach(function(el, i){

      // Set rank column value
      el.rank = i + 1;

      // Beautify score
      el.score = el.points.toFixed(2)

      // Calculate difference of logged in player score to other players score
      el.difference = (el.points - this.loggedInUser.points).toFixed(2)
      if(el.difference == 0.00) el.difference = "-"

      // Set logged in player rank
      if (el.user_id === this.loggedInUser.user_id) {
        this.loggedInUserRank = el.rank
      }
    }, this)
  }
}
</script>
