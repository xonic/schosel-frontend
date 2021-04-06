<template>
  <li>
    <router-link v:if="status !== 'scheduled'" :to="{ name: 'match', params: { id: match_id, odds: odds } }" class="list__link">
      <div class="match-item match-item--played" v-if="status === 'over'">
        <div class="match-item__teams">
          <img class="flag flag--small" :src="team1_flag_src">{{ team1_name }} —
            <img class="flag flag--small" :src="team2_flag_src">{{ team2_name }}</div>
        <div class="match-item__goals">
          <span v-if="team1_goals">{{ team1_goals }}</span><span v-else>0</span>&nbsp;:&nbsp;<span v-if="team2_goals">{{ team2_goals }}</span><span v-else>0</span>
        </div>
        <div v-if="ownBet" class="match-item__ownBet">
          <div class="match-item__time">{{ matchTime }} h</div>
          <div class="match-item__odds">
            <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
              {{ team1_name }}&nbsp;{{ odds["1"].toFixed(2) }}
              <span v-if="ownBet.superbet && ownBet.outcome == '1'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-superbet' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
            <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
              Draw&nbsp;{{ odds["X"].toFixed(2) }}
              <span v-if="ownBet.superbet && ownBet.outcome == 'X'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-superbet' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
            <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
              {{ team2_name }}&nbsp;{{ odds["2"].toFixed(2) }}
              <span v-if="ownBet.superbet && ownBet.outcome == '2'">
                <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-superbet' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
              </span>
            </div>
          </div>
          <div v-bind:class="[ownBet.outcome === ownBet.match.outcome ? 'has-scored' : '']" class="match-item__bet">
            {{ (ownBet.points).toFixed(2) }}
          </div>
        </div>
      </div>
      <div class="match-item match-item--live" v-if="status === 'live'">
        <div class="match-item__time">{{ matchDate }} h</div>
        <!-- <div class="match-item__time-played">{{ minutesPlayed }} minutes played</div> -->
        <div class="match-item__teams">
          <img class="flag flag--small" :src="team1_flag_src">{{ team1_name }} —
            <img class="flag flag--small" :src="team2_flag_src">{{ team2_name }}</div>
        <div class="match-item__goals">
          <span v-if="team1_goals">{{ team1_goals }}</span><span v-else>0</span>&nbsp;:&nbsp;<span v-if="team2_goals">{{ team2_goals }}</span><span v-else>0</span>
        </div>
        <span v-if="ownBet" v-bind:class="[ownBet.outcome === ownBet.match.outcome ? 'has-scored' : '']" class="match-item__bet">
          {{ (ownBet.points).toFixed(2) }} pts
          <span class="match-item__superbet" v-if="ownBet.superbet">
            <svg v-bind:class="[ownBet.outcome !== ownBet.match.outcome ? 'failed-superbet' : '']" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
          </span>
        </span>
        <div class="match-item__odds" v-if="odds && ownBet">
          <div v-bind:class="[ownBet.outcome == '1' ? 'has-bet' : '']" class="match-item__odds__home">
            {{ team1_name }}&nbsp;{{ odds["1"].toFixed(2) }}
          </div>
          <div v-bind:class="[ownBet.outcome == 'X' ? 'has-bet' : '']" class="match-item__odds__draw">
            Draw&nbsp;{{ odds["X"].toFixed(2) }}
          </div>
          <div v-bind:class="[ownBet.outcome == '2' ? 'has-bet' : '']" class="match-item__odds__away">
            {{ team2_name }}&nbsp;{{ odds["2"].toFixed(2) }}
          </div>
        </div>
      </div>
    </router-link>
    <div class="match-item" v-if="status === 'scheduled' && ownBet">
      <div class="match__group-time"><!-- TODO: Group A - -->{{ matchTime }}</div>
      <div class="match-item--upcoming">
        <input :id="match_id + '-home'" class="match__input" type="radio" value="1" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.superbet)">
        <label class="match__label match__label--radio" :for="match_id + '-home'">
          <img class="flag flag--small" :src="team1_flag_src">
          {{ team1_name }}
        </label>


        <input class="match__input" type="radio" :id="match_id + '-draw'" value="X" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.superbet)">
        <label class="match__label match__label--radio" :for="match_id + '-draw'">Draw</label>


        <input class="match__input" type="radio" :id="match_id + '-away'" value="2" v-model="ownBet.outcome" @change="postBet(match_id, ownBet.outcome, ownBet.superbet)">
        <label class="match__label match__label--radio" :for="match_id + '-away'">
          <img class="flag flag--small" :src="team2_flag_src">
          {{ team2_name }}
        </label>


        <input class="match__input" type="checkbox" :id="match_id + '-superbet'" v-model="ownBet.superbet" @change="postBet(match_id, ownBet.outcome, ownBet.superbet)">
        <label class="match__label" :for="match_id + '-superbet'">
          <svg class="btn--superbet" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg>
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
      return new Date(this.date).toLocaleString('en-GB', options)
    },
    matchTime: function() {
      var options = { hour: '2-digit', minute:'2-digit', timezone: 'UTC+02:00'}
      return new Date(this.date).toLocaleTimeString('en-GB', options)
    },
    minutesPlayed: function() {
      return Math.round((((new Date() - new Date(this.date)) % 86400000) % 3600000) / 60000)
    },
    team1_flag_src () {
      return "https://media.api-sports.io/flags/" + this.team1_iso.substr(0, 2) + ".svg"
    },
    team2_flag_src () {
      return "https://media.api-sports.io/flags/" + this.team2_iso.substr(0, 2) + ".svg"
    }
  },
  methods: {
    postBet(match_id, outcome, superbet) {
      if(!match_id || !outcome) {
        return
      }

      this.$emit("is-saving")
      this.$ga.event(this.loggedInUser.name, "match_bet", match_id)

      HTTP('/bets/' + match_id, {
        method: "post",
        withCredentials: true,
        data: {
          outcome: outcome,
          superbet: superbet
        }
      })
      .then(response => {

        this.$store.dispatch('LOAD_STATUS')
        this.$emit("stopped-saving")
      })
      .catch(e => {

        this.$emit("is-error")
      })
    }
  }
}
</script>
