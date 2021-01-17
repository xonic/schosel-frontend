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
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'nav-main'
  }
</script>
