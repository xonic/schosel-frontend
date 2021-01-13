<template>
  <div class="matches" v-bind:class="[maxSuperbets - loggedInUser.visible_supertips <= 0 ? 'no-superbets-left' : '']">
    <div class="wrapper" v-bind:class="{ isSaving: isSaving }">
      <div class="hero hero--9">
        <h1 class="hero__heading">Upcoming</h1>
        <div class="hero__info">{{ upcomingMatches.length }} Matches</div>
      </div>
      <div class="champion-bet" v-if="loggedInUser">
        <label for="champion-bet" class="label">Champion bet</label>
        <select id="champion-bet" class="select"
          v-model="loggedInUser.champion_id"
          @change="postChampion()"
          v-if="status.champion_editable">
          <option disabled value="">Please select one</option>
          <option v-for="team in status.teams"
                  v-bind:value="team.team_id">{{ team.name }}</option>
        </select>
        <div v-else>{{ championBet() }}</div>
      </div>
      <div class="legend">
        <div v-if="loggedInUser">
          <svg class="btn--supertip" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/></svg> <span class="label">
            {{ this.maxSuperbets - loggedInUser.visible_supertips }} <span v-if="this.maxSuperbets - loggedInUser.visible_supertips === 1">Superbet</span><span v-else>Superbets</span> remaining</span>
        </div>
      </div>
      <div class="grid-matches" v-if="upcomingMatches.length">
        <div v-for="matchDay in upcomingMatchDays" class="list">
          <h4 class="list__header">{{ matchDate(matchDay.date) }}</h4>
          <ul class="list__items">
            <li
              is="match-item"
              v-for="upcomingMatch in matchDay.matches"
              v-bind="upcomingMatch"
              v-on:is-saving="setSaving()"
              v-on:stopped-saving="stopSaving()"
              class="list__item">
            </li>
          </ul>
        </div>
      </div>
      <h2 v-else class="blankslate">No more upcoming matches</h2>
      <div class="msg--save" v-bind:class="{ saveSuccess: saveSuccess }">
        <div class="saving">
          Saving <span class="ellipsis ellipsis-1">.</span> <span class="ellipsis ellipsis-2">.</span> <span class="ellipsis ellipsis-3">.</span>
        </div>
        <div class="saved">
          Saved&nbsp;&nbsp;<svg width="13px" height="14px" viewBox="0 0 13 14">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-39.000000, -982.000000)" stroke="#7ED321" stroke-width="3">
                      <polyline points="40.6875603 990.432675 43.9671236 993.637648 50.6875603 983.634009"></polyline>
                  </g>
              </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MatchItem from '@/components/MatchItem.vue'
import { HTTP } from '../http-constants'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'matches',
  data () {
    return {
      maxSuperbets: 8,
      isSaving: false,
      saveSuccess: false
    }
  },
  computed: {
    ...mapGetters([
      'upcomingMatches',
      'upcomingMatchDays',
      'loggedInUser',
      'loading',
      'status'
    ])
  },
  components: {
    MatchItem,
    ClipLoader
  },
  methods: {
    matchDate: function(date) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('en-GB', options)
    },
    postChampion () {
      this.isSaving = true

      HTTP('/champion', {
        method: "post",
        withCredentials: true,
        data: {
          champion_id: this.loggedInUser.champion_id
        }
      })
      .then(response => {
        // console.log("champion bet saved")

        setTimeout(() => {
          this.isSaving = false
        }, 3000)
      })
      .catch(e => {
        // console.log(this.loggedInUser.champion_id)
        console.log(e)

        setTimeout(() => {
          this.isSaving = false
        }, 3000)
      })
    },
    setSaving() {
      // console.log('isSaving')
      this.isSaving += 1
      this.saveSuccess = false
    },
    stopSaving() {
      // console.log('stoppedSaving')

      setTimeout(() => {
        this.saveSuccess = true

        setTimeout(() => {
          this.isSaving -= 1
        }, 1000)
      }, 2000)

    },
    championBet() {
      var champion = this.status.teams.find((el) => {
        return el.team_id === this.loggedInUser.champion_id
      })

      return champion.name
    }
  }
}
</script>
