<template>
  <main>
    <div class="wrapper">
      <div v-if="team" class="team-header">
        <flag :iso="team.short_name" size="xlarge" class="team-header__flag" />
        <h1 class="h2 text--center team-header__name">{{ team.name }}</h1>
        <div class="text--small text--gray-20 text--center">Group {{ team.group }}</div>
      </div>

      <div class="user-tabs">
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'matches' }" @click="setTab('matches')">Matches</button>
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'champion-bets' }" @click="setTab('champion-bets')">Champion Bets</button>
      </div>

      <div v-if="activeTab === 'matches'">
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

      <div v-if="activeTab === 'champion-bets'">
        <div v-if="team" class="team-champion-odds">
          <div class="text--small text--gray-20 text--center">Odds</div>
          <div class="h2 text--center">{{ team.odds ? team.odds.toFixed(2) : '-' }}</div>
        </div>

        <ul v-if="championBettors.length" class="team-champion-bettors">
          <li v-for="user in championBettors" :key="user.user_id">
            <router-link :to="{ name: 'user', params: { id: String(user.user_id) } }" class="team-champion-bettor">
              <avatar :src="avatarUrl + user.user_id" class="team-champion-bettor__avatar" />
              <span class="team-champion-bettor__name">{{ user.name }}</span>
            </router-link>
          </li>
        </ul>
        <div v-else class="blankslate">
          <div class="blankslate__text">No champion bets placed on this team</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Flag from '@/components/Flag'
import Bet from '@/components/Bet'
import MatchPreview from '@/components/MatchPreview'
import Avatar from '@/components/Avatar'

export default {
  name: 'team',
  components: { Flag, Bet, MatchPreview, Avatar },
  props: { iso: String, tab: String },
  data() {
    return {
      activeTab: this.tab || 'matches'
    }
  },
  computed: {
    ...mapGetters(['status', 'matches', 'allUsers', 'avatarUrl']),
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
    },
    championBettors() {
      if (!this.team || !this.allUsers) return []
      return this.allUsers.filter(u => u.champion && u.champion.team_id === this.team.team_id)
    }
  },
  methods: {
    filterMatches(list) {
      if (!list) return []
      return list.filter(m => m.team1_iso === this.iso || m.team2_iso === this.iso)
    },
    setTab(tab) {
      this.activeTab = tab
      this.$router.replace({ name: 'team', params: { iso: this.iso, tab } })
    }
  }
}
</script>
