<template>
  <div class="score">
    <h1>Score</h1>
    <div>271.43 pts</div>
    <div>2. place</div>
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
      'allUsers'
    ]),
    sortedArray: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      return this.arrays.sort(compare);
    }
  },
  components: {
    Grid
  },
  data: function () {
    return {
      gridColumns: ['rank', 'name', 'difference', 'points'],
      gridData: undefined
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_USERS')
    this.gridData = this.allUsers
    this.gridData.forEach(function(el, i){
      el.rank = i + 1;
      el.points = el.points.toFixed(2)
    })
  }
}
</script>
