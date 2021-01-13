import Vue from 'vue'
import Router from 'vue-router'
import Matches from './views/Matches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import Account from './views/Account.vue'
import Help from './views/Help.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    }
  ]
})
