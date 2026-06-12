<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title text--left">Teams</h1>

      <div class="user-tabs">
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'odds' }" @click="setTab('odds')">Odds</button>
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'standings' }" @click="setTab('standings')">Standings</button>
      </div>

      <div v-if="activeTab === 'standings'" key="standings">
        <div v-for="group in groups" :key="group" class="teams-group">
          <h2 class="h3 text--center teams-group__heading">Group {{ group }}</h2>
          <table class="teams-table">
            <thead class="teams-table__head">
              <tr>
                <th class="teams-table__th"></th>
                <th class="teams-table__th">Team</th>
                <th class="teams-table__th teams-table__th--right">P</th>
                <th class="teams-table__th teams-table__th--right">W</th>
                <th class="teams-table__th teams-table__th--right">D</th>
                <th class="teams-table__th teams-table__th--right">L</th>
                <th class="teams-table__th teams-table__th--right">GD</th>
                <th class="teams-table__th teams-table__th--right teams-table__th--pts">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in groupStandings(group)"
                :key="row.team.team_id"
                class="teams-table__row"
                @click="$router.push({ name: 'team', params: { iso: row.team.short_name } })"
              >
                <td class="teams-table__td teams-table__td--flag">
                  <flag :iso="row.team.short_name" />
                </td>
                <td class="teams-table__td">{{ row.team.name }}</td>
                <td class="teams-table__td teams-table__td--right">{{ row.p }}</td>
                <td class="teams-table__td teams-table__td--right">{{ row.w }}</td>
                <td class="teams-table__td teams-table__td--right">{{ row.d }}</td>
                <td class="teams-table__td teams-table__td--right">{{ row.l }}</td>
                <td class="teams-table__td teams-table__td--right">{{ row.gd > 0 ? '+' + row.gd : row.gd }}</td>
                <td class="teams-table__td teams-table__td--right teams-table__td--pts">{{ row.pts }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'odds'" key="odds">
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
              <tr
                v-for="row in groupStandings(group)"
                :key="row.team.team_id"
                class="teams-table__row"
                @click="$router.push({ name: 'team', params: { iso: row.team.short_name } })"
              >
                <td class="teams-table__td teams-table__td--flag">
                  <flag :iso="row.team.short_name" />
                </td>
                <td class="teams-table__td">{{ row.team.name }}</td>
                <td class="teams-table__td teams-table__td--right">
                  <span v-if="row.team.odds">{{ row.team.odds.toFixed(2) }}</span>
                  <span v-else class="text--gray-20">-</span>
                </td>
                <td class="teams-table__td teams-table__td--right">
                  <span v-if="tournamentStarted && championCount(row.team.team_id)">{{ championCount(row.team.team_id) }}</span>
                  <span v-else class="text--gray-20">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  props: {
    tab: String
  },
  data() {
    return {
      activeTab: this.tab || 'odds'
    }
  },
  computed: {
    ...mapGetters(['status', 'allUsers', 'matches']),
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
    },
    setTab(tab) {
      this.activeTab = tab
      this.$router.replace({ name: 'teams', params: { tab } })
    },
    groupStandings(group) {
      const teams = this.status && this.status.teams
      if (!teams) return []

      const groupTeams = teams.filter(t => t.group === group)
      const rows = {}
      groupTeams.forEach(t => {
        rows[t.short_name] = { team: t, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }
      })

      const allMatches = [
        ...((this.matches && this.matches.over) || []),
        ...((this.matches && this.matches.live) || [])
      ]

      allMatches.forEach(m => {
        const r1 = rows[m.team1_iso]
        const r2 = rows[m.team2_iso]
        if (!r1 || !r2) return

        const g1 = m.team1_goals || 0
        const g2 = m.team2_goals || 0

        r1.p++; r2.p++
        r1.gf += g1; r1.ga += g2
        r2.gf += g2; r2.ga += g1

        if (g1 > g2) { r1.w++; r2.l++ }
        else if (g1 < g2) { r2.w++; r1.l++ }
        else { r1.d++; r2.d++ }
      })

      return Object.values(rows)
        .map(r => ({ ...r, gd: r.gf - r.ga, pts: r.w * 3 + r.d }))
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
    }
  }
}
</script>
