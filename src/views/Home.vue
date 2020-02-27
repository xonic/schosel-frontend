<template>
  <div class="home">
    <ul v-if="liveMatches.length">
      <li v-for="match in liveMatches">
        {{ match.team1_name }} {{ match.team1_goals }} : {{ match.team2_goals }} {{ match.team2_name }}
      </li>
    </ul>
    <div v-else-if="playedMatches.length">

      played match
    </div>
    <div class="scores">
      <ul v-if="getRanks" style="display: flex;">
        <li v-for="rank in getRanks">
          <div style="writing-mode: vertical-lr; transform: rotateZ(-150deg); line-height: 24px; margin-left:12px;">{{ rank.name }}</div>
          <svg viewBox="0 0 24 200" style="width: 24px;">
            <mask id="roundedBar">
              <rect rx="12" width="24" height="200" fill="#fff" />
            </mask>

            <rect width="24" height="200" fill="#bada55" mask="url(#roundedBar)" />
            <rect width="24" :height="rank.relativeRank * 2" fill="#444" mask="url(#roundedBar)" />
          </svg>
          {{ rank.rank }}.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'loggedInUser',
      'loading',
      'allUsers'
    ]),
    getRanks () {
      const user = this.allUsers.find(user => user.user_id === this.loggedInUser.user_id)
      const achievements = user && user.achievements ? user.achievements : {}

      for (const [name, achievement] of Object.entries(achievements)) {
        // Store the name of the achievement
        achievement['name'] = name[0].toUpperCase() + name.slice(1).toLowerCase()
        // Calculate relative rank e. g. 5th of 20 players === 5 / 20 === 0,25
        achievement['relativeRank'] = achievement.rank - 1 / this.allUsers.length * 100 // * 100 to get full percentages, rank - 1 to normalize to 0
      }

      return achievements
    },
  },
  components: {
    ClipLoader
  },
}
</script>
