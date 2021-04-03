<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <ul v-if="scorePreviews.length">
        <li v-for="(score, index) in scorePreviews">
          <score-preview :score="scorePreviews[index]" :challenge-id="index" />
        </li>
      </ul>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">No one scored anything yet</div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ScorePreview from '@/components/ScorePreview'
import Avatar from '@/components/Avatar'

export default {
  name: 'scores',
  components: {
    ScorePreview,
    Avatar
  },
  computed: {
    ...mapGetters([
      'scorePreviews',
      'loggedInUser',
      'iconPaths',
      'avatarUrl'
    ])
  },
  methods: {
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    }
  }
}
</script>
