<template>
  <main>
    <div class="wrapper">
      <div v-if="team" class="team-header">
        <flag :iso="team.short_name" size="xlarge" class="team-header__flag" />
        <h1 class="h2 text--center team-header__name">{{ team.name }}</h1>
        <div class="text--small text--gray-20 text--center">Group {{ team.group }}</div>
      </div>

      <div v-if="liveTeamMatches.length" class="team-section">
        <h2 class="h3 text--center user__section-heading">Live</h2>
        <ul>
          <li v-for="match in liveTeamMatches" :key="match.match_id">
            <match-preview :match="match" :bet="match.private_bet" />
          </li>
        </ul>
      </div>

      <div v-if="scheduledTeamMatches.length" class="team-section">
        <h2 class="h3 text--center user__section-heading">Upcoming</h2>
        <ul>
          <li v-for="match in scheduledTeamMatches" :key="match.match_id">
            <bet :match="match" />
          </li>
        </ul>
      </div>

      <div v-if="overTeamMatches.length" class="team-section">
        <h2 class="h3 text--center user__section-heading">Played</h2>
        <ul>
          <li v-for="match in overTeamMatches" :key="match.match_id">
            <match-preview :match="match" :bet="match.private_bet" />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Flag from '@/components/Flag'
import Bet from '@/components/Bet'
import MatchPreview from '@/components/MatchPreview'

export default {
  name: 'team',
  components: { Flag, Bet, MatchPreview },
  props: { iso: String },
  computed: {
    ...mapGetters(['status', 'matches']),
    team() {
      if (!this.status || !this.status.teams) return null
      return this.status.teams.find(t => t.short_name === this.iso)
    },
    liveTeamMatches() {
      return this.filterMatches(this.matches && this.matches.live)
    },
    scheduledTeamMatches() {
      return this.filterMatches(this.matches && this.matches.scheduled)
    },
    overTeamMatches() {
      return this.filterMatches(this.matches && this.matches.over)
    }
  },
  methods: {
    filterMatches(list) {
      if (!list) return []
      return list.filter(m => m.team1_iso === this.iso || m.team2_iso === this.iso)
    }
  }
}
</script>
