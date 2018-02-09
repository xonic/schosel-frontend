<template>
  <div class='matches'>
    <tabs v-if='hasUpcomingMatches ? (hasPlayedMatches || hasLiveMatches) : (hasPlayedMatches && hasLiveMatches)'>
      <tab name='Played' v-if='hasPlayedMatches' :selected='true'>
        <h1>Played</h1>
        <ul>
          <li
            is="match"
            v-for="playedMatch in playedMatches"
            v-bind="playedMatch">
          </li>
        </ul>
      </tab>

      <tab name='Now Playing' v-if='hasLiveMatches'>
        <h1>Now Playing</h1>
        <ul>
          <li
            is="match"
            v-for="liveMatch in liveMatches"
            v-bind="liveMatch">
          </li>
        </ul>
      </tab>

      <tab name='Upcoming' v-if='hasUpcomingMatches'>
        <h1>Upcoming</h1>
        <div class="legend">
          <div class="">
            Remaining super bets
          </div>
          <div class="">
            Explain how odds work
          </div>
        </div>
        <ul>
          <li
            is="match"
            v-for="upcomingMatch in upcomingMatches"
            v-bind="upcomingMatch">
          </li>
        </ul>
      </tab>
    </tabs>
    <div v-else>
      <h1>Played</h1>
      <ul>
        <li
          is="match"
          v-for="playedMatch in playedMatches"
          v-bind="playedMatch">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Match from '@/components/Match.vue'
import axios from 'axios'

export default {
  name: 'matches',
  components: {
    Tabs,
    Tab,
    Match
  },
  data () {
    return {
      hasPlayedMatches: false,
      hasLiveMatches: false,
      hasUpcomingMatches: false,
      playedMatches: [],
      liveMatches: [],
      upcomingMatches: [],
      matches: []
    }
  },
  methods: {
    acceptMatches(response) {
      console.log(response);
      this.matches = response.data
      this.splitMatchesByStatus()
    },
    splitMatchesByStatus() {

      // Check if we have played/live/upcoming matches
      // and split the matches into separate Arrays
      for (var match in this.matches) {
        if (this.matches[match].status === 'over') {
          this.hasPlayedMatches = true
          this.playedMatches.push(this.matches[match])
        }
        if (this.matches[match].status === 'live') {
          this.hasLiveMatches = true
          this.liveMatches.push(this.matches[match])
        }
        if (this.matches[match].status === 'scheduled') {
          this.hasUpcomingMatches = true
          this.upcomingMatches.push(this.matches[match])
        }
      }
    }
  },
  mounted () {
    // Get all matches from server
    axios.get('https://www.schosel.net/worlds2018/api/v1/matches')
      .then(response => {
        this.acceptMatches(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>
