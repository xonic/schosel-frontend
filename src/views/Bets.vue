<template>
  <div class="bets">
    <h1>Bets</h1>
    <div class="champion-bet" v-if="upcomingMatches.length">
      <label for="champion-bet" class="label">Champion bet</label>
      <select id="champion-bet" class="select" v-model="status.user.champion.team_id" @change="postChampion()" v-if="champion_editable">
        <option disabled value="">Please select one</option>
        <option v-for="team in status.teams" v-bind:value="team.team_id">{{ team.name }}</option>
      </select>
      <div v-else>{{ championBet() }}</div>
    </div>
    <div v-if="upcomingMatches.length">
      <div class="label">{{ remainingSuperbets }} <span v-if="remainingSuperbets === 1">Superbet</span><span v-else>Superbets</span> remaining</div>
      <transition-group name="star" appear>
        <super-bet v-bind:key="i" v-for="i in remainingSuperbets" :correct="true" />
      </transition-group>
    </div>
    <ul v-if="upcomingMatches.length">
      <li v-for="match in upcomingMatches">
        <input
          :id="match.match_id + '-home'"
          class="match__input"
          type="radio"
          value="1"
          v-model="ownBet(match.match_id).outcome"
          @change="postBet(match.match_id, ownBet(match.match_id).outcome, ownBet(match.match_id).supertip)"
        >
        <label
          class="match__label match__label--radio"
          :for="match.match_id + '-home'"
        >
          {{ match.team1_name }}
        </label>


        <input
          class="match__input"
          type="radio"
          :id="match.match_id + '-draw'"
          value="X"
          v-model="ownBet(match.match_id).outcome"
          @change="postBet(match.match_id, ownBet(match.match_id).outcome, ownBet(match.match_id).supertip)"
        >
        <label
          class="match__label match__label--radio"
          :for="match.match_id + '-draw'"
        >
          Draw
        </label>


        <input
          class="match__input"
          type="radio"
          :id="match.match_id + '-away'"
          value="2"
          v-model="ownBet(match.match_id).outcome"
          @change="postBet(match.match_id, ownBet(match.match_id).outcome, ownBet(match.match_id).supertip)"
        >
        <label
          class="match__label match__label--radio"
          :for="match.match_id + '-away'"
        >
          {{ match.team2_name }}
        </label>

        <span v-if="remainingSuperbets || ownBet(match.match_id).supertip">
          <input
            class="match__input"
            type="checkbox"
            :id="match.match_id + '-supertip'"
            v-model="ownBet(match.match_id).supertip"
            @change="postBet(match.match_id, ownBet(match.match_id).outcome, ownBet(match.match_id).supertip)"
          >
          <label
            class="match__label"
            :for="match.match_id + '-supertip'"
          >
            <super-bet :correct="ownBet(match.match_id).supertip" />
          </label>
        </span>
      </li>
    </ul>
    <div v-else>
      Sorry, no more matches to bet on.
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    mapGetters
  }
  from 'vuex'
  import {
    HTTP
  }
  from '../http-constants'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import SuperBet from '@/components/SuperBet'

  export default {
    name: 'bets',
    components: {
      ClipLoader,
      SuperBet,
    },
    data() {
      return {
        champion_editable: true, // TODO: remove mock data
        maxSuperbets: 8,
        isSaving: false,
        isError: false,
        saveSuccess: false,
        saveError: false,
        currentHeader: ""
      }
    },
    computed: {
      ...mapGetters([
          'upcomingMatches',
          // 'loading',
          'loggedInUser',
          'status',
          'ownBets'
        ]),
        remainingSuperbets() {
          return this.maxSuperbets - this.loggedInUser.visible_supertips
        },
    },
    mounted() {},
    methods: {
      ownBet(match_id) {
          return this.ownBets.find(bet => bet.match.match_id === match_id)
        },
        matchDate: date => {
          var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          return new Date(date).toLocaleString('en-GB', options)
        },
        postChampion() {
          this.isSaving = true
            // this.$ga.event(this.loggedInUser.name, "champion_bet")

          HTTP('/champion', {
              method: "post",
              withCredentials: true,
              data: {
                champion_id: this.loggedInUser.champion_id
              }
            })
            .then(response => {

              setTimeout(() => {
                this.isSaving -= 1
              }, 3000)
            })
            .catch(e => {

              this.isError = true

              setTimeout(() => {
                this.isError = false
                this.isSaving = false
              }, 3000)
            })
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
                supertip: supertip
              }
            })
            .then(response => {

              this.$store.dispatch('LOAD_STATUS')
              this.$emit("stopped-saving")
            })
            .catch(e => {

              this.$emit("is-error")
            })
        },
        setSaving() {

          if (!this.saveError) this.isSaving += 1
          this.saveSuccess = false
          this.saveError = false
        },
        stopSaving() {

          setTimeout(() => {
            this.saveSuccess = true

            setTimeout(() => {
              this.isSaving -= 1
            }, 1000)
          }, 2000)
        },
        stopSavingWithError() {

          setTimeout(() => {
            this.saveSuccess = false
            this.saveError = true

            // setTimeout(() => {
            //   this.isSaving -= 1
            // }, 5000)
          }, 2000)

        },
        championBet() {
          return this.loggedInUser.champion.name || "-"
        }
    }
  }
</script>
