import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from './http-constants'
import router from './router'
import { berlinMatchDay } from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MAX_SUPERBETS: 8,
    authenticated: false,
    adminMode: false,
    showPopover: false,
    status: {},
    users: [],
    allUsers: [],
    errors: [],
    matches: {
      live: [],
      over: [],
      scheduled: []
    },
    nextMatch: [],
    nextMatchDay: [],
    lastMatch: [],
    ownBets: undefined,
    loadInfo: {
      status: true,
      matches: true,
      users: true
    },
    avatarUrl: 'https://schosel.net/api/avatar/',
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
      }
    ]
  },
  actions: {
    REGISTER ({commit, dispatch}, userData) {

      HTTP.post('/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      })
        .then(res => {
          router.push({ name: 'login', query: { registered: "true" } })
        })
        .catch(error => console.log(error))
    },
    LOGIN ({commit, dispatch}, authData) {

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

          // Remember across page loads (can throw in Safari private mode)
          try {
            localStorage.setItem('authenticated', true)
          } catch (e) {
            console.log(e)
          }

          // Redirect to requested URL or default to matches
          authData.redirect ? router.push({ path: authData.redirect }) : router.push('/')
        })
        .catch(error => {
          let messages
          if (error.response) {
            // Server responded with an error status
            const data = error.response.data
            messages = (data && data.errors) || [`Server error ${error.response.status}: ${JSON.stringify(data)}`]
          } else if (error.request) {
            // Request was sent but no response came back (network/CORS/timeout)
            messages = [`Could not reach the server (${error.message}). Check your connection and try again.`]
          } else {
            // Something failed client-side before/while handling the request
            messages = [`Unexpected error: ${error.message}`]
          }
          commit('SET_ERRORS', { errors: messages })
        })
    },
    TRY_AUTO_LOGIN ({commit, dispatch}) {
      const auth = localStorage.getItem('authenticated')

      if(auth) {
        commit('SET_AUTHENTICATED', { authenticated: auth })

        // Load all other stuff
        dispatch('LOAD_STATUS')
        dispatch('LOAD_MATCHES')
        dispatch('LOAD_USERS')
      }

    },
    LOGOUT ({commit}) {
      HTTP.post('/logout')
        .then(res => {
          commit('SET_STATUS', { status: {} })
          commit('SET_USERS', { users: [] })
          commit('SET_AUTHENTICATED', { authenticated: false })
          try {
            localStorage.removeItem('authenticated')
          } catch (e) {
            console.log(e)
          }
          router.push('login')
        })
        .catch(error => console.log(error))
    },
    async LOAD_STATUS ({ commit, dispatch }) {
      await HTTP.get('/status').then((response) => {
        commit('SET_STATUS', { status: response.data })
      }, (err) => {
        console.log(err)
        if (err.response.status === 401) {
         // Session invalid
         dispatch('LOGOUT')
        }
      })
    },
    async LOAD_MATCHES ({ commit, dispatch }) {

      await HTTP.get('/matches').then((response) => {
        commit('SET_MATCHES', { matches: response.data })
      }, (err) => {
        console.log(err)
        if (err.response.status === 401) {
         // Session invalid
         dispatch('LOGOUT')
        }
      })
    },
    async LOAD_USERS ({ commit, dispatch }) {

      await HTTP.get('/users').then((response) => {
        commit('SET_USERS', { users: response.data })
        commit('SET_SCORES', { users: response.data })
      }, (err) => {
        console.log(err)
        if (err.response.status === 401) {
         // Session invalid
         dispatch('LOGOUT')
        }
      })
    },
    async LOAD_ALL_USERS ({ commit, dispatch }) {

      await HTTP.get('/admin/users').then((response) => {
        commit('SET_ALL_USERS', { allUsers: response.data })
      }, (err) => {
        console.log(err)
        if (err.response.status === 401) {
         // Session invalid
         dispatch('LOGOUT')
        }
      })
    },

    // User trigger reset pwd
    async REQUEST_RESET_PASSWORD ({ commit, dispatch }, user_email) {

      await HTTP.post('/trigger_password_reset', user_email).then((response) => {
        router.push({ name: 'login', query: { reset_password: "true" } })
      }, (err) => {
        console.log(err)
      })
    },
    // Admin trigger reset password
    async RESET_PWD ({ commit, dispatch }, user_id) {

      await HTTP.post('/admin/trigger_password_reset/' + user_id).then((response) => {
        alert("Reset link sent")
      }, (err) => {
        alert(err)
        console.log(err)
      })
    },
    async CONFIRM_PAYMENT ({ commit }, user_id) {

      await HTTP.post('/admin/confirm_payment/' + user_id).then((response) => {
        console.log(response)
      }, (err) => {
        console.log(err)
      })
    },
    async RESET_AVATAR ({dispatch}) {
      await HTTP.post('/avatar')
        .then(res => {
          // Reload logged in user
          dispatch('LOAD_STATUS')
        })
        .catch(errors => {
          commit('SET_ERRORS', { errors: errors.response.data.errors })
        })
    },
    // Reset password
    async RESET_PASSWORD ({commit, dispatch}, userData) {
      await HTTP.post('/reset_password', {
          user_id: userData.user_id,
          reset_token: userData.reset_token,
          new_password: userData.new_password
        })
        .then(res => {
          router.push({ name: 'login', query: { reset: "true" } })
        })
        .catch(errors => {
          commit('SET_ERRORS', { errors: errors.response.data.errors })
        })
    },
    SHOW_POPOVER ({ commit }) {
      commit('SET_POPOVER_VISIBILITY', { showPopover: true })
    },
    HIDE_POPOVER ({ commit }) {
      commit('SET_POPOVER_VISIBILITY', { showPopover: false })
    }
  },
  mutations: {
    SET_SCORES: (state, { users }) => {

      state.scores = []

      const scoredUsers = users.filter(u => u.scores)

      // Iterate the challenges, sort users by challenge rank, push to state.scores array
      for(let i=0; i < state.scoreMeta.length; i++) {
        state.scores.push(
          {
            ...state.scoreMeta[i],
            users:
            scoredUsers.slice().sort((a, b) => {
              if(a.scores[i].rank === b.scores[i].rank) {
                return a.name.localeCompare(b.name)
              }
              else {
                return (a.scores[i].rank > b.scores[i].rank) ? 1 : -1
              }
            })
          }
        )
      }
      if(state.status.user && state.status.user.admin) console.log('scores', state.scores)

      // Iterate the challenges,
      // show the first three players regardless of shared ranks
      for(let i=0; i<state.scores.length; i++) {

        if(!state.scores[i].users.length) return

        state.scorePreviews[i] = {
          ...state.scoreMeta[i],
          users: state.scores[i].users.slice(0, 3)
        }
      }
      if(state.status.user && state.status.user.admin) console.log('scorePreviews', state.scorePreviews)
    },
    SET_ERRORS: (state, { errors }) => {
      state.errors = errors
    },
    SET_AUTHENTICATED: (state, { authenticated }) => {
      state.authenticated = authenticated
    },
    SET_ADMIN_MODE: (state, val) => {
      state.adminMode = val
    },
    SET_POPOVER_VISIBILITY: (state, { showPopover }) => {
      state.showPopover = showPopover
    },
    SET_STATUS: (state, { status }) => {
      if(state.status.user && state.status.user.admin) console.log('status', status)

      if(status.user) {
        // status.user['avatar'] = state.avatarUrl + status.user.name

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

      if(state.status.user && state.status.user.admin) console.log('matches', state.matches)

      state.loadInfo.matches = false
      state.matches = matches

      // Get last match
      if (state.matches.over.length) {
        state.lastMatch = state.matches.over.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0,1)
      }
      // Get upcoming match
      if (state.matches.scheduled.length) {
        state.nextMatch = state.matches.scheduled.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0,1)
      }


      // Get upcoming match day (Berlin noon boundary: groups overnight matches with
      // the preceding evening instead of the next calendar day)
      if (state.nextMatch && state.matches.scheduled.length) {
        const sorted = state.matches.scheduled.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
        const firstDay = berlinMatchDay(sorted[0].date)
        state.nextMatchDay = sorted.filter(m => berlinMatchDay(m.date) === firstDay)
      }

      // TODO: remove this mock data
      // state.matches.live.push(
      //   {
      //     "date": "2021-04-23T11:30:00Z",
      //     "match_id": 9,
      //     "odds": {
      //         "1": 0,
      //         "2": 3,
      //         "X": 1.5
      //     },
      //     "outcome": "2",
      //     "private_bet": {
      //         "outcome": "X",
      //         "points": [
      //             {
      //                 "challenge_id": 1,
      //                 "name": "SCHOSEL",
      //                 "points": 0
      //             },
      //             {
      //                 "challenge_id": 2,
      //                 "name": "LOSER",
      //                 "points": 3
      //             },
      //             {
      //                 "challenge_id": 3,
      //                 "name": "UNDERDOG",
      //                 "points": 0
      //             },
      //             {
      //                 "challenge_id": 4,
      //                 "name": "BALANCED",
      //                 "points": 0
      //             },
      //             {
      //                 "challenge_id": 5,
      //                 "name": "COMEBACK",
      //                 "points": 0
      //             }
      //         ],
      //         "superbet": true
      //     },
      //     "stage": "Regular Season - 30",
      //     "status": "live",
      //     "team1_goals": 1,
      //     "team1_iso": "",
      //     "team1_name": "FC Zurich",
      //     "team2_goals": 2,
      //     "team2_iso": "",
      //     "team2_name": "BSC Young Boys"
      //   }
      // )
    },
    SET_USERS: (state, { users }) => {
      if(state.status.user && state.status.user.admin) console.log('users', users)


      users.forEach((user, i) => {

          if(!user.public_bets.length) return

          user.public_bets.forEach((bet, i) => {
            bet.bet['totalPoints'] = 0
            bet.bet.points.forEach((point, i) => {
              bet.bet.totalPoints += point.points
            })
          })
      })

      state.users = users
      state.loadInfo.users = false
    },
    SET_ALL_USERS: (state, { allUsers }) => {
      state.allUsers = allUsers
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
      if(!state.matches || !state.matches.scheduled) return []
      return state.matches.scheduled
    },
    nextMatch: state => {
      return state.nextMatch
    },
    nextMatchDay: state => {
      return state.nextMatchDay
    },
    futureUnbetMatches: (state, getters) => {
      if (!getters.loggedInUser) return []
      const betIds = new Set((getters.loggedInUser.private_bets || []).map(b => b.match_id))
      return (state.matches.scheduled || []).filter(m => !betIds.has(m.match_id))
    },
    allUsers: state => {
      return state.users
    },
    allUsersForAdmin: state => {
      return state.allUsers
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
    adminMode: state => state.adminMode,
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
          points: user.scores[0].points,
          reward: user.scores[0].reward
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
          points: user.scores[1].points,
          reward: user.scores[1].reward
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

    errors: state => {
      return state.errors
    },
    popoverIsVisible: state => {
      return state.showPopover
    }
  }
})
