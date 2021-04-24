<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <ul v-if="previews.length">
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
  data () {
    return {
      previews: []
    }
  },
  mounted () {

    if(!this.previews.length) {
      this.$store
      .dispatch('LOAD_USERS')
      .then((response) => {
        this.previews = this.scorePreviews
      })
    }
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
