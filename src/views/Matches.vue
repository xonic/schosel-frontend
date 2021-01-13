<template>
  <div class='matches'>
    <tabs v-if='hasUpcomingMatches ? (hasPlayedMatches || hasLiveMatches) : (hasPlayedMatches && hasLiveMatches)'>
      <tab name='Played' v-if='hasPlayedMatches'>
        <h1>Played</h1>
        <list :items='playedMatches'></list>
      </tab>

      <tab name='Now Playing' :selected='true' v-if='hasLiveMatches'>
        <h1>Now Playing</h1>
        <list :items='liveMatches'></list>
      </tab>

      <tab name='Upcoming' v-if='hasUpcomingMatches'>
        <h1>Upcoming</h1>
        <list :items='upcomingMatches'></list>
      </tab>
    </tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import List from '@/components/List.vue'

export default {
  name: 'matches',
  components: {
    Tabs,
    Tab,
    List
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
