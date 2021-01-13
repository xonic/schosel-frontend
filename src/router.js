import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Matches from './views/Matches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import Account from './views/Account.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ]
})
