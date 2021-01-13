<template>
  <div class="wrapper">
    <div class="tab-grid">
      <div class="tabs">
        <a class="tab__link tab__link--back" href="javascript:history.go(-1)">&lt; Back</a>
      </div>
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
          <div>
            <div class="island" v-if="user.achievements">

              <div class="score-card-grid">
                <div class="score-card score-card--gambler" v-if="user.achievements.gambler">
                  <h2 class="score-card__title">Gambler</h2>
                  <p class="score-card__score">{{ user.achievements.gambler.rank }}.</p>
                  <p class="score-card__rank">{{ user.achievements.gambler.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                </div>

                <div class="score-card score-card--hustler" v-if="user.achievements.hustler">
                  <h2 class="score-card__title">Hustler</h2>
                  <p class="score-card__score">{{ user.achievements.hustler.rank }}.</p>
                  <p class="score-card__rank">{{ user.achievements.hustler.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                </div>

                <div class="score-card score-card--expert" v-if="user.achievements.expert">
                  <h2 class="score-card__title">Expert</h2>
                  <p class="score-card__score">{{ user.achievements.expert.rank }}.</p>
                  <p class="score-card__rank">{{ user.achievements.expert.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                </div>

                <div class="score-card score-card--hattrick" v-if="user.achievements.hattrick">
                  <h2 class="score-card__title">Hattrick</h2>
                  <p class="score-card__score">{{ user.achievements.hattrick.rank }}.</p>
                  <p class="score-card__rank">{{ user.achievements.hattrick.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                </div>

                <div class="score-card score-card--secret" v-if="user.achievements.secret">
                  <h2 class="score-card__title">Secret</h2>
                  <p class="score-card__score">{{ user.achievements.secret.rank }}.</p>
                </div>
              </div>
            </div>

            <div class="list__items" v-if="gridData.length">
              <grid
                :data="gridData"
                :columns="gridColumns"
                :hasLinks="true"
                :linkToComponent="'match'"
                :idKey="'match_id'">
              </grid>
            </div>
            <h2 v-else class="blankslate">There are no bets yet</h2>
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
      gridColumns: ['match', 'bet', 'outcome', 'superbet', 'score'],
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
    matchDate () {
      return new Date(this.match.date).toLocaleString()
    },
    gridData () {

      var gridData = []

      this.user.bets.forEach((bet, i) => {
        gridData.push({
          match_id: bet.match.match_id,
          match: bet.match.team1_name + " vs. " + bet.match.team2_name,
          bet: bet.outcome == 1 ? bet.match.team1_name : bet.outcome == 2 ? bet.match.team2_name : bet.outcome == "X" ? "Draw" : "-",
          outcome: bet.match.team1_goals + " : " + bet.match.team2_goals,
          superbet: bet.supertip ? (bet.points ? "correct" : "wrong") : "",
          score: bet.points ? bet.points.toFixed(2) : 0
        })
      })

      return gridData.sort((a, b) => {
        return b.match_id - a.match_id
      })
    }
  },
  methods: {
    loadUserData: function() {

      HTTP.get('/users/' + this.id, {withCredentials: true}).then((response) => {
        this.user = response.data
        this.loading = false

      }, (err) => {
        console.log(err)
      })
    },
    setLoadingInterval: function() {
      if(!this.interval)
      {
        this.interval = setInterval( () => {
          this.loadUserData()
        }, 10000);
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
