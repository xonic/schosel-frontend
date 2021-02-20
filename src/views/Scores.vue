<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Scores</h1>
      <ul v-if="filteredScores">
        <li v-for="(score, index) in filteredScores">
          <score-preview :score="filteredScores[index]" :challenge-id="index" />
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
  data () {
    return {
      filteredScores: []
    }
  },
  computed: {
    ...mapGetters([
      'scores',
      'loggedInUser',
      'iconPaths'
    ])
  },
  mounted () {

    // Set current user
    // If allUsers hasn't been loaded from server,
    // do an async dispatch first
    if(!this.scores.length || !this.scores[0].users.length) {
      this.$store
      .dispatch('LOAD_USERS')
      .then((response) => {
        console.log('had to load users')

        this.scores.forEach((score, i) => {

          this.filteredScores.push(
            {
              ...this.scores[i],
              users: [

                this.scores[i].users.find(user => user.scores[i].rank === this.loggedInUser.scores[i].rank - 1),
                this.loggedInUser,
                this.scores[i].users.find(user => user.scores[i].rank === this.loggedInUser.scores[i].rank + 1)
              ]
            }
          )

        })
      })
    }
    // Else it has already loaded and current user
    // still needs to be found and set
    else {
      console.log('users were already loaded')

      this.scores.forEach((score, i) => {

        this.filteredScores.push(
          {
            ...this.scores[i],
            users: [

              this.scores[i].users.find(user => user.scores[i].rank === this.loggedInUser.scores[i].rank - 1),
              this.loggedInUser,
              this.scores[i].users.find(user => user.scores[i].rank === this.loggedInUser.scores[i].rank + 1)
            ]
          }
        )

      })
    }

  },
  methods: {
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    },
    // getScorePreviewForUser(scoreIndex){
    //
    //   let loggedUserRank = this.loggedInUser.scores[scoreIndex].rank
    //
    //
    //
    // },
    getUsersForScore(i) {
      console.log(this.scores)

      // Logged in user is ranked first
      if(this.loggedInUser.scores[i].rank === 1) {

        return this.scores[i].users.filter(user => user.scores[i].rank <= 2)
        // return this.scores[i].users.splice(this.loggedInUser.scores[i].rank + 2)
      }
      // Logged in user is ranked last
      else if (this.loggedInUser.scores[i].rank === this.scores[i].users.length + 1) {

        return this.scores[i].users.filter(user => user.scores[i].rank >= this.scores[i].users.length -1)
      }
      // Logge in user is ranked somewhere in between
      else {

        return this.scores[i].users.filter(user => user.scores[i].rank >= this.loggedInUser.scores[i].rank -1 && user.scores[i].rank <= this.loggedInUser.scores[i].rank +1)
      }
    }
  }
}
</script>
