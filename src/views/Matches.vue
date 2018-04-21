<template>
  <div class="matches">
    <clip-loader :loading="loading.matches" :color="'#3EABDC'" :size="'64px'">#</clip-loader>
    <div v-if='!loading.status' class='wrapper'>
      <tabs v-if='upcomingMatchDays.length ? (playedMatchDays.length || liveMatches.length) : (playedMatchDays.length && liveMatches.length)'>
        <tab name='Played' v-if='playedMatchDays.length' :selected='true' class="played">
          <div class="wrapper">
            <div class="hero hero--7">
              <h1 class="hero__heading">Played</h1>
              <div class="hero__info">{{ playedMatches.length }} Matches</div>
            </div>
            <div v-for="matchDay in playedMatchDays" class="list">
              <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
              <ul class="list__items">
                <li
                is="match-item"
                v-for="playedMatch in matchDay.matches"
                v-bind="playedMatch"
                class="list__item">
              </li>
            </ul>
          </div>
        </div>
      </tab>

      <tab name='Now Playing' v-if='liveMatches.length' class="live">
        <div class="wrapper">
          <ul class="list__items">
            <li
            is="match-item"
            v-for="liveMatch in liveMatches"
            v-bind="liveMatch">
              </li>
            </ul>
          </div>
        </tab>

        <tab name='Upcoming' v-if='upcomingMatchDays.length' class="upcoming">
          <div class="wrapper">
            <div class="hero hero--9">
              <h1 class="hero__heading">Upcoming</h1>
              <div class="hero__info">{{ upcomingMatches.length }} Matches</div>
            </div>
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
            <div v-for="matchDay in upcomingMatchDays" class="list">
              <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
              <ul class="list__items">
                <li
                  is="match-item"
                  v-for="upcomingMatch in matchDay.matches"
                  v-bind="upcomingMatch"
                  class="list__item">
                </li>
              </ul>
            </div>
          </div>
        </tab>
      </tabs>
      <div v-else>
        <tab name='Played' v-if='playedMatchDays.length' :selected='true'>
          <div class="wrapper">
            <div class="hero hero--7">
              <h1 class="hero__heading">Played</h1>
              <div class="hero__info">{{ playedMatches.length }} Matches</div>
            </div>
            <div v-for="matchDay in playedMatchDays" class="list">
              <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
              <ul class="list__items">
                <li
                  is="match-item"
                  v-for="playedMatch in matchDay.matches"
                  v-bind="playedMatch"
                  class="list__item">
                </li>
              </ul>
            </div>
          </div>
        </tab>
      </div>
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
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'matches',
  computed: {
    ...mapGetters([
      'playedMatches',
      'playedMatchDays',
      'liveMatches',
      'upcomingMatches',
      'upcomingMatchDays',
      'loggedInUser',
      'loading'
    ])
  },
  components: {
    Tabs,
    Tab,
    MatchItem,
    ClipLoader
  },
  methods: {
    matchDate: function(date) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('de-DE', options)
    }
  }
}
</script>
