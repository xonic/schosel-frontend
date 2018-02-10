<template>
  <div>
    <a href="javascript:history.go(-1)">&lt; Back</a>
    <div class='match'>
      <div class="">
        05 June &mdash; 20:45
      </div>
      <div class="">
        North Korea &mdash; Saudi Arabia
      </div>
      <div class="">
        3 : 0
      </div>
      <div class="">
        +20.60 pts
      </div>
      <div class="">
        <span>Home 10.30 pts</span>
        <span>Draw 4.50 pts</span>
        <span>Away 3.81 pts</span>
      </div>
    </div>
    <grid
      :data="gridData"
      :columns="gridColumns">
    </grid>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'

export default {
  name: 'match',
  components: {
    Grid
  },
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['rank', 'player', 'bet', 'score'],
      gridData: [
        { rank: 1, player: 'Chuck Norris', bet: 'Home', score: '10.30' },
        { rank: 2, player: 'Bruce Lee', bet: 'Away', score: '3.81' },
        { rank: 3, player: 'Jackie Chan', bet: 'Draw', score: '4.50' },
        { rank: 4, player: 'Jet Li', bet: 'Away', score: '3.81' }
      ]
    }
  },
  mounted () {
    console.warn("TODO: fetch match data from https://www.schosel.net/worlds2018/api/v1" + this.$route.fullPath)
    console.warn("TODO: fetch bet data from https://www.schosel.net/worlds2018/api/v1" + this.$route.fullPath + "/bets")
  }
}
</script>
