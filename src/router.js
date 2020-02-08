import Vue from 'vue'
import Router from 'vue-router'
import Match from './views/Match.vue'
import User from './views/User.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Matches from './views/Matches.vue'
import PlayedMatches from './views/PlayedMatches.vue'
import LiveMatches from './views/LiveMatches.vue'
import UpcomingMatches from './views/UpcomingMatches.vue'
import Score from './views/Score.vue'
// import Teams from './views/Teams.vue'
import Stats from './views/Stats.vue'
import PlayerStats from './views/PlayerStats.vue'
import TeamStats from './views/TeamStats.vue'
import MatchStats from './views/MatchStats.vue'
import Goals from './views/Goals.vue'
import TheSchosel from './views/TheSchosel.vue'
import GamblerGoal from './views/GamblerGoal.vue'
import HustlerGoal from './views/HustlerGoal.vue'
import ExpertGoal from './views/ExpertGoal.vue'
import HattrickGoal from './views/HattrickGoal.vue'
import SecretGoal from './views/SecretGoal.vue'
import Rules from './views/Rules.vue'
import Profile from './views/Profile.vue'
import Logout from './views/Logout.vue'
import store from './store'

Vue.use(Router)

const router =  new Router({
  base: "/",
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      redirect: '/matches',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches,
      redirect: '/matches/live',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          name: 'played',
          path: 'played',
          component: PlayedMatches,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'live',
          path: 'live',
          component: LiveMatches,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'upcoming',
          path: 'upcoming',
          component: UpcomingMatches,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/score',
      name: 'score',
      component: Score,
      redirect: '/score/schosel',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          name: 'schosel',
          path: 'schosel',
          component: TheSchosel,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'gambler',
          path: 'gambler',
          component: GamblerGoal,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'hustler',
          path: 'hustler',
          component: HustlerGoal,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'hattrick',
          path: 'hattrick',
          component: HattrickGoal,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'secret',
          path: 'secret',
          component: SecretGoal,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'expert',
          path: 'expert',
          component: ExpertGoal,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/matches/:id',
      name: 'match',
      component: Match,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

// Global navigation guard checks each route if
// authentication is needed
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.authenticated && !localStorage.getItem('authenticated')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
