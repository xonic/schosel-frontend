<template>
  <div class="home">
    <ul v-if="liveMatches.length || playedMatches.length">
      <li v-for="match in liveMatches">
        <result-preview :match="match" />
      </li>
      <li v-for="match in recentlyPlayed">
        <result-preview :match="match" />
      </li>
    </ul>
    <ul class="ranking">
      <li v-for="ranking in rankings" class="ranking__item">
        <router-link :to="{ name: ranking.routeName }">
          <div class="ranking__bar">
            <div class="ranking__title">{{ ranking.name }}</div>
            <rank-progress-bar
              :rank="ranking.rank"
              :maxRank="allUsers.length"
              :switchLayout="switchLayout"
              class="ranking__progress-bar"
            />
          </div>
          <div class="ranking__rank">{{ ranking.rank }}.</div>
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import ResultPreview from '@/components/ResultPreview'
import RankProgressBar from '@/components/RankProgressBar'

export default {
  name: 'home',
  data() {
    return {
      rankings: [
        {
          name: "King's Game",
          routeName: 'kingsgame',
          rank: 1,
          points: 180.4278
        },
        {
          name: "Oldfashioned",
          routeName: 'oldfashioned',
          rank: 2,
          points: 30
        },
        {
          name: "Underdog",
          routeName: 'underdog',
          rank: 39,
          points: 89.3043
        },
        {
          name: "Balanced",
          routeName: 'balanced',
          rank: 87,
          points: 34.2528
        },
        {
          name: "Hidden",
          routeName: 'hidden',
          rank: 23,
        },
      ],
      switchLayout: false
    }
  },
  components: {
    ClipLoader,
    ResultPreview,
    RankProgressBar,
  },
  mounted () {
    let self = this
    // Check media query on resize to determine whether
    // progress bars should be rendered vertically or horizontally
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener()
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
      let recentFirst = this.playedMatches.sort((a,b) => { return a.date < b.date }).slice()

      // Depending on the current number of live matches, return 0 - 3 played matches
      const mostRecent = recentFirst.splice(0, 3 - this.liveMatches.length)

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
