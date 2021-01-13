<template>
  <div>
    <router-link v:if="status !== 'scheduled'" :to="{ name: 'match', params: { id: match_id } }" class="list__link">
      <div class="match-item match-item--played" v-if="status === 'over'">
        <div class="match-item__time">{{ matchTime }} h</div>
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
        <div class="match-item__odds">Home&nbsp;{{ odds["1"].toFixed(2) }}&nbsp;|&nbsp;Draw&nbsp;{{ odds["X"].toFixed(2) }}&nbsp;|&nbsp;Away&nbsp;{{ odds["2"].toFixed(2) }}</div>
        <span v-if="ownBet" class="match-item__bet">
          {{ (ownBet.points * (ownBet.supertip + 1)).toFixed(2) }}
          <span v-if="ownBet.supertip">*</span>
        </span>
      </div>
      <div class="match-item match-item--live" v-if="status === 'live'">
        <div class="match-item__time">{{ matchTime }} h</div>
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
        <div class="match-item__odds">Home&nbsp;{{ odds["1"].toFixed(2) }}&nbsp;|&nbsp;Draw&nbsp;{{ odds["X"].toFixed(2) }}&nbsp;|&nbsp;Away&nbsp;{{ odds["2"].toFixed(2) }}</div>
        <span v-if="ownBet" class="match-item__bet">
          {{ (ownBet.points * (ownBet.supertip + 1)).toFixed(2) }}
          <span v-if="ownBet.supertip">*</span>
        </span>
      </div>
    </router-link>
    <div class="match-item match-item<--upcoming" v-if="status === 'scheduled'">
      <div class="match-item__time">{{ matchTime }} h</div>
      <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
      <div v-if="odds && ownBet" class="match-item__bet">
        <div class="match-item__odds">{{ odds["1"].toFixed(2) }}&nbsp;|&nbsp;{{ odds["X"].toFixed(2) }}&nbsp;|&nbsp;{{ odds["2"].toFixed(2) }}</div>
        <input type="radio" :id="match_id + '-home'" value="1" v-model="ownBet.outcome" @change="postBet()">
        <label :for="match_id + '-home'">Home&nbsp;{{ odds["1"].toFixed(2) }}</label>
        <input type="radio" :id="match_id + '-draw'" value="X" v-model="ownBet.outcome" @change="postBet()">
        <label :for="match_id + '-draw'">Draw&nbsp;{{ odds["X"].toFixed(2) }}</label>
        <input type="radio" :id="match_id + '-away'" value="2" v-model="ownBet.outcome" @change="postBet()">
        <label :for="match_id + '-away'">Away&nbsp;{{ odds["2"].toFixed(2) }}</label>
        <input type="checkbox" :id="match_id + '-supertip'" v-model="ownBet.supertip" @change="postBet()">
        <label :for="match_id + '-supertip'">Supertip</label>
      </div>
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
    match_id: "",
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
    ownBet: undefined,
    odds: {}
  },
  computed: {
    matchDate: function() {
      return new Date(this.date).toLocaleString()
    },
    matchTime: function() {
      return new Date(this.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  },
  methods: {
    postBet() {
      // TODO: implement server call
      // axios.post(`http://jsonplaceholder.typicode.com/posts`, {
      //   body: this.ownBet
      // })
      // .then(response => {})
      // .catch(e => {
      //   this.errors.push(e)
      // })
    }
  }
}
</script>
