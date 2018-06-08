<template>
  <div class="matches">
      <div class="wrapper">
        <div class="hero hero--7">
          <transition name="hero" appear>
            <div>
              <h1 class="hero__heading">Played</h1>
              <div class="hero__info">{{ playedMatches.length }} Matches</div>
            </div>
          </transition>
        </div>
        <transition name="content" appear>
          <div>
            <div class="grid-matches" v-if="playedMatches.length">
              <div v-for="matchDay in playedMatchDays" class="list">
                <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
                <ul class="list__items">
                  <li
                  is="match-item"
                  v-for="playedMatch in matchDay.matches"
                  v-bind="playedMatch"
                  class="list__item">
                </li>
              </ul>
            </div>
          </div>
          <h1 v-else>No matches played yet</h1>
        </div>
      </transition>
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
      'playedMatches',
      'playedMatchDays',
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
      return new Date(date).toLocaleString('en-GB', options)
    }
  },
  mounted () {
    // Navigate to upcoming matches if no matches played
    if(!this.playedMatches.length) {
      this.$router.push("upcoming")
    }
  }
}
</script>
