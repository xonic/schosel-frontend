<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <div v-if="allUsers && allUsers.length" class="text--center text--small text--gray-20">Total pot: {{ (allUsers.length * 10).toFixed(2) }} &euro;</div>
      <div v-if="allUsers && allUsers.length" class="main__title text--small text--gray-20">Pot per score: {{ (allUsers.length * 10 / 5).toFixed(2) }} &euro;</div>
      <ul v-if="scorePreviews.length">
        <li v-for="(score, index) in scorePreviews">
          <score-preview :score="scorePreviews[index]" :challenge-id="index" />
        </li>
      </ul>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">Loading...</div>
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
      'allUsers',
      'loggedInUser',
      'avatarUrl'
    ])
  }
}
</script>
