<template>
  <div class="matches" v-bind:class="[maxSuperbets - loggedInUser.visible_supertips <= 0 ? 'no-superbets-left' : '']">
    <div class="wrapper" v-bind:class="{ isSaving: isSaving }">
      <div class="hero hero--9">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Upcoming</h1>
            <div class="hero__info">{{ upcomingMatches.length }} Matches</div>
          </div>
        </transition>
      </div>
      <transition name="content" appear>
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
      </transition>
      <transition name="legend" appear>
        <div class="legend" v-if="loggedInUser">
          <div class="wrapper">
            <div class="tab-grid">
              <div v-if="upcomingMatches.length < 48"></div>
              <div>
                <div class="label">{{ remainingSuperbets }} <span v-if="remainingSuperbets === 1">Superbet</span><span v-else>Superbets</span> remaining</div>
                <transition-group name="star" appear>
                  <svg v-bind:key="i" v-for="i in remainingSuperbets" class="btn--supertip" width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z" fill="#F8E71C" stroke="#E4D40D" fill-rule="evenodd"/>
                  </svg>
                </transition-group>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="content" appear>
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
      </transition>
      <div class="msg--save" v-bind:class="{ saveSuccess: saveSuccess, saveError: saveError }">
        <div class="error">
          Error :(
        </div>
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
      isError: false,
      saveSuccess: false,
      saveError: false,
      currentHeader: ""
    }
  },
  computed: {
    ...mapGetters([
      'upcomingMatches',
      'upcomingMatchDays',
      'loggedInUser',
      'loading',
      'status'
    ]),
    remainingSuperbets () {
      return this.maxSuperbets - this.loggedInUser.visible_supertips
    }
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

      this.isSaving += 1
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

        setTimeout(() => {
          this.isSaving -= 1
        }, 5000)
      }, 2000)

    },
    championBet() {
      return this.loggedInUser.champion.name || "-"
    }
  }
}
</script>

<style scoped>

.legend-enter {
  transform: translateY(100%);
}

.legend-enter-active {
  transition: transform .2s .2s ease-out;
}

.legend-enter-to {
  transform: translateY(0);
}

.legend-leave {
  transform: translateY(0);
}

.legend-leave-active {
  transition: transform .2s ease-in;
  transform: translateY(100%);
}

.legend-leave-to {
  transform: translateY(100%);
}

.star-enter {
  opacity: 0;
  transform: translateY(-100%) rotateZ(-60deg);
}

.star-enter-active {
  transition: all .2s ease-in;
}

.star-enter-to {
  transform: translateY(0);
}

.star-leave {
  transform: translateY(0);
}

.star-leave-active {
  transition: all .2s ease-in;
  opacity: 0;
  transform: translateY(100%) rotateZ(30deg);
}

.star-leave-to {
  transform: translateY(100%) rotateZ(30deg);
}



</style>
