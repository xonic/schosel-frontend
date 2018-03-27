import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: {},
    users: {},
    matches: {},
    bets: {},
    teams: {}
  },
  mutations: {
    setMatches(state, matches) {
      state.matches = matches;
    }
  },
  actions: {

  }
})
