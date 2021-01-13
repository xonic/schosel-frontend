<template>
  <li>
    <router-link v:if="status !== 'scheduled'" :to="{ name: 'match', params: { id: match_id, ownBet: ownBet, odds: odds } }" class="list__link">
      <div class="match-item match-item--played" v-if="status === 'over'">
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">
          <span v-if="team1_goals">{{ team1_goals }}</span><span v-else>0</span>&nbsp;:&nbsp;<span v-if="team2_goals">{{ team2_goals }}</span><span v-else>0</span>
        </div>
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
        <!-- <div class="match-item__time-played">{{ minutesPlayed }} minutes played</div> -->
        <div class="match-item__teams">{{ team1_name }} — {{ team2_name }}</div>
        <div class="match-item__goals">
          <span v-if="team1_goals">{{ team1_goals }}</span><span v-else>0</span>&nbsp;:&nbsp;<span v-if="team2_goals">{{ team2_goals }}</span><span v-else>0</span>
        </div>
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
        <label class="match__label match__label--radio" :for="match_id + '-home'">Home</label>
        <input class="match__input" type="radio" :id="match_id + '-draw'" value="X" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label match__label--radio" :for="match_id + '-draw'">Draw</label>
        <input class="match__input" type="radio" :id="match_id + '-away'" value="2" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)">
        <label class="match__label match__label--radio" :for="match_id + '-away'">Away</label>
        <input class="match__input" type="checkbox" :id="match_id + '-supertip'" v-model="ownBet.supertip" @change="postBet(match_id, ownBet.outcome, ownBet.supertip)" :disabled="(maxSuperbets - loggedInUser.visible_supertips) <= 0">
        <label class="match__label" :for="match_id + '-supertip'">
          <svg class="btn--supertip" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
        </label>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { HTTP } from '../http-constants'

export default {
  data () {
    return {
      bet: "",
      maxSuperbets: 8
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
    ...mapGetters([
      'loggedInUser'
    ]),
    matchDate: function() {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit', timezone: 'GMT' }
      return new Date(this.date).toLocaleString('de-DE', options)
    },
    matchTime: function() {
      var options = { hour: '2-digit', minute:'2-digit', timezone: 'UTC+02:00'}
      return new Date(this.date).toLocaleTimeString('de-DE', options)
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

      HTTP('/bets/' + match_id, {
        method: "post",
        withCredentials: true,
        data: {
          outcome: outcome,
          supertip: supertip
        }
      })
      .then(response => {
        console.log("saved")
        this.$store.dispatch('LOAD_STATUS')
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
