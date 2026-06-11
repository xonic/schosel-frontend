<template>
  <div class="bet">
    <div v-if="match.stage" class="bet__stage">{{ match.stage }}</div>
    <div class="bet__date">
      {{ matchDate(match.date) }}
    </div>
    <div v-if="match.api_data && match.api_data.stadium" class="bet__venue">{{ match.api_data.stadium }}, {{ match.api_data.stadium_city }}, {{ match.api_data.stadium_country }}</div>
    <div class="bet__teams">
      <span class="bet__home-team">{{ match.team1_name }}</span>
      <span class="bet__vs"> vs </span>
      <span class="bet__away-team">{{ match.team2_name }}</span>
    </div>

    <div class="bet__form">
      <input :id="match.match_id + '-home'" class="match__input" type="radio" value="1" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.superbet)">
      <label class="match__label match__label--radio" :for="match.match_id + '-home'">
        <div class="bet__flag">
          <flag :iso="match.team1_iso" :is-bet="ownBet(match.match_id).bet.outcome === '1'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === '1' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">{{ match.team1_iso.toUpperCase() }}</div>
      </label>
      <input class="match__input" type="radio" :id="match.match_id + '-draw'" value="X" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.superbet)">
      <label class="match__label match__label--radio" :for="match.match_id + '-draw'">
        <div class="bet__flag">
          <flag :iso="'drw'" :is-bet="ownBet(match.match_id).bet.outcome === 'X'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === 'X' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Draw</div>
      </label>


      <input class="match__input" type="radio" :id="match.match_id + '-away'" value="2" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.superbet)">
      <label class="match__label match__label--radio" :for="match.match_id + '-away'">
        <div class="bet__flag">
          <flag :iso="match.team2_iso" :is-bet="ownBet(match.match_id).bet.outcome === '2'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === '2' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">{{ match.team2_iso.toUpperCase() }}</div>
      </label>

      <span v-if="loggedInUser" :class="(maxSuperbets <= loggedInUser.superbets_placed) && !ownBet(match.match_id).bet.superbet ? 'superbet--disabled' : ''">
        <input class="match__input" type="checkbox" :id="match.match_id + '-superbet'" v-model="ownBet(match.match_id).bet.superbet" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.superbet)"
        :disabled="(maxSuperbets <= loggedInUser.superbets_placed) && !ownBet(match.match_id).bet.superbet">
        <label class="match__label" :for="match.match_id + '-superbet'">
          <div class="bet__superbet">
            <super-bet :correct="ownBet(match.match_id).bet.superbet" />
          </div>
          <div :class="ownBet(match.match_id).bet.superbet ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Superbet</div>
        </label>
      </span>
    </div>
    <div class="bet__status" :class="{ 'bet__status--saved': saved, 'bet__status--error': saveError }">{{ statusText }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { HTTP } from '../http-constants'
import Flag from '@/components/Flag'
import SuperBet from '@/components/SuperBet'

export default {
  name: 'bet',
  components: {
    Flag,
    SuperBet
  },
  props: {
    match: Object
  },
  data() {
    return {
      betNotLoadedFallback: {
        bet: {
          outcome: null,
          superbet: null
        }
      },
      saving: false,
      saved: false,
      saveError: false
    }
  },
  computed: {
    ...mapGetters([
      'iconPaths',
      'maxSuperbets',
      'loggedInUser',
      'status'
    ]),
    remainingsuperbets() {
      if(!(this.loggedInUser && this.loggedInUser.visible_superbets)) return this.maxSuperbets
      return this.maxSuperbets - this.loggedInUser.visible_superbets
    },
    statusText() {
      if (this.saving) return 'Saving…'
      if (this.saved) return 'Saved'
      if (this.saveError) return "Couldn’t save, try again"
      return ' '
    }
  },
  methods: {
    ownBet(match_id) {
      if(!(this.status.user && this.status.user.private_bets)) return this.betNotLoadedFallback
      return this.status.user.private_bets.find(bet => bet.match_id === match_id) || this.betNotLoadedFallback
    },
    matchDate: date => {
      let theDate = new Date(date)
      let dateOptions = {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      }
      let timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return theDate.toLocaleString('en-GB', dateOptions) + " - " + theDate.toLocaleTimeString('en-GB', timeOptions)
    },
    postBet(match_id, outcome, superbet) {
      if (!match_id || !outcome) {
        return
      }

      this.saving = true
      this.saved = false
      this.saveError = false
      const saveStart = Date.now()
      this.$emit("is-saving")
      if (this.$ga) this.$ga.event(this.loggedInUser.name, "match_bet", match_id)

      HTTP('/bets/' + match_id, {
          method: "post",
          withCredentials: true,
          data: {
            outcome: outcome,
            superbet: superbet || false
          }
        })
        .then(response => {
          const minDelay = Math.max(0, 1000 - (Date.now() - saveStart))
          setTimeout(() => {
            this.saving = false
            this.saved = true
            setTimeout(() => { this.saved = false }, 3000)
            this.$store.dispatch('LOAD_STATUS')
            this.$emit("stopped-saving")
          }, minDelay)
        })
        .catch(e => {
          this.saving = false
          this.saveError = true
          setTimeout(() => { this.saveError = false }, 3000)
          this.$store.dispatch('LOAD_STATUS')
          console.log('an error happened')
          this.$emit("is-error")
        })
    },
    getURL(index) {
      return require(`../assets/img/icons/${this.iconPaths[index]}`)
    }
  }
}
</script>
