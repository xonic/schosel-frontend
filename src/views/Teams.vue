<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title text--left">Teams</h1>
      <div v-for="group in groups" :key="group" class="teams-group">
        <h2 class="h3 text--center teams-group__heading">Group {{ group }}</h2>
        <table class="teams-table">
          <thead class="teams-table__head">
            <tr>
              <th class="teams-table__th"></th>
              <th class="teams-table__th">Team</th>
              <th class="teams-table__th teams-table__th--right">Odds</th>
              <th class="teams-table__th teams-table__th--right">Champion bets</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in teamsInGroup(group)" :key="team.team_id" class="teams-table__row" @click="$router.push({ name: 'team', params: { iso: team.short_name } })">
              <td class="teams-table__td teams-table__td--flag">
                <flag :iso="team.short_name" />
              </td>
              <td class="teams-table__td">{{ team.name }}</td>
              <td class="teams-table__td teams-table__td--right">
                <span v-if="team.odds">{{ team.odds.toFixed(2) }}</span>
                <span v-else class="text--gray-20">-</span>
              </td>
              <td class="teams-table__td teams-table__td--right">
                <span v-if="tournamentStarted && championCount(team.team_id)">{{ championCount(team.team_id) }}</span>
                <span v-else class="text--gray-20">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Flag from '@/components/Flag'

export default {
  name: 'teams',
  components: { Flag },
  computed: {
    ...mapGetters([
      'status',
      'allUsers'
    ]),
    groups() {
      return this.status && this.status.groups ? this.status.groups : []
    },
    tournamentStarted() {
      return this.status && !this.status.champion_editable
    },
    championCounts() {
      const counts = {}
      if (!this.allUsers) return counts
      this.allUsers.forEach(user => {
        if (user.champion && user.champion.team_id) {
          counts[user.champion.team_id] = (counts[user.champion.team_id] || 0) + 1
        }
      })
      return counts
    }
  },
  methods: {
    teamsInGroup(group) {
      if (!this.status || !this.status.teams) return []
      return this.status.teams
        .filter(t => t.group === group)
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    championCount(teamId) {
      return this.championCounts[teamId] || 0
    }
  }
}
</script>
