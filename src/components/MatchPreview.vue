<template>
  <router-link class="match-preview" :to="{ path: `/matches/${match.match_id}` }">

    <div class="match-preview__info">
      <div class="match-preview__team">
        <div class="match-preview__flag">
          <flag :iso="match.team1_iso" :is-bet="bet.outcome === '1'" />
        </div>
        <div :class="bet.outcome === '1' ? 'match-preview__name match-preview__name--is-bet' : 'match-preview__name'">
          {{ match.team1_name }}
        </div>
        <div :class="bet.outcome === '1' ? 'match-preview__odds match-preview__odds--is-correct-bet' : 'match-preview__odds'">
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
        <div :class="bet.outcome === 'X' ? `match-preview__draw text--yellow` : 'match-preview__draw'">
          Draw
        </div>
        <div :class="bet.outcome === 'X' ? 'match-preview__odds text--yellow' : 'match-preview__odds'">
          {{ match.odds['X'].toFixed(2) }}
          <super-bet v-if="match.superbet" />
        </div>
      </div>
      <div class="match-preview__team">
        <div class="match-preview__flag">
          <flag :iso="match.team2_iso" :is-bet="bet.outcome === '2'" />
        </div>
        <div :class="bet.outcome === '2' ? 'match-preview__name match-preview__name--is-bet' : 'match-preview__name'">
          {{ match.team2_name }}
        </div>
        <div :class="bet.outcome === '2' ? 'match-preview__odds match-preview__odds--is-correct-bet' : 'match-preview__odds'">
          {{ match.odds['2'].toFixed(2) }}
          <super-bet v-if="match.superbet" />
        </div>
      </div>
    </div>
    <ul class="match-preview__scores">
      <li v-for="score in bet.points"
        :class="
          score.points ?
            `match-preview__score match-preview__score--${score.name}` :
            `match-preview__score match-preview__score--${score.name} match-preview__score--zero`">
        <img :src="getURL(score.challenge_id - 1)" class="match-preview__icon" />
        <span>
          {{ score.points ? `+${score.points.toFixed(2)}` : score.points.toFixed(0) }}
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
      match: Object,
      bet: Object
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
