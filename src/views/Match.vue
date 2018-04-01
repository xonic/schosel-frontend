<template>
  <div>
    <a href="javascript:history.go(-1)">&lt; Back</a>
    <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
    <div v-if='!loading'>
      <div class='match' v-if='this.match'>
        <div class="">
          {{ match.matchDate }}
        </div>
        <div class="">
          {{ match.team1_name }} &mdash; {{ match.team2_name }}
        </div>
        <div class="">
          {{ match.team1_goals }} : {{ match.team2_goals }}
        </div>
        <div class="">
          {{ ownScore }}
        </div>
        <div class="" v-if='this.match.odds'>
          <span>Home {{ match.odds['1'].toFixed(2) }} pts</span>
          <span>Draw {{ match.odds['X'].toFixed(2) }} pts</span>
          <span>Away {{ match.odds['2'].toFixed(2) }} pts</span>
        </div>
      </div>
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
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'match',
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      match: {},
      gridColumns: ['player', 'bet', 'score'],
      gridData: [],
      loading: true,
      size: "32px",
      color: "#3EABDC"
    }
  },
  props: ['id'],
  mounted () {
    axios.get('http://localhost:5000/api/v1/matches/' + this.id, {withCredentials: true}).then((response) => {
      this.match = response.data
      this.setGrid(response.data.bets)
      this.loading = false
    }, (err) => {
      console.log(err)
    })
  },
  computed: {
    ...mapGetters([
      'ownBets'
    ]),
    matchDate: function() {
      return new Date(this.match.date).toLocaleString()
    },
    ownScore: function() {
      // this.ownBets.find(function(el) {
      //   return el.match.match_id === this.match.match_id
      // }, this)
    }
  },
  methods: {
    setGrid: function(rawGridData) {
      rawGridData.forEach(function(el, i){

        // Calculate score for each player
        var currentScore = this.match.outcome === el.outcome ? el.points : 0.00
        if(el.supertip && currentScore) {
          currentScore *= 2
        }

        // Set grid data
        this.gridData.push({
          player: el.user.name,
          bet: el.outcome || "-",
          score: currentScore.toFixed(2)
        })

        // Sort grid by score
        this.gridData.sort(function(obj1, obj2){
          return obj2.score - obj1.score
        })
      }, this)
    }
  }
}
</script>
