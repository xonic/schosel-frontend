<template>
  <div class="bet">
    <div class="bet__date">
      {{ matchDate(match.date) }}
    </div>
    <div class="bet__teams">
      <span class="bet__home-team">{{ match.team1_name }}</span>
      <span class="bet__vs"> vs </span>
      <span class="bet__away-team">{{ match.team2_name }}</span>
    </div>

    <div class="bet__form">
      <input :id="match.match_id + '-home'" class="match__input" type="radio" value="1" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)">
      <label class="match__label match__label--radio" :for="match.match_id + '-home'">
        <div class="bet__flag">
          <flag :iso="match.team1_iso" :is-bet="ownBet(match.match_id).bet.outcome === '1'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === '1' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Home</div>
      </label>
      <input class="match__input" type="radio" :id="match.match_id + '-draw'" value="X" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)">
      <label class="match__label match__label--radio" :for="match.match_id + '-draw'">
        <div class="bet__flag">
          <flag :iso="'drw'" :is-bet="ownBet(match.match_id).bet.outcome === 'X'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === 'X' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Draw</div>
      </label>


      <input class="match__input" type="radio" :id="match.match_id + '-away'" value="2" v-model="ownBet(match.match_id).bet.outcome" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)">
      <label class="match__label match__label--radio" :for="match.match_id + '-away'">
        <div class="bet__flag">
          <flag :iso="match.team2_iso" :is-bet="ownBet(match.match_id).bet.outcome === '2'" />
        </div>
        <div :class="ownBet(match.match_id).bet.outcome === '2' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Away</div>
      </label>

      <span v-if="remainingsupertips || ownBet(match.match_id).bet.supertip">
        <input class="match__input" type="checkbox" :id="match.match_id + '-supertip'" v-model="ownBet(match.match_id).bet.supertip" @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)">
        <label class="match__label" :for="match.match_id + '-supertip'">
          <div class="bet__superbet">
            <super-bet :correct="ownBet(match.match_id).bet.supertip" />
          </div>
          <div :class="ownBet(match.match_id).bet.supertip ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Superbet</div>
        </label>
      </span>
    </div>
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
          supertip: null
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'iconPaths',
      'maxSupertips',
      'loggedInUser',
      'status'
    ]),
    remainingsupertips() {
      if(!(this.loggedInUser && this.loggedInUser.visible_supertips)) return this.maxSupertips
      return this.maxSupertips - this.loggedInUser.visible_supertips
    },
  },
  methods: {
    ownBet(match_id) {
      if(!(this.status.user && this.status.user.private_bets)) return this.betNotLoadedFallback
      return this.status.user.private_bets.find(bet => bet.match_id === match_id) || this.betNotLoadedFallback
    },
    matchDate: date => {
      let theDate = new Date(date)
      let dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      let timeOptions = {
        hour: '2-digit',
        minute: '2-digit'
      }
      return theDate.toLocaleString('en-GB', dateOptions) + " - " + theDate.toLocaleTimeString('en-GB', timeOptions)
    },
    postBet(match_id, outcome, supertip) {
      if (!match_id || !outcome) {
        return
      }

      this.$emit("is-saving")
        // this.$ga.event(this.loggedInUser.name, "match_bet", match_id)

      HTTP('/bets/' + match_id, {
          method: "post",
          withCredentials: true,
          data: {
            outcome: outcome,
            supertip: supertip || false
          }
        })
        .then(response => {

          this.$store.dispatch('LOAD_STATUS')
          this.$emit("stopped-saving")
        })
        .catch(e => {
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
