<template>
  <div class="bets">
    <h1>Bets</h1>
    <div class="champion-bet" v-if="loggedInUser">
      <label for="champion-bet" class="label">Champion bet</label>
      <select id="champion-bet" class="select"
        v-model="loggedInUser.champion_id"
        @change="postChampion()"
        v-if="champion_editable">
        <option disabled value="">Please select one</option>
        <option v-for="team in status.teams"
                v-bind:value="team.team_id">{{ team.name }}</option>
      </select>
      <div v-else>{{ championBet() }}</div>
    </div>
    <div>
      <div class="label">{{ remainingSuperbets }} <span v-if="remainingSuperbets === 1">Superbet</span><span v-else>Superbets</span> remaining</div>
      <transition-group name="star" appear>
        <svg v-bind:key="i" v-for="i in remainingSuperbets" class="btn--supertip" width="16" height="15" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/>
        </svg>
      </transition-group>
    </div>
    <div>
      <div class="grid-matches" v-if="upcomingMatches.length">
        <div v-for="matchDay in upcomingMatchDays" class="list">
          <h4 class="list__header"><span>{{ matchDate(matchDay.date) }}</span><span>{{ matchDay.matches[0].stage }}</span></h4>
          <ul class="list__items">
            <li
              is="match-item"
              v-for="upcomingMatch in matchDay.matches"
              v-bind="upcomingMatch"
              v-on:is-saving="setSaving()"
              v-on:stopped-saving="stopSaving()"
              v-on:is-error="stopSavingWithError()"
              class="list__item">
            </li>
          </ul>
        </div>
      </div>
      <h2 v-else class="blankslate">No more upcoming matches</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import SuperBet from '@/components/SuperBet'

export default {
  name: 'bets',
  components: {
    ClipLoader,
    SuperBet,
  },
  data () {
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
      'upcomingMatchDays',
      'upcomingMatches',
      'loading',
      'loggedInUser',
      'status'
    ]),
    remainingSuperbets () {
      return this.maxSuperbets - this.loggedInUser.visible_supertips
    },
  },
  mounted () {
  },
  methods: {
    matchDate: date => {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('en-GB', options)
    },
    postChampion() {
      this.isSaving = true
      this.$ga.event(this.loggedInUser.name, "champion_bet")

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
