import Vue from 'vue'
import Router from 'vue-router'
import Match from './views/Match.vue'
import User from './views/User.vue'
import Matches from './views/Matches.vue'
import PlayedMatches from './views/PlayedMatches.vue'
import LiveMatches from './views/LiveMatches.vue'
import UpcomingMatches from './views/UpcomingMatches.vue'
import Score from './views/Score.vue'
import Stats from './views/Stats.vue'
import PlayerStats from './views/PlayerStats.vue'
import TeamStats from './views/TeamStats.vue'
import MatchStats from './views/MatchStats.vue'
import Goals from './views/Goals.vue'
import GamblerGoal from './views/GamblerGoal.vue'
import HustlerGoal from './views/HustlerGoal.vue'
import ExpertGoal from './views/ExpertGoal.vue'
import HattrickGoal from './views/HattrickGoal.vue'
import SecretGoal from './views/SecretGoal.vue'

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
      path: '/goals',
      name: 'goals',
      component: Goals,
      redirect: '/goals/gambler',
      children: [
        {
          name: 'gambler',
          path: 'gambler',
          component: GamblerGoal
        },
        {
          name: 'hustler',
          path: 'hustler',
          component: HustlerGoal
        },
        {
          name: 'hattrick',
          path: 'hattrick',
          component: HattrickGoal
        },
        {
          name: 'secret',
          path: 'secret',
          component: SecretGoal
        },
        {
          name: 'expert',
          path: 'expert',
          component: ExpertGoal
        }
      ]
    },
    // {
    //   path: '/stats',
    //   name: 'stats',
    //   component: Stats,
    //   redirect: '/stats/players',
    //   children: [
    //     {
    //       name: 'players',
    //       path: 'players',
    //       component: PlayerStats
    //     },
    //     {
    //       name: 'teams',
    //       path: 'teams',
    //       component: TeamStats
    //     },
    //     {
    //       name: 'match-stats',
    //       path: 'matches',
    //       component: MatchStats
    //     }
    //   ]
    // },
    {
      path: '/matches/:id',
      name: 'match',
      component: Match,
      props: true
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User,
      props: true
    }
  ]
})
