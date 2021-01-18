<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Matches</h1>
      <ul v-if="matches">
        <li v-for="match in matches.live">
          <match-preview :match="match" />
        </li>
        <li v-for="match in matches.over">
          <match-preview :match="match" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import MatchPreview from '@/components/MatchPreview'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'matches'
    ])
  },
  components: {
    ClipLoader,
    MatchPreview
  }
}
</script>
