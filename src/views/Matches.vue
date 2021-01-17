<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Matches</h1>
      <ul v-if="liveMatches.length || playedMatches.length">
        <li v-for="match in liveMatches">
          <result-preview :match="match" />
        </li>
        <li v-for="match in playedMatches">
          <result-preview :match="match" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import ResultPreview from '@/components/ResultPreview'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'loading'
    ])
  },
  components: {
    ClipLoader,
    ResultPreview
  }
}
</script>
