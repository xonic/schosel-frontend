import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from './http-constants'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    status: {},
    user: {},
    users: [],
    matches: [],
    ownBets: undefined,
    loadInfo: {
      status: true,
      matches: true,
      users: true
    },
    rewards: {
      total: 87000,
      first: 0,
      second: 0,
      third: 0,
      gambler: 0,
      expert: 0,
      hustler: 0,
      hattrick: 0,
      secret: 0
    },
    avatarUrl: 'https://api.adorable.io/avatars/400/'
  },
  actions: {
    REGISTER: function ({commit, dispatch}, userData) {

      HTTP.post('/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      })
        .then(res => {

          console.log(res)
          // // Load all other stuff
          // dispatch('LOAD_STATUS')
          // dispatch('LOAD_MATCHES')
          // dispatch('LOAD_OWN_BETS')
          // dispatch('LOAD_USERS')
          //
          // commit('SET_AUTHENTICATED', { authenticated: true })
          //
          // // Remember across page loads
          // localStorage.setItem('authenticated', true)
          //
          // // Redirect to requested URL or default to matches
          // authData.redirect ? router.push({ path: authData.redirect }) : router.push('matches')
        })
        .catch(error => console.log(error))
    },
    LOGIN: function ({commit, dispatch}, authData) {

      HTTP.post('/login', {
        email: authData.email,
        password: authData.password,
        remember: true
      })
        .then(res => {

          // Load all other stuff
          dispatch('LOAD_STATUS')
          dispatch('LOAD_MATCHES')
          dispatch('LOAD_OWN_BETS')
          dispatch('LOAD_USERS')

          commit('SET_AUTHENTICATED', { authenticated: true })

          // Remember across page loads
          localStorage.setItem('authenticated', true)

          // Redirect to requested URL or default to matches
          authData.redirect ? router.push({ path: authData.redirect }) : router.push('matches')
        })
        .catch(error => console.log(error))
    },
    TRY_AUTO_LOGIN: function ({commit, dispatch}) {
      const auth = localStorage.getItem('authenticated')

      if(auth) {
        commit('SET_AUTHENTICATED', { authenticated: auth })

        // Load all other stuff
        dispatch('LOAD_STATUS')
        dispatch('LOAD_MATCHES')
        dispatch('LOAD_OWN_BETS')
        dispatch('LOAD_USERS')
      }

    },
    LOGOUT: function ({commit}) {
      HTTP.post('/logout')
        .then(res => {
          commit('SET_STATUS', { status: {} })
          commit('SET_USERS', { users: [] })
          commit('SET_AUTHENTICATED', { authenticated: false })
          localStorage.removeItem('authenticated')
          router.push('login')
        })
        .catch(error => console.log(error))
    },
    LOAD_STATUS: function ({ commit }) {
      // console.log('LOAD_STATUS called')
      HTTP.get('/status').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MATCHES: function ({ commit }) {
      // console.log('LOAD_MATCHES called')
      HTTP.get('/matches').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USERS: function ({ commit }) {
      // console.log('LOAD_USERS called')
      HTTP.get('/users').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_USERS', { users: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_USER: function ({ commit }) {
      // console.log('LOAD_USER called')
      HTTP.get('/user').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_USER', { user: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_OWN_BETS: function ({ commit }) {
      // console.log('LOAD_OWN_BETS called')
      HTTP.get('/bets').then((response) => {
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
    SET_AUTHENTICATED: (state, { authenticated }) => {
      state.authenticated = authenticated
    },
    SET_STATUS: (state, { status }) => {


      // Check if logged in user is leading any goals
      if(status.user && status.user.achievements) {
        // status.user.achievements.secret = {rank: 2} MOCK DATA
        var extras = []

        if(status.user.achievements.gambler.rank === 1) extras.push("Gambler")
        if(status.user.achievements.hustler.rank === 1) extras.push("Hustler")
        if(status.user.achievements.expert.rank === 1) extras.push("Expert")
        if(status.user.achievements.hattrick.rank === 1) extras.push("Hattrick")
        if(status.user.achievements.secret && status.user.achievements.secret.rank === 1) extras.push("Secret")

        extras.length ? status.user.extras = extras.join(", ") : status.user.extras = "-"
      }

      if(status.user) {
        status.user['avatar'] = state.avatarUrl + status.user.name
      }

      state.status = status
      state.loadInfo.status = false
    },
    SET_MATCHES: (state, { matches }) => {

      // TODO: remove this (manipulates some matches to be live & scheduled)
      for(var i=0; i<10; i++) {
        matches[i].status = "scheduled"
      }
      for(var i=11; i<= 12; i++) {
        matches[i].status = "live"
        matches[i].odds = new Array();
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

      // On logout reset rewards
      if(!users.length) {
        state.rewards = {}
        return
      }

      // Check who is leading which goals to show in score board
      if(users && users[0].achievements) {
        var first = 0
        var second = 0
        var third = 0
        var gambler = 0
        var expert = 0
        var hustler = 0
        var hattrick = 0
        var secret = 0

        // var tmp = 0 MOCK DATA

        state.rewards.total = users.length * 1000

        users.forEach((user) => {
          // tmp++ MOCK DATA
          // user.achievements.secret = {} MOCK DATA
          // user.achievements.secret.rank = tmp MOCK DATA
          // user.achievements.secret.score = 10 MOCK DATA

          // Store Avatar URL
          user.avatar = state.avatarUrl + user.name

          var extras = []

          if(user.rank == 1) first += 1
          if(user.rank == 2) second += 1
          if(user.rank == 3) third += 1

          if(user.achievements.gambler.rank == 1) {
            gambler += 1
            extras.push("Gambler")
          }
          if(user.achievements.hustler.rank == 1) {
            hustler += 1
            extras.push("Hustler")
          }
          if(user.achievements.expert.rank == 1) {
            expert += 1
            extras.push("Expert")
          }
          if(user.achievements.hattrick.rank == 1) {
            hattrick += 1
            extras.push("Hattrick")
          }
          if(user.achievements.secret && user.achievements.secret.rank == 1) {
            secret += 1
            extras.push("Secret")
          }

          extras.length ? user.extras = extras.join(", ") : user.extras = "-"
        })
      }

      state.rewards.first = state.rewards.total * (0.5 / first)
      state.rewards.second = state.rewards.total * (0.2 / second)
      state.rewards.third = state.rewards.total * (0.1 / third)
      state.rewards.gambler = state.rewards.total * (0.04 / gambler)
      state.rewards.hustler = state.rewards.total * (0.04 / hustler)
      state.rewards.expert = state.rewards.total * (0.04 / expert)
      state.rewards.hattrick = state.rewards.total * (0.04 / hattrick)
      state.rewards.secret = state.rewards.total * (0.04 / secret)

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
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date)
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

      state.users.forEach((el, i) => {

        el.reward = 0
        if(el.rank == 1) el.reward += state.rewards.first
        if(el.rank == 2) el.reward += state.rewards.second
        if(el.rank == 3) el.reward += state.rewards.third
        if(el.achievements.gambler.rank == 1) el.reward += state.rewards.gambler
        if(el.achievements.hustler.rank == 1) el.reward += state.rewards.hustler
        if(el.achievements.expert.rank == 1) el.reward += state.rewards.expert
        if(el.achievements.hattrick.rank == 1) el.reward += state.rewards.hattrick
        if(el.achievements.secret && el.achievements.secret.rank == 1) el.reward += state.rewards.secret

        el.reward ? el.reward = (el.reward / 100).toFixed(2) + "€" : el.reward = "-"

      })

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
    },
    rewards: state => {
      return state.rewards
    },
    authenticated: state => {
      return state.authenticated
    },
    avatarUrl: state => {
      return state.avatarUrl
    }
  }
})
