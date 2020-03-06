<template>
  <div class="home">
    <ul v-if="liveMatches.length || playedMatches.length">
      <li v-for="match in liveMatches">
        <result-preview :match="match"></result-preview>
      </li>
      <li v-for="match in recentlyPlayed">
        <result-preview :match="match"></result-preview>
      </li>
    </ul>
    <!-- <rank-chart
      :ranking="rankings"
      :maxRank="allUsers.length"
    ></rank-chart> -->
    <ul class="ranking">
      <li v-for="ranking in rankings" class="ranking__item">
        <div class="ranking__title">{{ ranking.name }}</div>
        <rank-progress-bar
          :rank="ranking.rank"
          :maxRank="allUsers.length"
          :switchLayout="switchLayout"
          class="ranking__progress-bar"
        ></rank-progress-bar>
        <div class="ranking__rank">{{ ranking.rank }}.</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import ResultPreview from '@/components/ResultPreview.vue'
import RankChart from '@/components/RankChart.vue'
import RankProgressBar from '@/components/RankProgressBar.vue'

export default {
  name: 'home',
  data() {
    return {
      rankings: [
        {
          name: "King's Game",
          rank: 1,
          points: 180.4278
        },
        {
          name: "Oldfashioned",
          rank: 2,
          points: 30
        },
        {
          name: "Underdog",
          rank: 39,
          points: 89.3043
        },
        {
          name: "Balanced",
          rank: 87,
          points: 34.2528
        },
        {
          name: "Hidden",
          rank: 23,
        },
      ],
      switchLayout: false
    }
  },
  components: {
    ClipLoader,
    ResultPreview,
    RankChart,
    RankProgressBar
  },
  mounted () {
    let self = this
    // Check media query on resize to determine whether
    // progress bars should be rendered vertically or horizontally
    window.addEventListener('resize', this.resizeListener)
  },
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'loggedInUser',
      'loading',
      'allUsers'
    ]),
    recentlyPlayed () {
      // Sort played matches most recent first
      let recentFirst = this.playedMatches.sort((a,b) => { return a.date < b.date })

      // Depending on the current number of live matches, return 0 - 3 played matches
      let mostRecent = recentFirst.splice(0, 3 - this.liveMatches.length)

      return mostRecent
    }
  },
  methods: {
    resizeListener(e) {
      // NOTE: DO NOT use an arrow function here. It will mess up 'this' reference
      // Check media query on resize to determine whether
      // progress bars should be rendered vertically or horizontally
      this.switchLayout = window.matchMedia("(min-width: 800px)").matches ? true : false
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  }
}
</script>
