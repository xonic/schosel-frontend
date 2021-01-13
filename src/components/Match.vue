<template>
  <div>
    <div class="match match--played" v-if="status === 'over'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div>{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
      <div>Home&nbsp;{{ odds[0] }}&nbsp;|&nbsp;Draw&nbsp;{{ odds[1] }}&nbsp;|&nbsp;Away&nbsp;{{ odds[2] }}</div>
    </div>
    <div class="match match--live" v-if="status === 'live'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div>{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
      <div>Home&nbsp;{{ odds[0] }}&nbsp;|&nbsp;Draw&nbsp;{{ odds[1] }}&nbsp;|&nbsp;Away&nbsp;{{ odds[2] }}</div>
    </div>
    <div class="match match--upcoming" v-if="status === 'scheduled'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div>{{ odds[0] }}&nbsp;|&nbsp;{{ odds[1] }}&nbsp;|&nbsp;{{ odds[2] }}</div>
      <input type="radio" :id="url + '-home'" value="1" v-model="bet">
      <label :for="url + '-home'">Home&nbsp;{{ odds[0] }}</label>
      <input type="radio" :id="url + '-draw'" value="X" v-model="bet">
      <label :for="url + '-draw'">Draw&nbsp;{{ odds[1] }}</label>
      <input type="radio" :id="url + '-away'" value="2" v-model="bet">
      <label :for="url + '-away'">Away&nbsp;{{ odds[2] }}</label>
      <span>Bet: {{ bet }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bet: ""
    }
  },
  props: {
    url: String,
    date: String,
    status: String,
    result: String,
    team1_name: String,
    team1_iso: String,
    team1_goals: Number,
    team2_name: String,
    team2_iso: String,
    team2_goals: Number,
    stage: String,
    bets: String,
    odds: Array
  },
  computed: {
    matchDate: function() {
      return new Date(this.date).toLocaleString()
    }
  }
}
</script>
