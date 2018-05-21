<template>
  <div class="matches">
    <div class="wrapper">
      <div class="hero hero--9">
        <h1 class="hero__heading">Upcoming</h1>
        <div class="hero__info">{{ upcomingMatches.length }} Matches</div>
      </div>
      <div class="champion-bet" v-if="loggedInUser">
        <select v-model="loggedInUser.champion_id">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>Selected: {{ loggedInUser.champion_id }}</span>
      </div>
      <div class="legend">
        <div v-if="loggedInUser">
          Remaining super bets: {{ 4 - loggedInUser.visible_supertips }}
        </div>
        <div class="">
          Explain how odds work
        </div>
      </div>
      <div class="grid-matches" v-if="upcomingMatches.length">
        <div v-for="matchDay in upcomingMatchDays" class="list">
          <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
          <ul class="list__items">
            <li
              is="match-item"
              v-for="upcomingMatch in matchDay.matches"
              v-bind="upcomingMatch"
              class="list__item">
            </li>
          </ul>
        </div>
      </div>
      <h1 v-else>No more upcoming matches</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MatchItem from '@/components/MatchItem.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'upcomingMatches',
      'upcomingMatchDays',
      'loggedInUser',
      'loading'
    ])
  },
  components: {
    MatchItem,
    ClipLoader
  },
  methods: {
    matchDate: function(date) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('de-DE', options)
    }
  }
}
</script>
