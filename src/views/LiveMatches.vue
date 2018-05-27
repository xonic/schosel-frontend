<template>
  <div class="matches">
    <div class="wrapper">
      <ul class="list__items flex-matches" v-if="liveMatches.length">
        <li
        is="match-item"
        v-for="liveMatch in liveMatches"
        v-bind="liveMatch">
          </li>
        </ul>
        <h1 v-else>No matches currently being played</h1>
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
      'liveMatches',
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
    // Navigate to played matches if no matches currently live
    if(!this.liveMatches.length) {
      this.$router.push("played")
    }
  }
}
</script>
