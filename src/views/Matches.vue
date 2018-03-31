<template>
  <div class='matches'>
    <tabs v-if='upcomingMatches.length ? (playedMatches.length || liveMatches.length) : (playedMatches.length && liveMatches.length)'>
      <tab name='Played' v-if='playedMatches.length' :selected='true'>
        <h1>Played</h1>
        <ul>
          <li
            is="match-item"
            v-for="playedMatch in playedMatches"
            v-bind="playedMatch">
          </li>
        </ul>
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

      <tab name='Upcoming' v-if='upcomingMatches.length'>
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
import { mapGetters } from 'vuex'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'liveMatches',
      'upcomingMatches'
    ])
  },
  components: {
    Tabs,
    Tab,
    MatchItem
  }
}
</script>
