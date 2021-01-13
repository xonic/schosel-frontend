<template>
  <div class="matches">
    <div class="wrapper">
      <ul class="list__items flex-matches">
        <li
        is="match-item"
        v-for="liveMatch in liveMatches"
        v-bind="liveMatch">
          </li>
        </ul>
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
      'liveMatches',
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
  },
  mounted () {
    // if(!this.playedMatches.length) {
    //   console.log("zero matches")
    //   console.log(this.$root.$router)
    //   this.$root.$router.go("upcoming")
    // }
  }
}
</script>
