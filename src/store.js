import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from './http-constants'

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
      HTTP.get('/status', { withCredentials: true }).then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MATCHES: function ({ commit }) {
      HTTP.get('/matches', { withCredentials: true }).then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USERS: function ({ commit }) {
      HTTP.get('/users', { withCredentials: true }).then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_USERS', { users: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USER: function ({ commit }) {
      HTTP.get('/user', { withCredentials: true }).then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_OWN_BETS: function ({ commit }) {
      HTTP.get('/bets', { withCredentials: true }).then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_OWN_BETS', { ownBets: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_STATUS: (state, { status }) => {

      //TODO: remove this
      // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      //   status.user.achievements = {}
      //
      //   status.user.achievements.gambler = {}
      //   status.user.achievements.hustler = {}
      //   status.user.achievements.expert = {}
      //   status.user.achievements.hattrick = {}
      //   status.user.achievements.secret = {}
      //
      //   status.user.achievements.gambler.rank = 1
      //   status.user.achievements.gambler.score = 1000
      //
      //   status.user.achievements.hustler.rank = 1
      //   status.user.achievements.hustler.score = 1000
      //   status.user.achievements.hustler.times_correct = 2
      //
      //   status.user.achievements.expert.rank = 1
      //   status.user.achievements.expert.score = 1000
      //   status.user.achievements.expert.team_name = 'Russia'
      //
      //   status.user.achievements.hattrick.rank = 1
      //   status.user.achievements.hattrick.score = 1000
      //
      //   status.user.achievements.secret.rank = 1
      // }

      // Check if logged in user is leading any goals
      if(status.user && status.user.achievements) {
        var extras = []

        if(status.user.achievements.gambler.rank === 1) extras.push("Gambler")
        if(status.user.achievements.hustler.rank === 1) extras.push("Hustler")
        if(status.user.achievements.expert.rank === 1) extras.push("Expert")
        if(status.user.achievements.hattrick.rank === 1) extras.push("Hattrick")
        if(status.user.achievements.secret && status.user.achievements.secret.rank === 1) extras.push("Secret")
        // console.log(status.user)

        extras.length ? status.user.extras = extras.join(", ") : status.user.extras = "-"
      }

      state.status = status
      state.loadInfo.status = false
    },
    SET_MATCHES: (state, { matches }) => {

      // TODO: remove this (manipulates some matches to be live & scheduled)
      // for(var i=<
      // for(var i=4; i<= 5; i++) {
      //   matches[i].status = "live"
      //   matches[i].odds = new Array();
      //   matches[i].odds["1"] = 1.53403
      //   matches[i].odds["X"] = 4.28292
      //   matches[i].odds["2"] = 9.10101
      //   var d = new Date();
      //   matches[i].date = new Date(d.setMinutes(d.getMinutes() - 10))
      // }
      state.loadInfo.matches = false
      state.matches = matches
    },
    SET_USERS: (state, { users }) => {

      // TODO: Remove this
      // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      //   users.forEach((user, i) => {
      //     user.achievements = {}
      //
      //     user.achievements.gambler = {}
      //     user.achievements.hustler = {}
      //     user.achievements.expert = {}
      //     user.achievements.hattrick = {}
      //     user.achievements.secret = {}
      //
      //     if(i === 0) {
      //       user.goals = "Gambler, Hustler, Expert, Hattrick, Secret"
      //     }
      //
      //     user.achievements.gambler.rank = i + 1
      //     user.achievements.gambler.score = (1000 - i) / (i + 1)
      //
      //     user.achievements.hustler.rank = i + 1
      //     user.achievements.hustler.score = (1000 - i) / (i + 1)
      //     user.achievements.hustler.times_correct = users.length - i
      //
      //     user.achievements.expert.rank = i + 1
      //     user.achievements.expert.score = (1000 - i) / (i + 1)
      //     user.achievements.expert.team_name = 'Russia'
      //
      //     user.achievements.hattrick.rank = i + 1
      //     user.achievements.hattrick.score = (1000 - i) / (i + 1)
      //
      //     user.achievements.secret.rank = i + 1
      //
      //     console.log(user)
      //   })
      // }

      // Check who is leading which goals to show in score board
      if(users && users[0].achievements) {
        users.forEach((user) => {
          var extras = []

          if(user.achievements.gambler.rank == 1) extras.push("Gambler")
          if(user.achievements.hustler.rank == 1) extras.push("Hustler")
          if(user.achievements.expert.rank == 1) extras.push("Expert")
          if(user.achievements.hattrick.rank == 1) extras.push("Hattrick")
          if(user.achievements.secret && user.achievements.secret.rank == 1) extras.push("Secret")
// console.log(extras)
          extras.length ? user.extras = extras.join(", ") : user.extras = "-"
        })
      }
      // console.log(users[0])
      state.users = users
      state.loadInfo.users = false
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

      return played.sort((a, b) => {
        return b.match_id - a.match_id
      })
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

        acc[currDate].sort((a, b) => {
          return b.match_id - a.match_id
        })

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

      return playedMatchDays.sort((a, b) => {
        return b.match_id - a.match_id
      })
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
        state.status.user.rank = state.users.map(function(e) {
          return e.user_id;
        }).indexOf(state.status.user.user_id) + 1;
      }
      return state.status.user
    },
    ownBets: state => {
      return state.ownBets
    },
    loading: state => {
      return state.loadInfo
    },
    status: state => {
      return state.status
    }
  }
})
