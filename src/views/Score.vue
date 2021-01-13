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

export default {
  name: 'score',
  components: {
    Grid
  },
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['rank', 'player', 'difference', 'score'],
      gridData: [
        { rank: 1, player: 'Chuck Norris', difference: '+28.57', score: '300.00' },
        { rank: 2, player: 'Bruce Lee (You)', difference: '-', score: '271.43' },
        { rank: 3, player: 'Jackie Chan', difference: '-21.43', score: '250.00' },
        { rank: 4, player: 'Jet Li', difference: '-31.43', score: '240.00' }
      ]
    }
  }
}
</script>
