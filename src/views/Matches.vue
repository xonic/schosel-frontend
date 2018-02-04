<template>
  <div class='matches'>
    <tabs v-if='hasUpcomingMatches ? (hasPlayedMatches || hasLiveMatches) : (hasPlayedMatches && hasLiveMatches)'>
      <tab name='Played' v-if='hasPlayedMatches'>
        <h1>Played</h1>
        <ul>
          <li
            is="match"
            v-for="playedMatch in playedMatches"
            v-bind="playedMatch">
          </li>
        </ul>
      </tab>

      <tab name='Now Playing' :selected='true' v-if='hasLiveMatches'>
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
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Match from '@/components/Match.vue'

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
      matches: [
        {
          'url': '/matches/3',
          'date': '2018-07-23T18:30:00.000Z',
          'status': 'scheduled',
          'team1_name': 'South Georgia and the South Sandwich Islands',
          'team1_iso': 'SGS',
          'team2_name': 'Burkina Faso',
          'team2_iso': 'BFA',
          'stage': 'Group Stage',
          'odds': ['medium', 'high', 'low']
        },
        {
          'url': '/matches/4',
          'date': '2018-02-02T18:30:00.000Z',
          'status': 'live',
          'result': 'X',
          'team1_name': 'South Georgia and the South Sandwich Islands',
          'team1_iso': 'SGS',
          'team1_goals': 1,
          'team2_name': 'Burkina Faso',
          'team2_iso': 'BFA',
          'team2_goals': 1,
          'stage': 'Round of 16',
          'bets': '/matches/4/bets',
          'odds': [13.3, 23.2, 5.0]
        },
        {
          'url': '/matches/7',
          'date': '2018-01-23T18:30:00.000Z',
          'status': 'over',
          'result': '2',
          'team1_name': 'South Georgia and the South Sandwich Islands',
          'team1_iso': 'SGS',
          'team1_goals': 1,
          'team2_name': 'Burkina Faso',
          'team2_iso': 'BFA',
          'team2_goals': 4,
          'stage': 'Final',
          'bets': '/matches/7/bets',
          'odds': [13.3, 23.2, 5.0]
        },
        {
          'url': '/matches/1',
          'date': '2018-07-23T18:30:00.000Z',
          'status': 'scheduled',
          'team1_name': 'Russia',
          'team1_iso': 'RUS',
          'team2_name': 'England',
          'team2_iso': 'ENG',
          'stage': 'Group Stage',
          'odds': ['medium', 'high', 'low']
        },
        {
          'url': '/matches/2',
          'date': '2018-02-02T18:30:00.000Z',
          'status': 'live',
          'result': 'X',
          'team1_name': 'Austria',
          'team1_iso': 'AUT',
          'team1_goals': 1,
          'team2_name': 'France',
          'team2_iso': 'FRA',
          'team2_goals': 0,
          'stage': 'Round of 16',
          'bets': '/matches/2/bets',
          'odds': [13.3, 23.2, 5.0]
        },
        {
          'url': '/matches/5',
          'date': '2018-01-23T18:30:00.000Z',
          'status': 'over',
          'result': '2',
          'team1_name': 'Germany',
          'team1_iso': 'DE',
          'team1_goals': 3,
          'team2_name': 'Spain',
          'team2_iso': 'ESP',
          'team2_goals': 3,
          'stage': 'Final',
          'bets': '/matches/5/bets',
          'odds': [13.3, 23.2, 5.0]
        }
      ]
    }
  },
  mounted () {
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
}
</script>
