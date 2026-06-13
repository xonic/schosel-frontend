<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Matches</h1>

      <div v-if="status && status.user" class="champion-bet-section">
        <h2 class="h3 main__subtitle">Champion Bet</h2>
        <div class="champion-bet">
          <select
            id="champion-bet"
            class="select"
            v-model="status.user.champion.team_id"
            @change="postChampion()"
            v-if="status.champion_editable"
          >
            <option disabled value="def">Select...</option>
            <option v-for="team in status.teams" :value="team.team_id">{{ team.name }}</option>
          </select>
          <div v-else>
            <div v-if="status.user.champion" class="champion-bet__display">
              <router-link v-if="status.user.champion.short_name" :to="{ name: 'team', params: { iso: status.user.champion.short_name } }" class="champion-bet__team-link">
                <flag :iso="status.user.champion.short_name" size="large" />
                <div>{{ championBet() }}</div>
              </router-link>
              <div v-else>{{ championBet() }}</div>
            </div>
          </div>
          <div class="bet__status" :class="{ 'bet__status--saved': championSaved, 'bet__status--error': championSaveError }">{{ championStatusText }}</div>
        </div>
      </div>

      <div class="user-tabs">
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'upcoming' }" @click="setTab('upcoming')">Upcoming</button>
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'played' }" @click="setTab('played')">Played</button>
      </div>

      <div v-if="activeTab === 'upcoming'">
        <available-super-bets />
        <ul v-if="scheduledMatches && scheduledMatches.length">
          <li v-for="match in scheduledMatches" :key="match.match_id">
            <bet :match="match" />
          </li>
        </ul>
        <div v-else class="blankslate">
          <div class="blankslate__avatar">
            <avatar :src="avatarUrl + getRandomSeed()" size="xlarge" />
          </div>
          <div class="blankslate__text">No matches left to bet</div>
        </div>
      </div>

      <div v-if="activeTab === 'played'">
        <div v-if="(liveMatches && liveMatches.length) || (overMatches && overMatches.length)">
          <ul>
            <li v-for="match in liveMatches" :key="match.match_id">
              <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
            </li>
            <li v-for="match in overMatches" :key="match.match_id">
              <match-preview v-if="betForMatch(match)" :match="match" :bet="betForMatch(match)" />
            </li>
          </ul>
        </div>
        <div v-else class="blankslate">
          <div class="blankslate__avatar">
            <avatar :src="avatarUrl + getRandomSeed()" size="xlarge" />
          </div>
          <div class="blankslate__text">No matches played</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { HTTP } from '../http-constants'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import MatchPreview from '@/components/MatchPreview'
import Bet from '@/components/Bet'
import Flag from '@/components/Flag'
import SuperBet from '@/components/SuperBet'
import AvailableSuperBets from '@/components/AvailableSuperBets'
import Avatar from '@/components/Avatar'
import { getRandomSeed } from '@/utils'

export default {
  name: 'matches',
  components: {
    ClipLoader,
    MatchPreview,
    Bet,
    Flag,
    SuperBet,
    AvailableSuperBets,
    Avatar
  },
  props: {
    tab: String
  },
  data() {
    return {
      activeTab: this.tab || 'upcoming',
      championSaving: false,
      championSaved: false,
      championSaveError: false
    }
  },
  computed: {
    ...mapGetters([
      'liveMatches',
      'overMatches',
      'scheduledMatches',
      'loggedInUser',
      'status',
      'avatarUrl'
    ]),
    championStatusText() {
      if (this.championSaving) return 'Saving…'
      if (this.championSaved) return 'Saved'
      if (this.championSaveError) return "Couldn't save, try again"
      return ' '
    }
  },
  methods: {
    getRandomSeed,
    setTab(tab) {
      this.activeTab = tab
      this.$router.replace({ name: 'matches', params: { tab } })
    },
    betForMatch(match) {
      if (this.loggedInUser && this.loggedInUser.private_bets) {
        const userBet = this.loggedInUser.private_bets.find(bet => bet.match_id === match.match_id)
        return userBet && userBet.bet ? userBet.bet : null
      }
    },
    championBet() {
      return this.loggedInUser.champion && this.loggedInUser.champion.name || '-'
    },
    postChampion() {
      this.championSaving = true
      this.championSaved = false
      this.championSaveError = false
      const saveStart = Date.now()

      HTTP('/champion', {
        method: 'post',
        withCredentials: true,
        data: { champion_id: this.status.user.champion.team_id }
      })
        .then(() => {
          const minDelay = Math.max(0, 1000 - (Date.now() - saveStart))
          setTimeout(() => {
            this.championSaving = false
            this.championSaved = true
            setTimeout(() => { this.championSaved = false }, 3000)
          }, minDelay)
        })
        .catch(() => {
          const minDelay = Math.max(0, 1000 - (Date.now() - saveStart))
          setTimeout(() => {
            this.championSaving = false
            this.championSaveError = true
            setTimeout(() => { this.championSaveError = false }, 3000)
          }, minDelay)
        })
    }
  }
}
</script>
