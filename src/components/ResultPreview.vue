<template>
  <router-link class="result-preview" :to="{ path: `/results/${match.match_id}` }">
    <div class="result-preview__live" v-if="match.status === 'live'">
      LIVE
    </div>
    <div class="result-preview__date">
      {{ match.date }}
    </div>
    <div class="result-preview__result">
      {{ match.team1_name }} {{ match.team1_goals }} : {{ match.team2_goals }} {{ match.team2_name }}
    </div>
    <div class="result-preview__odds">
      1: {{ Math.round( (match.odds['1'] + Number.EPSILON) * 100) / 100 }} &middot;
      X: {{ Math.round( (match.odds['X'] + Number.EPSILON) * 100) / 100 }} &middot;
      2: {{ Math.round( (match.odds['2'] + Number.EPSILON) * 100) / 100 }}
    </div>
    <div class="result-preview__superbet" v-if="match.superbet">
      Superbet!
    </div>
  </router-link>
</template>
<script>
  export default {
    name: 'result-preview',
    props: {
      match: Object
    }
  }
</script>
