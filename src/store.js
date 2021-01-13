import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: {},
    users: [],
    matches: [],
    ownBets: undefined,
    teams: {}
  },
  actions: {
    LOAD_STATUS: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/status', {withCredentials: true}).then((response) => {
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MATCHES: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/matches', {withCredentials: true}).then((response) => {
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USERS: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/users', {withCredentials: true}).then((response) => {
        commit('SET_USERS', { users: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USER: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/user', {withCredentials: true}).then((response) => {
        commit('SET_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_OWN_BETS: function ({ commit }) {
      axios.get('http://localhost:5000/api/v1/bets', {withCredentials: true}).then((response) => {
        commit('SET_OWN_BETS', { ownBets: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_STATUS: (state, { status }) => {
      state.status = status
      console.log("state.status", state.status)
    },
    SET_MATCHES: (state, { matches }) => {

      // TODO: remove this (manipulates some matches to be live & scheduled)
      for(var i=matches.length-1; i>=matches.length-6; i--) {
        matches[i].status = "scheduled"
      }
      for(var i=matches.length-7; i>=matches.length-8; i--) {
        matches[i].status = "live"
      }

      state.matches = matches
    },
    SET_USERS: (state, { users }) => {
      state.users = users
    },
    SET_USER: (state, { user }) => {
      state.user = user
    },
    SET_OWN_BETS: (state, { ownBets }) => {
      state.ownBets = ownBets
    }
  },
  getters: {
    playedMatches: state => {

      // Filter matches that are over
      var played = state.matches.filter(match => match.status === "over")

      // Add own bets to each played match
      if(played && state.ownBets) {
        played.forEach(function(match){
          var ownBet = state.ownBets.find(function(bet){
            return bet.match.match_id === match.match_id
          }, this)

          match.ownBet = ownBet
          match.supertip = ownBet.supertip
        }, this)
      }

      return played
    },
    liveMatches: state => {

      // Filter matches that live
      var live = state.matches.filter(match => match.status === "live")

      // Add own bets to each live match
      if(live && state.ownBets) {
        live.forEach(function(match){
          var ownBet = state.ownBets.find(function(bet){
            return bet.match.match_id === match.match_id
          }, this)

          match.ownBet = ownBet
          match.supertip = ownBet.supertip
        }, this)
      }

      return live;
    },
    upcomingMatches: state => {
      return state.matches.filter(match => match.status === "scheduled")
    },
    allUsers: state => {
      return state.users
    },
    loggedInUser: state => {
      return state.status.user
    },
    ownBets: state => {
      return state.ownBets
    }
  }
})
