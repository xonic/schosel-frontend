<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title" style="margin-bottom: 0">Matches</h1>
      <div class="text--small text--gray-20 text--center">Total: 104</div>
      <div v-if="currentStage" class="text--small text--gray-20 text--center matches__total">Current stage: {{ currentStage }}</div>

      <div class="user-tabs">
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'upcoming' }" @click="setTab('upcoming')">Upcoming<span v-if="futureUnbetMatches && futureUnbetMatches.length" class="nav__badge"></span> <span class="user-tab__count">{{ scheduledMatches ? scheduledMatches.length : 0 }}</span></button>
        <button class="user-tab" :class="{ 'user-tab--active': activeTab === 'played' }" @click="setTab('played')">Played <span class="user-tab__count">{{ overMatches ? overMatches.length : 0 }}</span></button>
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
      activeTab: this.tab || 'upcoming'
    }
  },
  computed: {
    ...mapGetters([
      'liveMatches',
      'overMatches',
      'scheduledMatches',
      'futureUnbetMatches',
      'loggedInUser',
      'avatarUrl'
    ]),
    currentStage() {
      const fmt = s => s === 'group' ? 'Group Stage' : s
      if (this.liveMatches && this.liveMatches.length)
        return fmt(this.liveMatches[0].stage)
      if (this.scheduledMatches && this.scheduledMatches.length)
        return fmt([...this.scheduledMatches].sort((a, b) => new Date(a.date) - new Date(b.date))[0].stage)
      if (this.overMatches && this.overMatches.length)
        return fmt([...this.overMatches].sort((a, b) => new Date(b.date) - new Date(a.date))[0].stage)
      return null
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
    }
  }
}
</script>
