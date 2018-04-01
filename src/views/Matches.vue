<template>
  <div class='matches'>
    <tabs v-if='upcomingMatchDays.length ? (playedMatchDays.length || liveMatches.length) : (playedMatchDays.length && liveMatches.length)'>
      <tab name='Played' v-if='playedMatchDays.length' :selected='true'>
        <h1>Played</h1>
        <div v-for="matchDay in playedMatchDays">
          <h4>{{ matchDate(matchDay.date) }}</h4>
          <ul>
            <li
              is="match-item"
              v-for="playedMatch in matchDay.matches"
              v-bind="playedMatch">
            </li>
          </ul>
        </div>
      </tab>

      <tab name='Now Playing' v-if='liveMatches.length'>
        <h1>Now Playing</h1>
        <ul>
          <li
            is="match-item"
            v-for="liveMatch in liveMatches"
            v-bind="liveMatch">
          </li>
        </ul>
      </tab>

      <tab name='Upcoming' v-if='upcomingMatchDays.length'>
        <h1>Upcoming</h1>
        <div v-if="loggedInUser">
          <select v-model="loggedInUser.champion_id">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <span>Selected: {{ loggedInUser.champion_id }}</span>
        </div>
        <div class="legend">
          <div v-if="loggedInUser">
            Remaining super bets: {{ 4 - loggedInUser.visible_supertips }}
          </div>
          <div class="">
            Explain how odds work
          </div>
        </div>
        <div v-for="matchDay in upcomingMatchDays">
          <h4>{{ matchDate(matchDay.date) }}</h4>
          <ul>
            <li
              is="match-item"
              v-for="upcomingMatch in matchDay.matches"
              v-bind="upcomingMatch">
            </li>
          </ul>
        </div>
      </tab>
    </tabs>
    <div v-else>
      <tab name='Played' v-if='playedMatchDays.length' :selected='true'>
        <h1>Played</h1>
        <div v-for="matchDay in playedMatchDays">
          <h4>{{ matchDate(matchDay.date) }}</h4>
          <ul>
            <li
              is="match-item"
              v-for="playedMatch in matchDay.matches"
              v-bind="playedMatch">
            </li>
          </ul>
        </div>
      </tab>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import MatchItem from '@/components/MatchItem.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'playedMatchDays',
      'liveMatches',
      'upcomingMatches',
      'upcomingMatchDays',
      'loggedInUser'
    ])
  },
  components: {
    Tabs,
    Tab,
    MatchItem
  },
  methods: {
    matchDate: function(date) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('de-DE', options)
    }
  }
}
</script>
