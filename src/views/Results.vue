<template>
  <div class="results">
    <h1>Results</h1>
   </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'upcomingMatches',
      'loading'
    ])
  },
  components: {
    ClipLoader
  }
}
</script>
