<template>
  <div class="wrapper">
    <div class="tab-grid">
      <div class="tabs">
        <a class="tab__link tab__link--back" href="javascript:history.go(-1)">&lt; Back</a>
      </div>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
      <div v-if='!loading' class="tabs-details">
        <transition name="hero" appear>
          <div class='match-item match-item--live' v-if='this.match'>
            <div class="match-item__time">
              {{ match.matchDate }}
            </div>
            <div class="match-item__teams">
              {{ match.team1_name }} &mdash; {{ match.team2_name }}
            </div>
            <div class="match-item__goals">
              <span v-if="match.team1_goals">{{ match.team1_goals }}</span><span v-else>0</span> : <span v-if="match.team2_goals">{{ match.team2_goals }}</span><span v-else>0</span>
            </div>
            <span v-if="ownBet" v-bind:class="[ownBet.outcome === match.outcome ? 'has-scored' : '']" class="match-item__bet">
              {{ (ownBet.points).toFixed(2) }} pts
              <span class="match-item__supertip" v-if="ownBet.supertip">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </span>
            <div class="match-item__odds" v-if='match.odds && ownBet'>
              <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
                {{ match.team1_name }}&nbsp;{{ match.odds["1"].toFixed(2) }}
              </div>
              <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
                Draw&nbsp;{{ match.odds["X"].toFixed(2) }}
              </div>
              <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
                {{ match.team2_name }}&nbsp;{{ match.odds["2"].toFixed(2) }}
              </div>
            </div>
          </div>
        </transition>
        <transition name="content" appear>
          <div class="list__items">
            <grid
              :data="gridData"
              :columns="gridColumns"
              :hasLinks="true"
              :linkToComponent="'user'"
              :idKey="'user_id'">
            </grid>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import { HTTP } from '../http-constants'
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
      interval: null,
      gridColumns: ['player', 'bet', 'score'],
      gridData: [],
      loading: true,
      size: "32px",
      color: "#3EABDC",
      ownBet: null
    }
  },
  props: ['id'],
  mounted () {
    this.loadMatchData()
  },
  computed: {
    ...mapGetters([
      'ownBets'
    ]),
    matchDate: function() {
      return new Date(this.match.date).toLocaleString()
    }
  },
  methods: {
    loadMatchData: function() {
      if(this.ownBets)
      {
        this.ownBet = this.ownBets.find((el) => {
          return el.match.match_id === this.id
        })
        // console.log(this.ownBet)
      }
      HTTP.get('/matches/' + this.id, {withCredentials: true}).then((response) => {
        this.match = response.data
        this.setGrid(response.data.bets)
        this.loading = false

        if(this.match.status === 'live') {
          this.setLoadingInterval()
        }
      }, (err) => {
        console.log(err)
      })
    },
    setLoadingInterval: function() {
      if(!this.interval)
      {
        this.interval = setInterval( () => {
          this.loadMatchData()
        }, 10000);
      }
    },
    setGrid: function(rawGridData) {
      this.gridData = []
      // console.log(rawGridData)
      rawGridData.forEach((el, i) => {

        // Calculate score for each player
        var currentScore = this.match.outcome === el.outcome ? el.points : 0.00

        // Set grid data
        this.gridData.push({
          user_id: el.user.user_id,
          player: el.user.name,
          bet: el.outcome == 1 ? this.match.team1_name : el.outcome == 2 ? this.match.team2_name : el.outcome == "X" ? "Draw" : "-",
          score: currentScore.toFixed(2)
        })

        // Sort grid by score
        this.gridData.sort(function(obj1, obj2){
          return obj2.score - obj1.score
        })
      }, this)
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
