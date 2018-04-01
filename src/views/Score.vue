<template>
  <div class="score">
    <h1>Score</h1>
    <clip-loader :loading="loading.users" :color="loading.color" :size="loading.size"></clip-loader>
    <div v-if="!loading.users">
      <div v-if='loggedInUser'>{{ loggedInUser.points.toFixed(2) }} pts</div>
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
          :data="allUsers"
          :columns="gridColumns">
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'score',
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
      'loading'
    ])
  },
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      gridColumns: ['rank', 'name', 'difference', 'score'],
      gridData: undefined
    }
  },
  mounted () {


  }
}
</script>
