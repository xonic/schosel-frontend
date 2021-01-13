<template>
  <div class='matches'>
    <tabs v-if='hasUpcomingMatches ? (hasPlayedMatches || hasLiveMatches) : (hasPlayedMatches && hasLiveMatches)'>
      <tab name='Played' v-if='hasPlayedMatches' :selected='true'>
        <h1>Played</h1>
        <ul>
          <li
            is="match-item"
            v-for="playedMatch in playedMatches"
            v-bind="playedMatch">
          </li>
        </ul>
      </tab>

      <tab name='Now Playing' v-if='hasLiveMatches'>
        <h1>Now Playing</h1>
        <ul>
          <li
            is="match-item"
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
            is="match-item"
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
          is="match-item"
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
import MatchItem from '@/components/MatchItem.vue'
import axios from 'axios'

export default {
  name: 'matches',
  components: {
    Tabs,
    Tab,
    MatchItem
  },
  data () {
    return {
      hasPlayedMatches: false,
      hasLiveMatches: true,
      hasUpcomingMatches: true,
      playedMatches: [],
      liveMatches: [
        {
          "match_id": "y",
          "date": "2018-04-23T18:30:00.000Z",
          "status": "live",
          "result": "X",
          "team1_name": "South Georgia and the South Sandwich Islands",
          "team1_iso": "SGS",
          "team1_goals": "1",
          "team2_name": "Burkina Faso",
          "team2_iso": "BFA",
          "team2_goals": "1",
          "stage": "Round of 16",
          "bets": "/matches/4/bets",
          "odds": {
            "1": 13.3,
            "X": 23.2,
            "2": 5.0
          }
        }
      ],
      upcomingMatches: [
        {
            "match_id": "x",
            "date": "2018-07-23T18:30:00.000Z",
            "status": "scheduled",
            "team1_name": "South Georgia and the South Sandwich Islands",
            "team1_iso": "SGS",
            "team2_name": "Burkina Faso",
            "team2_iso": "BFA",
            "stage": "Group Stage",
            "odds": {
              "1": "medium",
              "X": "high",
              "2": "low"
            }
        }
      ],
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
    axios.get('http://localhost:5000/api/v1/matches', {withCredentials: true})
      .then(response => {
        this.acceptMatches(response);
        this.$store.commit('setMatches', response);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>
