<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <ul v-if="scorePreviews">
        <li v-for="(score, index) in scorePreviews">
          <score-preview :score="scorePreviews[index]" :challenge-id="index" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ScorePreview from '@/components/ScorePreview'

export default {
  name: 'scores',
  components: {
    ScorePreview
  },
  computed: {
    ...mapGetters([
      'scorePreviews',
      'loggedInUser',
      'iconPaths'
    ])
  },
  methods: {
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    }
  }
}
</script>
