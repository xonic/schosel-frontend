<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Bets</h1>
      <h2 class="h3 main__subtitle">Champion</h2>
      <div v-if="status && status.user">
        <div class="champion-bet">
          <select
            id="champion-bet"
            class="select"
            v-model="status.user.champion.team_id"
            @change="postChampion()"
            v-if="status.champion_editable"
          >
            <option disabled value="def">Select...</option>
            <option v-for="team in status.teams" v-bind:value="team.team_id">{{ team.name }}</option>
          </select>
          <div v-else>
            <div v-if="status.user.champion" class="champion-bet__display">
              <flag v-if="status.user.champion.short_name" :iso="status.user.champion.short_name" size="large" />
              <div>{{ championBet() }}</div>
            </div>
          </div>
          <div class="bet__status" :class="{ 'bet__status--saved': championSaved, 'bet__status--error': championSaveError }">{{ championStatusText }}</div>
        </div>
      </div>
      <h2 class="h3 main__subtitle">Matches</h2>
      <available-super-bets />
      <ul v-if="scheduledMatches && scheduledMatches.length">
        <li v-for="match in scheduledMatches">
          <bet :match="match" />
        </li>
      </ul>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + getRandomSeed()" size="xlarge" />
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
  import AvailableSuperBets from '@/components/AvailableSuperBets'
  import Bet from '@/components/Bet'
  import Flag from '@/components/Flag'
  import Avatar from '@/components/Avatar'
  import { getRandomSeed } from '@/utils'

  export default {
    name: 'bets',
    components: {
      ClipLoader,
      Bet,
      SuperBet,
      AvailableSuperBets,
      Flag,
      Avatar
    },
    data() {
      return {
        championSaving: false,
        championSaved: false,
        championSaveError: false,
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
      championStatusText() {
        if (this.championSaving) return 'Saving…'
        if (this.championSaved) return 'Saved'
        if (this.championSaveError) return "Couldn't save, try again"
        return ' '
      }
    },
    mounted() {},
    methods: {
      getRandomSeed,
      postChampion() {
        this.championSaving = true
        this.championSaved = false
        this.championSaveError = false
        const saveStart = Date.now()

        HTTP('/champion', {
            method: "post",
            withCredentials: true,
            data: {
              champion_id: this.status.user.champion.team_id
            }
          })
          .then(response => {
            const minDelay = Math.max(0, 1000 - (Date.now() - saveStart))
            setTimeout(() => {
              this.championSaving = false
              this.championSaved = true
              setTimeout(() => { this.championSaved = false }, 3000)
            }, minDelay)
          })
          .catch(e => {
            const minDelay = Math.max(0, 1000 - (Date.now() - saveStart))
            setTimeout(() => {
              this.championSaving = false
              this.championSaveError = true
              setTimeout(() => { this.championSaveError = false }, 3000)
            }, minDelay)
          })
      },
      championBet() {
        return this.loggedInUser.champion && this.loggedInUser.champion.name || "-"
      },
      championSelectModel() {
        if(!status.user.champion || !status.user.champion.team_id) return 'def'
        return status.user.champion.team_id
      }
    }
  }
</script>
