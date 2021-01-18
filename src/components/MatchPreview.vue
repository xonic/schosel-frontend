<template>
  <router-link class="match-preview" :to="{ path: `/matches/${match.match_id}` }">

    <div class="match-preview__info">
      <div class="match-preview__team">
        <div class="match-preview__flag">
          <flag :iso="match.team1_iso" :is-bet="false" />
        </div>
        <div class="match-preview__name match-preview__name--is-bet">
          {{ match.team1_name }}
        </div>
        <div class="match-preview__odds match-preview__odds--is-correct-bet">
          {{ match.odds['1'].toFixed(2) }}
          <super-bet v-if="match.superbet" />
        </div>
      </div>
      <div class="match-preview__result">
        <div class="match-preview__live is-live" v-if="match.status === 'live'">
          Live
        </div>
        <div class="match-preview__over" v-else>
          Over
        </div>
        <div class="match-preview__goals">
          {{ match.team1_goals }}:{{ match.team2_goals }}
        </div>
        <div class="match-preview__draw">
          Draw
        </div>
        <div class="match-preview__odds">
          {{ match.odds['X'].toFixed(2) }}
          <super-bet v-if="match.superbet" />
        </div>
      </div>
      <div class="match-preview__team">
        <div class="match-preview__flag">
          <flag :iso="match.team2_iso" />
        </div>
        <div class="match-preview__name">
          {{ match.team2_name }}
        </div>
        <div class="match-preview__odds">
          {{ match.odds['2'].toFixed(2) }}
          <super-bet v-if="match.superbet" />
        </div>
      </div>
    </div>
    <ul class="match-preview__scores">
      <li v-for="score in match.scores"
        :class="
          score.score ?
            `match-preview__score--${score.challenge_route} match-preview__score--positive` :
            `match-preview__score--${score.challenge_route}`">
        <img :src="getURL(score.challenge_id - 1)" class="match-preview__icon" />
        <span class="match-preview__score">
          {{ score.score ? `+${score.score.toFixed(2)}` : score.score.toInteger() }}
        </span>
      </li>
    </ul>
  </router-link>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Flag from '@/components/Flag'
  import SuperBet from '@/components/SuperBet'

  export default {
    name: 'match-preview',
    components: {
      Flag,
      SuperBet
    },
    props: {
      match: Object
    },
    computed: {
      ...mapGetters([
        'iconPaths'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
