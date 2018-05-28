import Vue from 'vue'
import Router from 'vue-router'
import Match from './views/Match.vue'
import Matches from './views/Matches.vue'
import PlayedMatches from './views/PlayedMatches.vue'
import LiveMatches from './views/LiveMatches.vue'
import UpcomingMatches from './views/UpcomingMatches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import PlayerStats from './views/PlayerStats.vue'
import TeamStats from './views/TeamStats.vue'
import MatchStats from './views/MatchStats.vue'
import Help from './views/Help.vue'

Vue.use(Router)

export default new Router({
  base: "/worlds2018/static/",
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/matches/live'
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches,
      redirect: '/matches/live',
      children: [
        {
          name: 'played',
          path: 'played',
          component: PlayedMatches
        },
        {
          name: 'live',
          path: 'live',
          component: LiveMatches
        },
        {
          name: 'upcoming',
          path: 'upcoming',
          component: UpcomingMatches
        }
      ]
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      redirect: '/stats/players',
      children: [
        {
          name: 'players',
          path: 'players',
          component: PlayerStats
        },
        {
          name: 'teams',
          path: 'teams',
          component: TeamStats
        },
        {
          name: 'match-stats',
          path: 'matches',
          component: MatchStats
        }
      ]
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
