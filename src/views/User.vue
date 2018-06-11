<template>
  <div class="wrapper">
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
      <div v-if='!loading' class="tabs-details">
        <div class="hero hero--14">
          <transition name="hero" appear>
            <div>
              <h1 class="hero__heading">{{ user.name }}</h1>
              <div class="hero__info">{{ user.points }} pts</div>
            </div>
          </transition>
        </div>
        <transition name="content" appear>
          <div class="list__items">
            <grid
              :data="gridData"
              :columns="gridColumns">
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
      user: {},
      interval: null,
      gridColumns: ['player', 'bet', 'score'],
      gridData: [],
      loading: true,
      size: "32px",
      color: "#3EABDC"
    }
  },
  props: ['id'],
  mounted () {
    this.loadUserData()
  },
  computed: {
    matchDate: function() {
      return new Date(this.match.date).toLocaleString()
    }
  },
  methods: {
    loadUserData: function() {

      HTTP.get('/users/' + this.id, {withCredentials: true}).then((response) => {
        this.user = response.data
        // this.setGrid(response.data.bets)
        this.loading = false

        // if(this.match.status === 'live') {
        //   this.setLoadingInterval()
        // }
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
      rawGridData.forEach(function(el, i){

        // Calculate score for each player
        var currentScore = this.match.outcome === el.outcome ? el.points : 0.00

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
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
