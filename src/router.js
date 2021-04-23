import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import ResetPassword from './views/ResetPassword.vue'
import Logout from './views/Logout.vue'
import Help from './views/Help.vue'
import Home from './views/Home.vue'
import Bets from './views/Bets.vue'
import BetList from './views/BetList.vue'
import Matches from './views/Matches.vue'
import Match from './views/Match.vue'
import KingsGame from './views/RankKingsGame.vue'
import Oldfashioned from './views/RankOldfashioned.vue'
import Underdog from './views/RankUnderdog.vue'
import Balanced from './views/RankBalanced.vue'
import Secret from './views/RankSecret.vue'
import Scores from './views/Scores.vue'
import Users from './views/Users.vue'
import Payments from './views/Payments.vue'
import User from './views/User.vue'
import Profile from './views/Profile.vue'
import store from './store'

Vue.use(Router)

let isAdmin = ((to, from, next) => {

  store.dispatch('LOAD_STATUS')
  .then((response) => {
    if(!store.state.status.user.admin) {

      console.log("Access denied")

      next({
        path: '/'
      })
    }
    else {
      next()
    }
  })
})

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
      path: '/reset',
      name: 'reset',
      component: ResetPassword
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
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
      path: '/matches',
      name: 'matches',
      component: Matches,
      meta: {
        requiresAuth: true
      },
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
      path: '/rules',
      name: 'rules',
      component: Help,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores,
      props: true,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/scores/schosel',
      name: 'schosel',
      component: KingsGame,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scores/loser',
      name: 'loser',
      component: Oldfashioned,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scores/underdog',
      name: 'underdog',
      component: Underdog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scores/balanced',
      name: 'balanced',
      component: Balanced,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/scores/secret',
      name: 'secret',
      component: Secret,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments,
      props: true,
      meta: {
        requiresAuth: true
      },
      beforeEnter: isAdmin
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
