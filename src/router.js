import Vue from 'vue'
import Router from 'vue-router'
import Match from './views/Match.vue'
import Matches from './views/Matches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  base: "/wm2018/static/",
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/matches'
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
      path: '/matches/:id',
      name: 'match',
      component: Match,
      props: true
    }
  ]
})
