import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: {},
    user: {},
    users: [],
    matches: [],
    ownBets: undefined,
    loadInfo: {
      status: true,
      matches: true,
      users: true
    }
  },
  actions: {
    LOAD_STATUS: function ({ commit }) {
      axios.get('/status', {withCredentials: true}).then((response) => {
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MATCHES: function ({ commit }) {
      axios.get('/matches', {withCredentials: true}).then((response) => {
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USERS: function ({ commit }) {
      axios.get('/users', {withCredentials: true}).then((response) => {
        commit('SET_USERS', { users: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USER: function ({ commit }) {
      axios.get('/user', {withCredentials: true}).then((response) => {
        commit('SET_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_OWN_BETS: function ({ commit }) {
      axios.get('/bets', {withCredentials: true}).then((response) => {
        commit('SET_OWN_BETS', { ownBets: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_STATUS: (state, { status }) => {
      state.status = status
      state.loadInfo.status = false
    },
    SET_MATCHES: (state, { matches }) => {

      // TODO: remove this (manipulates some matches to be live & scheduled)
      for(var i=matches.length-1; i>=20; i--) {
        matches[i].status = "scheduled"
        matches[i].odds["1"] = "medium"
        matches[i].odds["X"] = "low"
        matches[i].odds["2"] = "high"
      }
      for(var i=matches.length-21; i>=matches.length-22; i--) {
        matches[i].status = "live"
        matches[i].odds["1"] = 1.53403
        matches[i].odds["X"] = 4.28292
        matches[i].odds["2"] = 9.10101
        var d = new Date();
        matches[i].date = new Date(d.setMinutes(d.getMinutes() - 10))
      }
      state.loadInfo.matches = false
      state.matches = matches
    },
    SET_USERS: (state, { users }) => {
      state.loadInfo.users = false
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
    playedMatchDays: state => {

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

      // Split matches into match days
      var splitMatches = played.reduce((acc, curr) => {

        // Get real date, set hours zero to put matches with same date but
        // different daytime into same matchday group
        var currDate = new Date(curr.date)
        currDate.setHours(0,0,0,0)

        // Check if new object acc already has current date as an attribute
        // otherwise create it
        if(!acc.hasOwnProperty(currDate)) {
          acc[currDate] = [];
        }
        acc[currDate].push(curr);
        return acc;
      }, {})

      // Array to be returned containing list of matchday objects with date and
      // matches attributes
      var playedMatchDays = []

      // Convert from object to array
      for(var el in splitMatches) {
        playedMatchDays.push({
          date: el,
          matches: splitMatches[el]
        })
      }

      return playedMatchDays

    },
    liveMatches: state => {

      // Filter matches that are live
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

      // Filter matches that are upcomingg
      var upcoming = state.matches.filter(match => match.status === "scheduled")

      // Add own bets to each upcoming match
      if(upcoming && state.ownBets) {
        upcoming.forEach(function(match){
          var ownBet = state.ownBets.find(function(bet){
            return bet.match.match_id === match.match_id
          }, this)

          match.ownBet = ownBet
          match.supertip = ownBet.supertip
        }, this)
      }

      return upcoming
    },
    upcomingMatchDays: state => {

      // Filter matches that are upcomingg
      var upcoming = state.matches.filter(match => match.status === "scheduled")

      // Add own bets to each upcoming match
      if(upcoming && state.ownBets) {
        upcoming.forEach(function(match){
          var ownBet = state.ownBets.find(function(bet){
            return bet.match.match_id === match.match_id
          }, this)

          match.ownBet = ownBet
          match.supertip = ownBet.supertip
        }, this)
      }

      // Split matches into match days
      var splitMatches = upcoming.reduce((acc, curr) => {

        // Get real date, set hours zero to put matches with same date but
        // different daytime into same matchday group
        var currDate = new Date(curr.date)
        currDate.setHours(0,0,0,0)

        // Check if new object acc already has current date as an attribute
        // otherwise create it
        if(!acc.hasOwnProperty(currDate)) {
          acc[currDate] = [];
        }
        acc[currDate].push(curr);
        return acc;
      }, {})

      // Array to be returned containing list of matchday objects with date and
      // matches attributes
      var upcomingMatchDays = []

      // Convert from object to array
      for(var el in splitMatches) {
        upcomingMatchDays.push({
          date: el,
          matches: splitMatches[el]
        })
      }

      return upcomingMatchDays
    },
    allUsers: state => {

      state.users.sort(function(a,b) {
        return b.points - a.points;
      });

      state.users.forEach(function(el, i){

        // Set rank column value
        el.rank = i + 1;

        // Beautify score
        el.score = el.points.toFixed(2)

        // Calculate difference of logged in player score to other players score
        el.difference = (el.points - state.status.user.points).toFixed(2)
        if(el.difference == 0.00) el.difference = "-"

      }, this)

      return state.users
    },
    loggedInUser: state => {

      // Get rank of logged in user
      if(state.users && state.status.user) {
        state.status.user.rank = state.users.map(function(e) { return e.user_id; }).indexOf(state.status.user.user_id) + 1;
      }
      return state.status.user
    },
    ownBets: state => {
      return state.ownBets
    },
    loading: state => {
      return state.loadInfo
    }
  }
})
