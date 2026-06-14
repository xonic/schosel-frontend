<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title text--left">Results</h1>

      <div v-if="activeMatches.length" class="admin-results__section">
        <h2 class="h3 text--center admin-results__heading">Live &amp; Upcoming</h2>
        <div v-for="match in activeMatches" :key="match.match_id" class="admin-result">
          <div class="admin-result__row">
            <div class="admin-result__team">
              <flag :iso="match.team1_iso" />
              <span class="admin-result__name">{{ match.team1_name }}</span>
            </div>
            <div class="admin-result__inputs">
              <input class="input admin-result__input" type="number" min="0" v-model.number="results[match.match_id].goals1" @input="scheduleSave(match.match_id)" />
              <span class="admin-result__sep">:</span>
              <input class="input admin-result__input" type="number" min="0" v-model.number="results[match.match_id].goals2" @input="scheduleSave(match.match_id)" />
            </div>
            <div class="admin-result__team admin-result__team--right">
              <flag :iso="match.team2_iso" />
              <span class="admin-result__name">{{ match.team2_name }}</span>
            </div>
          </div>
          <div class="admin-result__footer">
            <label class="admin-result__over-label">
              <input type="checkbox" v-model="results[match.match_id].over" @change="scheduleSave(match.match_id)" class="admin-result__checkbox" />
              Over
            </label>
          </div>
          <div class="bet__status" :class="{ 'bet__status--saving': saving[match.match_id], 'bet__status--saved': saved[match.match_id], 'bet__status--error': error[match.match_id] }">{{ statusText(match.match_id) }}</div>
        </div>
      </div>

      <div v-if="overMatches.length" class="admin-results__section">
        <h2 class="h3 text--center admin-results__heading">Played</h2>
        <div v-for="match in overMatches" :key="match.match_id" class="admin-result">
          <div class="admin-result__row">
            <div class="admin-result__team">
              <flag :iso="match.team1_iso" />
              <span class="admin-result__name">{{ match.team1_name }}</span>
            </div>
            <div class="admin-result__inputs">
              <input class="input admin-result__input" type="number" min="0" v-model.number="results[match.match_id].goals1" @input="scheduleSave(match.match_id)" />
              <span class="admin-result__sep">:</span>
              <input class="input admin-result__input" type="number" min="0" v-model.number="results[match.match_id].goals2" @input="scheduleSave(match.match_id)" />
            </div>
            <div class="admin-result__team admin-result__team--right">
              <flag :iso="match.team2_iso" />
              <span class="admin-result__name">{{ match.team2_name }}</span>
            </div>
          </div>
          <div class="admin-result__footer">
            <label class="admin-result__over-label">
              <input type="checkbox" v-model="results[match.match_id].over" @change="scheduleSave(match.match_id)" class="admin-result__checkbox" />
              Over
            </label>
          </div>
          <div class="bet__status" :class="{ 'bet__status--saving': saving[match.match_id], 'bet__status--saved': saved[match.match_id], 'bet__status--error': error[match.match_id] }">{{ statusText(match.match_id) }}</div>
        </div>
      </div>

      <div v-if="!activeMatches.length && !overMatches.length" class="blankslate">
        <div class="blankslate__text">No matches loaded</div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { HTTP } from '@/http-constants'
import Flag from '@/components/Flag'

export default {
  name: 'admin-results',
  components: { Flag },
  data() {
    return {
      results: {},
      saving: {},
      saved: {},
      error: {},
      timers: {},
      initialized: false
    }
  },
  computed: {
    ...mapGetters(['matches']),
    activeMatches() {
      const live = (this.matches && this.matches.live) || []
      const scheduled = (this.matches && this.matches.scheduled) || []
      return [...live, ...scheduled].sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    overMatches() {
      return ((this.matches && this.matches.over) || [])
        .slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  watch: {
    matches: {
      immediate: true,
      handler() {
        if (!this.initialized) this.initResults()
      }
    }
  },
  methods: {
    initResults() {
      const overIds = new Set(((this.matches && this.matches.over) || []).map(m => m.match_id))
      const allMatches = [
        ...((this.matches && this.matches.live) || []),
        ...((this.matches && this.matches.scheduled) || []),
        ...((this.matches && this.matches.over) || [])
      ]
      allMatches.forEach(m => {
        this.$set(this.results, m.match_id, {
          goals1: m.team1_goals != null ? m.team1_goals : 0,
          goals2: m.team2_goals != null ? m.team2_goals : 0,
          over: overIds.has(m.match_id)
        })
      })
      this.initialized = true
    },
    statusText(matchId) {
      if (this.saving[matchId]) return 'Saving…'
      if (this.saved[matchId]) return 'Saved'
      if (this.error[matchId]) return "Couldn't save, try again"
      return ' '
    },
    scheduleSave(matchId) {
      clearTimeout(this.timers[matchId])
      this.timers[matchId] = setTimeout(() => this.saveResult(matchId), 600)
    },
    saveResult(matchId) {
      const r = this.results[matchId]
      const startTime = Date.now()
      this.$set(this.saving, matchId, true)
      this.$set(this.saved, matchId, false)
      this.$set(this.error, matchId, false)

      HTTP.post(`/admin/outcome/${matchId}`, {
        goalsTeam1: Number(r.goals1),
        goalsTeam2: Number(r.goals2),
        over: r.over
      }).then(() => {
        const elapsed = Date.now() - startTime
        const delay = Math.max(0, 1000 - elapsed)
        setTimeout(() => {
          this.$set(this.saving, matchId, false)
          this.$set(this.saved, matchId, true)
          setTimeout(() => this.$set(this.saved, matchId, false), 3000)
        }, delay)
      }).catch(() => {
        this.$set(this.saving, matchId, false)
        this.$set(this.error, matchId, true)
        setTimeout(() => this.$set(this.error, matchId, false), 3000)
      })
    }
  }
}
</script>
