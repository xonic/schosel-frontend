<template>
  <router-link :to="{ name: 'match', params: { id: matchId } }">
  <!-- <a :href="url"> -->
    <div class="match match--played" v-if="status === 'over'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div>{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
      <div v-if="odds && odds.length > 0">Home&nbsp;{{ odds[0] }}&nbsp;|&nbsp;Draw&nbsp;{{ odds[1] }}&nbsp;|&nbsp;Away&nbsp;{{ odds[2] }}</div>
    </div>
    <div class="match match--live" v-if="status === 'live'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div>{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
      <div v-if="odds && odds.length > 0">Home&nbsp;{{ odds[0] }}&nbsp;|&nbsp;Draw&nbsp;{{ odds[1] }}&nbsp;|&nbsp;Away&nbsp;{{ odds[2] }}</div>
    </div>
    <div class="match match--upcoming" v-if="status === 'scheduled'">
      <div>{{ matchDate }}</div>
      <div>{{ team1_name }} — {{ team2_name }}</div>
      <div v-if="odds && odds.length > 0">
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
  <!-- </a> -->
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      bet: ""
    }
  },
  props: {
    url: "",
    date: "",
    status: "",
    result: "",
    team1_name: "",
    team1_iso: "",
    team1_goals: 0,
    team2_name: "",
    team2_iso: "",
    team2_goals: 0,
    stage: "",
    bets: "",
    odds: []
  },
  computed: {
    matchDate: function() {
      return new Date(this.date).toLocaleString()
    },
    matchId: function() {
      var matchId = this.url.split("/")
      return parseInt(matchId[matchId.length - 1], 10)
    }
  }
}
</script>
