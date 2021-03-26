<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Bets</h1>
      <h2 class="h3 main__subtitle">Champion</h2>
      <div v-if="status && status.user">
        <div class="champion-bet" v-if="status.user.champion">
          <select
            id="champion-bet"
            class="select"
            v-model="status.user.champion.team_id"
            @change="postChampion()"
            v-if="status.champion_editable"
          >
            <option disabled value="">Please select one</option>
            <option v-for="team in status.teams" v-bind:value="team.team_id">{{ team.name }}</option>
          </select>
          <div v-else>{{ championBet() }}</div>
        </div>
      </div>
      <h2 class="h3 main__subtitle">Matches</h2>



      <!-- <nav class="nav nav--main">
        <ul class="nav__items">
          <li class="nav__item">
            <router-link class="nav__link" :to="{ name: 'bets-today' }">
              Today
            </router-link>
          </li>
          <li class="nav__item">
            <router-link class="nav__link" :to="{ name: 'bets-tomorrow' }">
              Tomorrow
            </router-link>
          </li>
          <li class="nav__item">
            <router-link class="nav__link" :to="{ name: 'bets-this-week' }">
              This week
            </router-link>
          </li>
          <li class="nav__item">
            <router-link class="nav__link" :to="{ name: 'bets-later' }">
              Later
            </router-link>
          </li>
        </ul>
      </nav>
      <router-view/> -->
      <!-- <div v-if="upcomingMatches.length">
        <div class="label">{{ remainingsupertips }} <span v-if="remainingsupertips === 1">supertip</span><span v-else>supertips</span> remaining</div>
        <transition-group name="star" appear>
          <super-bet v-bind:key="i" v-for="i in remainingsupertips" :correct="true" />
        </transition-group>
      </div>-->
      <ul v-if="scheduledMatches && scheduledMatches.length">
        <li v-for="match in scheduledMatches" class="bet">
          <div class="bet__date">
            {{ matchDate(match.date) }}
          </div>
          <div class="bet__teams">
            <span class="bet__home-team">{{ match.team1_name }}</span>
            <span class="bet__vs"> VS </span>
            <span class="bet__away-team">{{ match.team2_name }}</span>
          </div>

          <div class="bet__form">
            <input
              :id="match.match_id + '-home'"
              class="match__input"
              type="radio"
              value="1"
              v-model="ownBet(match.match_id).bet.outcome"
              @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)"
            >
            <label
              class="match__label match__label--radio"
              :for="match.match_id + '-home'"
            >
              <div class="bet__flag">
                <flag
                  :iso="match.team1_iso"
                  :is-bet="ownBet(match.match_id).bet.outcome === '1'"
                />
              </div>
              <div :class="ownBet(match.match_id).bet.outcome === '1' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Home</div>
            </label>
            <input
            class="match__input"
            type="radio"
            :id="match.match_id + '-draw'"
            value="X"
            v-model="ownBet(match.match_id).bet.outcome"
            @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)"
            >
            <label
            class="match__label match__label--radio"
            :for="match.match_id + '-draw'"
            >
            <div class="bet__flag">
              <flag
                :iso="'drw'"
                :is-bet="ownBet(match.match_id).bet.outcome === 'X'"
              />
            </div>
            <div :class="ownBet(match.match_id).bet.outcome === 'X' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Draw</div>
          </label>


          <input
          class="match__input"
          type="radio"
          :id="match.match_id + '-away'"
          value="2"
          v-model="ownBet(match.match_id).bet.outcome"
          @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)"
          >
          <label
          class="match__label match__label--radio"
          :for="match.match_id + '-away'"
          >
          <div class="bet__flag">
            <flag
            :iso="match.team2_iso"
            :is-bet="ownBet(match.match_id).bet.outcome === '2'"
            />
          </div>
          <div :class="ownBet(match.match_id).bet.outcome === '2' ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Away</div>
        </label>

        <span v-if="remainingsupertips || ownBet(match.match_id).bet.supertip">
          <input
          class="match__input"
          type="checkbox"
          :id="match.match_id + '-supertip'"
          v-model="ownBet(match.match_id).bet.supertip"
          @change="postBet(match.match_id, ownBet(match.match_id).bet.outcome, ownBet(match.match_id).bet.supertip)"
          >
          <label
          class="match__label"
          :for="match.match_id + '-supertip'"
          >
          <div class="bet__superbet">
            <super-bet :correct="ownBet(match.match_id).bet.supertip" />
          </div>
          <div :class="ownBet(match.match_id).bet.supertip ? 'bet__outcome bet__outcome--is-bet' : 'bet__outcome'">Superbet</div>
        </label>
      </span>
          </div>

    </li>
      </ul>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">No matches left to bet</div>
      </div>
    </div>
  </main>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters } from 'vuex'
  import { HTTP } from '../http-constants'
  import ClipLoader from 'vue-spinner/src/ClipLoader'
  import SuperBet from '@/components/SuperBet'
  import Flag from '@/components/Flag'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'bets',
    components: {
      ClipLoader,
      SuperBet,
      Flag,
      Avatar
    },
    data() {
      return {
        maxsupertips: 8,
        isSaving: false,
        isError: false,
        saveSuccess: false,
        saveError: false,
        currentHeader: "",
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
          'scheduledMatches',
          // 'loading',
          'loggedInUser',
          'status',
          'avatarUrl'
        ]),
        remainingsupertips() {
          if(!(this.loggedInUser && this.loggedInUser.visible_supertips)) return this.maxsupertips
          return this.maxsupertips - this.loggedInUser.visible_supertips
        },
    },
    mounted() {},
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
      postChampion() {
        this.isSaving = true
          // this.$ga.event(this.loggedInUser.name, "champion_bet")

        HTTP('/champion', {
            method: "post",
            withCredentials: true,
            data: {
              champion_id: this.status.user.champion.team_id
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
