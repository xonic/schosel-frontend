<template>
  <div class="matches"  v-bind:class="[maxSuperbets - loggedInUser.visible_supertips <= 0 ? 'no-superbets-left' : '']">
    <div class="wrapper">
      <div class="hero hero--9">
        <h1 class="hero__heading">Upcoming</h1>
        <div class="hero__info">{{ upcomingMatches.length }} Matches</div>
      </div>
      <div class="champion-bet" v-if="loggedInUser">
        <label for="champion-bet" class="label">Champion bet</label>
        <select id="champion-bet" class="select" v-model="loggedInUser.champion_id" @change="postChampion()">
          <option disabled value="">Please select one</option>
          <option v-for="team in status.teams"
                  v-bind:value="team.team_id">{{ team.name }}</option>
        </select>
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
              class="list__item">
            </li>
          </ul>
        </div>
      </div>
      <h1 v-else>No more upcoming matches</h1>
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
      maxSuperbets: 8
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
      HTTP('/champion', {
        method: "post",
        withCredentials: true,
        data: {
          champion_id: this.loggedInUser.champion_id
        }
      })
      .then(response => {
        console.log("champion bet saved")
      })
      .catch(e => {
        console.log(this.loggedInUser.champion_id)
        console.log(e)
      })
    }
  }
}
</script>
