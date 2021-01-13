import Vue from 'vue'
import Router from 'vue-router'
import Match from './views/Match.vue'
import Matches from './views/Matches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/match/:id',
      name: 'match',
      component: Match,
      props: true
    }
  ]
})
