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
      <ul v-if="scheduledMatches && scheduledMatches.length">
        <li v-for="match in scheduledMatches" class="bet">
          <bet :match="match" />
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
  import Bet from '@/components/Bet'
  import Flag from '@/components/Flag'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'bets',
    components: {
      ClipLoader,
      Bet,
      SuperBet,
      Flag,
      Avatar
    },
    data() {
      return {
        isSaving: false,
        isError: false,
        saveSuccess: false,
        saveError: false,
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
    },
    mounted() {},
    methods: {
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
