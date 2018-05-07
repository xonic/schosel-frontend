<template>
  <div class="wrapper">
    <div class="tab-grid">
      <div class="tabs">
        <a class="tab__link tab__link--back" href="javascript:history.go(-1)">&lt; Back</a>
      </div>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
      <div v-if='!loading' class="tabs-details">
        <div class='match-item match-item--live' v-if='this.match'>
          <div class="match-item__time">
            {{ match.matchDate }}
          </div>
          <div class="match-item__teams">
            {{ match.team1_name }} &mdash; {{ match.team2_name }}
          </div>
          <div class="match-item__goals">
            {{ match.team1_goals }} : {{ match.team2_goals }}
          </div>
          <span v-if="ownBet" v-bind:class="[ownBet.outcome === ownBet.match.outcome ? 'has-scored' : '']" class="match-item__bet">
            {{ (ownBet.points * (ownBet.supertip + 1)).toFixed(2) }} pts
            <span class="match-item__supertip" v-if="ownBet.supertip">
              <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
            </span>
          </span>
          <div class="match-item__odds" v-if='match.odds && ownBet'>
            <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
              Home&nbsp;{{ odds["1"].toFixed(2) }}
            </div>
            <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
              Draw&nbsp;{{ odds["X"].toFixed(2) }}
            </div>
            <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
              Away&nbsp;{{ odds["2"].toFixed(2) }}
            </div>
          </div>
        </div>
        <grid
          :data="gridData"
          :columns="gridColumns">
        </grid>
      </div>
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
  props: ['id', 'ownBet', 'odds'],
  mounted () {
    axios.get('/matches/' + this.id, {withCredentials: true}).then((response) => {
      this.match = response.data
      this.setGrid(response.data.bets)
      this.loading = false
    }, (err) => {
      console.log(err)
    })
  },
  computed: {
    matchDate: function() {
      return new Date(this.match.date).toLocaleString()
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
