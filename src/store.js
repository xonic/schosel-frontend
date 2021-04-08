import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from './http-constants'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MAX_SUPERBETS: 8,
    authenticated: false,
    status: {},
    user: {},
    users: [],
    errors: [],
    matches: [],
    nextMatch: [],
    lastMatch: [],
    ownBets: undefined,
    loadInfo: {
      status: true,
      matches: true,
      users: true
    },
    avatarUrl: 'https://schosel.net/adorables/400/',
    iconPaths: [
      "i--1.svg",
      "i--2.svg",
      "i--3.svg",
      "i--4.svg",
      "i--5.svg"
    ],
    scores: [],
    scorePreviews: [],
    scoreMeta: [
      {
        challenge_id: 1,
        challenge_route: 'schosel',
        description: 'Most correct bets with odds',
        name: "Schosel"
      },
      {
        challenge_id: 2,
        challenge_route: 'loser',
        description: 'Most wrong bets with odds',
        name: "Loser"
      },
      {
        challenge_id: 3,
        challenge_route: 'underdog',
        description: 'Most correct bets on highest odds',
        name: "Underdog"
      },
      {
        challenge_id: 4,
        challenge_route: 'balanced',
        description: 'Most correct bets on draw with odds',
        name: "Balanced"
      },
      {
        challenge_id: 5,
        challenge_route: 'secret',
        description: 'Will be revealed after the tournament',
        name: "Secret"
      }
    ]
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
          // dispatch('LOAD_USERS')
          //
          // commit('SET_AUTHENTICATED', { authenticated: true })
          //
          // // Remember across page loads
          // localStorage.setItem('authenticated', true)
          //
          // // Redirect to requested URL or default to matches
          // authData.redirect ? router.push({ path: authData.redirect }) : router.push('matches')
          router.push({ name: 'login', query: { registered: "true" } })

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
          dispatch('LOAD_USERS')

          commit('SET_AUTHENTICATED', { authenticated: true })

          // Remember across page loads
          localStorage.setItem('authenticated', true)

          // Redirect to requested URL or default to matches
          authData.redirect ? router.push({ path: authData.redirect }) : router.push('/')
        })
        .catch(errors => {
          commit('SET_ERRORS', { errors: errors.response.data.errors })
        })
    },
    TRY_AUTO_LOGIN: function ({commit, dispatch}) {
      const auth = localStorage.getItem('authenticated')

      if(auth) {
        commit('SET_AUTHENTICATED', { authenticated: auth })

        // Load all other stuff
        dispatch('LOAD_STATUS')
        dispatch('LOAD_MATCHES')
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
    async LOAD_STATUS ({ commit }) {
      console.log('LOAD_STATUS called')
      await HTTP.get('/status').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    async LOAD_MATCHES ({ commit }) {
      // console.log('LOAD_MATCHES called')

      await HTTP.get('/matches').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    async LOAD_USERS ({ commit }) {
      // console.log('LOAD_USERS called')

      await HTTP.get('/users').then((response) => {
        if(response.headers["content-type"] !== "application/json") {
          window.location.href = 'https://www.schosel.net/worlds2018/login';
        }
        commit('SET_USERS', { users: response.data })
        commit('SET_SCORES', { users: response.data })
        commit('SET_SCORE_PREVIEWS')
      }, (err) => {
        console.log(err)
      })

      // let response = await HTTP.get('/users')
      // commit('SET_USERS', { users: response.data })

    }
  },
  mutations: {
    SET_SCORES: (state, { users }) => {

      // Iterate the 5 challenges,
      // sort users by challenge rank ,
      // push to state.scores array
      for(let i=0; i<=4; i++) {
        state.scores.push(
          {
            ...state.scoreMeta[i],
            users:
            users.slice().sort((a, b) => {
              if(a.scores[i].rank === b.scores[i].rank) {
                return a.scores[i].name.localeCompare(b.scores[i].name)
              }
              else {
                return (a.scores[i].rank > b.scores[i].rank) ? 1 : -1
              }
            })
          }
        )
      }
    },
    SET_SCORE_PREVIEWS: (state) => {

    // Iterate the 5 challenges,
    // get logged in user index in score,
    // add preceeding and succeeding players in rank
    for(let i=0; i<state.scores.length; i++) {

        let loggedInUserIndex = state.scores[i].users.findIndex(user => user.user_id === state.status.user.user_id)

        // Logged in user is ranked first,
        // add the following two players in rank
        if (loggedInUserIndex === 0) {
          state.scorePreviews[i] = {
            ...state.scoreMeta[i],
            users: [
              state.status.user,
              state.scores[i].users[loggedInUserIndex + 1],
              state.scores[i].users[loggedInUserIndex + 2]
            ]
          }
        }
        // Logged in user is ranked last,
        // add the previous two players in rank
        else if(loggedInUserIndex === state.scores[i].length - 1) {
          state.scorePreviews[i] = {
            ...state.scoreMeta[i],
            users: [
              state.scores[i].users[loggedInUserIndex - 2],
              state.scores[i].users[loggedInUserIndex - 1],
              state.status.user
            ]
          }
        }
        // Logged in user is ranked somewhere in between,
        // add preceeding and succeding player in rank
        else {
          state.scorePreviews[i] = {
            ...state.scoreMeta[i],
            users: [
              state.scores[i].users[loggedInUserIndex - 1],
              state.status.user,
              state.scores[i].users[loggedInUserIndex + 1]
            ]
          }
        }
      }
    },
    SET_ERRORS: (state, { errors }) => {
      state.errors = errors
    },
    SET_AUTHENTICATED: (state, { authenticated }) => {
      state.authenticated = authenticated
    },
    SET_STATUS: (state, { status }) => {

      console.log('status', status)

      if(status.user) {
        status.user['avatar'] = state.avatarUrl + status.user.name
        
        if(!status.user.champion || !status.user.champion.team_id) {
          status.user.champion = {
            team_id: 'def'
          }
        }
      }


      state.status = status
      state.loadInfo.status = false
    },
    SET_MATCHES: (state, { matches }) => {

      state.loadInfo.matches = false
      state.matches = matches
      console.log('matches', matches)

      // TODO: remove mock data
      // state.matches.live = state.matches.over.slice(3,4)

      // TODO: remove mock data
      // state.matches.scheduled = state.matches.over.slice(2,3)

      // Get last match
      if (state.matches.over.length) {
        state.lastMatch =  state.matches.over.slice(0,1)
      }
      // Get upcoming match
      if (state.matches.scheduled.length) {
        state.nextMatch =  state.matches.scheduled.slice(0,1)
      }
    },
    SET_USERS: (state, { users }) => {
      users.forEach((user) => user.avatar = state.avatarUrl + user.name )
      state.users = users
      state.loadInfo.users = false
    }
  },
  getters: {
    maxSuperbets: state => {
      return state.MAX_SUPERBETS
    },
    matches: state => {
      return state.matches
    },
    overMatches: state => {
      return state.matches.over
    },
    lastMatch: state => {
      return state.lastMatch
    },
    liveMatches: state => {

      if(!state.matches || !state.matches.live) return []
      return state.matches.live
    },
    scheduledMatches: state => {
      return state.matches.scheduled
    },
    nextMatch: state => {
      return state.nextMatch
    },
    allUsers: state => {
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

    loading: state => {
      return state.loadInfo
    },
    status: state => {
      return state.status
    },
    authenticated: state => {
      return state.authenticated
    },
    avatarUrl: state => {
      return state.avatarUrl
    },
    iconPaths: state => {
      return state.iconPaths
    },

    scorePreviews: state => {
      return state.scorePreviews
    },

    scores: state => {

      return state.scores
    },

    kingsScore: state => {

      return state.users.map(user => {
        return {
          ...user,
          rank: user.scores[0].rank,
          points: user.scores[0].points
        }
      }).sort((a, b) => {
        if(a.scores[0].rank === b.scores[0].rank) {
          return a.scores[0].name.localeCompare(b.scores[0].name)
        }
        else {
          return (a.scores[0].rank > b.scores[0].rank) ? 1 : -1
        }
      })
    },

    oldfashionedScore: state => {

      return state.users.map(user => {
        return {
          ...user,
          rank: user.scores[1].rank,
          points: user.scores[1].points
        }
      }).sort((a, b) => {
        if(a.scores[1].rank === b.scores[1].rank) {
          return a.scores[1].name.localeCompare(b.scores[1].name)
        }
        else {
          return (a.scores[1].rank > b.scores[1].rank) ? 1 : -1
        }
      })
    },

    underdogScore: state => {

      return state.users.map(user => {
        return {
          ...user,
          rank: user.scores[2].rank,
          points: user.scores[2].points
        }
      }).sort((a, b) => {
        if(a.scores[2].rank === b.scores[2].rank) {
          return a.scores[2].name.localeCompare(b.scores[2].name)
        }
        else {
          return (a.scores[2].rank > b.scores[2].rank) ? 1 : -1
        }
      })
    },

    balancedScore: state => {

      return state.users.map(user => {
        return {
          ...user,
          rank: user.scores[3].rank,
          points: user.scores[3].points
        }
      }).sort((a, b) => {
        if(a.scores[3].rank === b.scores[3].rank) {
          return a.scores[3].name.localeCompare(b.scores[3].name)
        }
        else {
          return (a.scores[3].rank > b.scores[3].rank) ? 1 : -1
        }
      })
    },

    secretScore: state => {

      return state.users.map(user => {
        return {
          ...user,
          rank: user.scores[4].rank,
          points: user.scores[4].points
        }
      }).sort((a, b) => {
        if(a.scores[4].rank === b.scores[4].rank) {
          return a.scores[4].name.localeCompare(b.scores[4].name)
        }
        else {
          return (a.scores[4].rank > b.scores[4].rank) ? 1 : -1
        }
      })
    },

    errors: state => {
      return state.errors
    }
  }
})
