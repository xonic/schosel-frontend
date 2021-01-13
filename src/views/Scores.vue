<template>
  <div class="wrapper">
    <h1>Scores</h1>
    <nav class="nav nav--main">
      <ul class="nav__items">
        <li class="nav__item">
          <router-link class="nav__link" :to="{ name: 'kings-game' }">
            King's Game
          </router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{ name: 'oldfashioned' }">
            Oldfashioned
          </router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{ name: 'underdog' }">
            Underdog
          </router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{ name: 'balanced' }">
            Balanced
          </router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{ name: 'secret' }">
            Secret
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
</script>
