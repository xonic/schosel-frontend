import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: {},
    users: {},
    matches: [],
    bets: {},
    teams: {}
  },
  actions: {
    LOAD_MATCHES: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/matches', {withCredentials: true}).then((response) => {
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_MATCHES: (state, { matches }) => {
      state.matches = matches
      console.log("state.matches", state.matches)
    }
  },
  getters: {
    playedMatches: state => {
      return state.matches.filter(match => match.status === "over")
    },
    liveMatches: state => {
      return state.matches.filter(match => match.status === "live")
    },
    upcomingMatches: state => {
      return state.matches.filter(match => match.status === "scheduled")
    }
  }
})
