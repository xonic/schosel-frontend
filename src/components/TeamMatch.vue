<template>
  <router-link :to="{ name: 'match', params: { id: String(match.match_id) } }" class="team-match">
    <div class="team-match__meta">
      <span v-if="match.stage" class="team-match__stage">{{ matchGroup(match) }}</span>
      <span class="team-match__date">{{ matchDate(match.date) }}</span>
    </div>
    <div class="team-match__row">
      <div class="team-match__team">
        <flag :iso="match.team1_iso" />
        <span class="team-match__name">{{ match.team1_name }}</span>
      </div>
      <div class="team-match__score">
        <span v-if="match.status === 'over' || match.status === 'live'">
          {{ match.team1_goals }} : {{ match.team2_goals }}
        </span>
        <span v-else class="text--gray-20">vs</span>
      </div>
      <div class="team-match__team team-match__team--right">
        <span class="team-match__name">{{ match.team2_name }}</span>
        <flag :iso="match.team2_iso" />
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
import Flag from '@/components/Flag'

export default {
  name: 'team-match',
  components: { Flag },
  props: { match: Object },
  computed: {
    ...mapGetters(['status'])
  },
  methods: {
    matchGroup(match) {
      const titleCase = s => s.replace(/\b\w/g, c => c.toUpperCase())
      const teams = this.status && this.status.teams
      if (!teams) return titleCase(match.stage)
      const team = teams.find(t => t.short_name === match.team1_iso)
      if (team && team.group) {
        const team2 = teams.find(t => t.short_name === match.team2_iso)
        if (team2 && team2.group === team.group) return 'Group ' + team.group
      }
      return titleCase(match.stage)
    },
    matchDate(date) {
      const d = new Date(date)
      return d.toLocaleString('en-GB', { weekday: 'short', month: 'numeric', day: 'numeric' })
        + ' - ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>
