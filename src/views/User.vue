<template>
  <div class="wrapper">
    <radar-chart
      :labels="chartData.labels"
      :datasets="reversedDatasets"
    ></radar-chart>
    <div class="tab-grid">
      <div class="tabs">
        <a class="tab__link tab__link--back" href="javascript:history.go(-1)">&lt; Back</a>
      </div>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
      <div v-if='!loading' class="tabs-details">
        <div class="hero hero--14">
          <transition name="hero" appear>
            <div>
              <img class="avatar avatar--medium" :src="user.avatar" />
              <h1 class="hero__heading">{{ user.name }}</h1>
              <div class="hero__info" v-if="user.rank">Rank {{ user.rank }}.</div>
              <div class="hero__info">{{ user.points || "0" }} pts</div>
              <div class="hero__info">{{ user.bets.length || "0" }} bets placed</div>
              <div class="hero__info" v-if="user.points && user.bets.length">Avg. {{ (user.points / user.bets.length).toFixed(2) }} pts per bet</div>
              <div class="hero__info" v-if="user.champion.name && user.champion.odds">Champion Bet: {{ user.champion.name }},  {{ user.champion.odds }} pts</div>
            </div>
          </transition>
        </div>
        <transition name="content" appear>
          <div>
            <div class="island" v-if="user.achievements">

              <div class="score-card-grid">
                <router-link :to="{ name: 'gambler' }" v-if="user.achievements.gambler">
                  <div class="score-card score-card--gambler">
                    <h2 class="score-card__title">Gambler</h2>
                    <p class="score-card__score">{{ user.achievements.gambler.rank }}.</p>
                    <p class="score-card__rank">{{ user.achievements.gambler.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                  </div>
                </router-link>
                <router-link :to="{ name: 'hustler' }" v-if="user.achievements.hustler">
                  <div class="score-card score-card--hustler">
                    <h2 class="score-card__title">Hustler</h2>
                    <p class="score-card__score">{{ user.achievements.hustler.rank }}.</p>
                    <p class="score-card__rank">{{ user.achievements.hustler.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                  </div>
                </router-link>
                <router-link :to="{ name: 'expert' }" v-if="user.achievements.expert">
                  <div class="score-card score-card--expert">
                    <h2 class="score-card__title">Expert</h2>
                    <p class="score-card__score">{{ user.achievements.expert.rank }}.</p>
                    <p class="score-card__rank">{{ user.achievements.expert.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                  </div>
                </router-link>
                <router-link :to="{ name: 'hattrick' }" v-if="user.achievements.hattrick">
                  <div class="score-card score-card--hattrick">
                    <h2 class="score-card__title">Hattrick</h2>
                    <p class="score-card__score">{{ user.achievements.hattrick.rank }}.</p>
                    <p class="score-card__rank">{{ user.achievements.hattrick.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                  </div>
                </router-link>
                <router-link :to="{ name: 'secret' }" v-if="user.achievements.secret">
                  <div class="score-card score-card--secret">
                    <h2 class="score-card__title">Secret</h2>
                    <p class="score-card__score">{{ user.achievements.secret.rank }}.</p>
                    <p class="score-card__rank">{{ user.achievements.secret.score.toFixed(2) }}<span class="score-card__label"> Points</span></p>
                  </div>
                </router-link>
              </div>
            </div>

            <div class="list__items" v-if="gridData.length">
              <grid
                :data="gridData"
                :columns="gridColumns"
                :hasLinks="true"
                :linkToComponent="'result'"
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
import RadarChart from '@/components/RadarChart.vue'

export default {
  name: 'user',
  components: {
    Grid,
    ClipLoader,
    RadarChart
  },
  data () {
    return {
      user: {},
      interval: null,
      gridColumns: ['match', 'bet', 'outcome', 'superbet', 'score'],
      loading: true,
      size: "32px",
      color: "#3EABDC",
      userCount: 100, // remove this (mock)
      chartData: {
        labels: [
          "King's Game",
          "Oldfashioned",
          "Underdog",
          "Balanced",
          "Hidden"
        ],
        datasets: [
          {
            data: [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
            ]
          },
        ]
      }
    }
  },
  props: ['id'],
  mounted () {
    this.loadUserData()
    // this.renderChart(this.ranks, {})
  },
  computed: {
    ...mapGetters([
      'status',
      'allUsers'
    ]),
    matchDate () {
      return new Date(this.match.date).toLocaleString()
    },
    reversedDatasets() {
      return [{data: this.chartData.datasets[0].data.map(value => this.userCount + 1 - value)}]
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
    },
    remainingSuperbets () {
      return 8 - this.user.visible_supertips
    }
  },
  methods: {
    loadUserData: function() {

      HTTP.get('/users/' + this.id, {withCredentials: true}).then((response) => {
        this.user = response.data
        // this.user.achievements.secret = {rank: 1, score: 10} MOCK DATA

        this.user.avatar = this.allUsers.find(user => user.user_id === this.user.user_id).avatar

        this.setLoadingInterval();
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
