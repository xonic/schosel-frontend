<template>
  <nav class="nav nav--main">
    <ul class="nav__items">
      <li class="nav__item">
        <router-link class="nav__link" :to="{ name: 'bets' }">
          Bets
        </router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{ name: 'matches' }">
          Matches
        </router-link>
      </li>
      <li v-if="isAdmin" class="nav__item">
        <router-link class="nav__link" :to="{ name: 'teams' }">
          Teams
        </router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{ name: 'scores' }">
          Scores
        </router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{ name: 'users' }">
          Users
        </router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" :to="{ name: 'rules' }">
          Rules
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'nav-main',
  computed: {
    ...mapGetters(['loggedInUser']),
    isAdmin() {
      return this.loggedInUser && this.loggedInUser.admin
    }
  }
}
</script>
