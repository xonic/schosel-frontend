import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import ResetPassword from './views/ResetPassword.vue'
import Logout from './views/Logout.vue'
import Rules from './views/Rules.vue'
import Home from './views/Home.vue'
import Bets from './views/Bets.vue'
import Results from './views/Results.vue'
import Result from './views/Result.vue'
import Scores from './views/Scores.vue'
import KingsGame from './views/ScoreKingsGame.vue'
import Oldfashioned from './views/ScoreOldfashioned.vue'
import Underdog from './views/ScoreUnderdog.vue'
import Balanced from './views/ScoreBalanced.vue'
import Hidden from './views/ScoreHidden.vue'
import User from './views/User.vue'
import Profile from './views/Profile.vue'
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
      component: Home,
      redirect: '/kings-game',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/kings-game',
          name: 'kingsgame',
          component: KingsGame,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/oldfashioned',
          name: 'oldfashioned',
          component: Oldfashioned,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/underdog',
          name: 'underdog',
          component: Underdog,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/balanced',
          name: 'balanced',
          component: Balanced,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/hidden',
          name: 'hidden',
          component: Hidden,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/bets',
      name: 'bets',
      component: Bets,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/results',
      name: 'results',
      component: Results,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/result/:id',
      name: 'result',
      component: Result,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/scores',
    //   name: 'scores',
    //   component: Scores,
    //   meta: {
    //     requiresAuth: true
    //   },
    // },
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
      path: '/user/:id',
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
