<template>
  <li>
    <router-link v:if="status !== 'scheduled'" :to="{ name: 'match', params: { id: match_id, ownBet: ownBet, odds: odds } }" class="list__link">
      <div class="match-item match-item--played" v-if="status === 'over'">
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
        <div v-if="ownBet" class="match-item__ownBet">
          <div class="match-item__time">{{ matchTime }} h</div>
          <div class="match-item__odds">
            <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
              Home&nbsp;{{ odds["1"].toFixed(2) }}
              <span v-if="ownBet.supertip && ownBet.outcome == '1'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
            <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
              Draw&nbsp;{{ odds["X"].toFixed(2) }}
              <span v-if="ownBet.supertip && ownBet.outcome == 'X'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
            <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
              Away&nbsp;{{ odds["2"].toFixed(2) }}
              <span v-if="ownBet.supertip && ownBet.outcome == '2'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
          </div>
          <div v-bind:class="[ownBet.outcome === ownBet.match.outcome ? 'has-scored' : '']" class="match-item__bet">
            {{ (ownBet.points * (ownBet.supertip + 1)).toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="match-item match-item--live" v-if="status === 'live'">
        <div class="match-item__time">{{ matchDate }} h</div>
        <div class="match-item__time-played">{{ minutesPlayed }} minutes played</div>
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">{{ team1_goals }}&nbsp;:&nbsp;{{ team2_goals }}</div>
        <span v-if="ownBet" v-bind:class="[ownBet.outcome === ownBet.match.outcome ? 'has-scored' : '']" class="match-item__bet">
          {{ (ownBet.points * (ownBet.supertip + 1)).toFixed(2) }} pts
          <span class="match-item__supertip" v-if="ownBet.supertip">
            <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-supertip' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
          </span>
        </span>
        <div class="match-item__odds" v-if="odds && ownBet">
          <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
            Home&nbsp;{{ odds["1"].toFixed(2) }}
          </div>
          <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
            Draw&nbsp;{{ odds["X"].toFixed(2) }}
          </div>
          <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
            Away&nbsp;{{ odds["2"].toFixed(2) }}
          </div>
        </div>
      </div>
    </router-link>
    <div class="match-item match-item--upcoming" v-if="status === 'scheduled'">
      <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
      <div class="match-item__time">{{ matchTime }} h</div>
      <div v-if="odds && ownBet" class="match-item__bet">
        <input class="match__input" type="radio" :id="match_id + '-home'" value="1" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label match__label--radio" :for="match_id + '-home'">Home&nbsp;
          <div class="odds-estimation" v-bind:class="[odds['1']]">
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M9 8v4H3V8H0l6-8 6 8H9z" fill="#5FB100" fill-rule="evenodd"/></svg>
          </div>
        </label>
        <input class="match__input" type="radio" :id="match_id + '-draw'" value="X" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label match__label--radio" :for="match_id + '-draw'">Draw&nbsp;
          <div class="odds-estimation" v-bind:class="[odds['X']]">
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M9 8v4H3V8H0l6-8 6 8H9z" fill="#5FB100" fill-rule="evenodd"/></svg>
          </div>
        </label>
        <input class="match__input" type="radio" :id="match_id + '-away'" value="2" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label match__label--radio" :for="match_id + '-away'">Away&nbsp;
          <div class="odds-estimation" v-bind:class="[odds['2']]">
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M9 8v4H3V8H0l6-8 6 8H9z" fill="#5FB100" fill-rule="evenodd"/></svg>
          </div>
        </label>
        <input class="match__input" type="checkbox" :id="match_id + '-supertip'" v-model="ownBet.supertip" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label" :for="match_id + '-supertip'">
          <svg class="btn--supertip" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
        </label>
      </div>
    </div>
  </li>
</template>

<script>
import axios from 'axios'

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
    },
    minutesPlayed: function() {
      return Math.round((((new Date() - new Date(this.date)) % 86400000) % 3600000) / 60000)
    }
  },
  methods: {
    postBet(match_id, outcome, supertip) {
      console.log(match_id)
      console.log(outcome)
      console.log(supertip)
      console.log("----------")

      axios('http://localhost:5000/api/v1/bets/' + match_id, {
        method: "post",
        data: {
          outcome: outcome,
          supertip: supertip
        },
        withCredentials: true
      })
      .then(response => {
        console.log("saved")
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
