<template>
  <div class="result-preview">
    <div class="result-preview__live" v-if="status === 'live'">LIVE</div>
    <div class="result-preview__date">{{ date }}</div>
    <div class="result-preview__result">{{ team1_name }} {{ team1_goals }} : {{ team2_goals }} {{ team2_name }}</div>
    <div class="result-preview__odds">
      1: {{ Math.round( (odds_1 + Number.EPSILON) * 100) / 100 }} &middot;
      X: {{ Math.round( (odds_X + Number.EPSILON) * 100) / 100 }} &middot;
      2: {{ Math.round( (odds_2 + Number.EPSILON) * 100) / 100 }}
    </div>
    <div class="result-preview__superbet" v-if="superbet">Superbet!</div>
  </div>
</template>
<script>

export default {
  name: 'result-preview',
  props: {
    date: Date,
    status: String,
    team1_name: String,
    team1_goals: Number,
    team2_name: String,
    team2_goals: Number,
    odds_1: Number,
    odds_X: Number,
    odds_2: Number,
    superbet: Boolean,
  }
}
</script>
