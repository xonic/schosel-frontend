<template>
  <router-link :to="{ name: 'user', params: { id: user.user_id + '' } }" class="user-preview">
    <div class="user-preview__avatar">
      <avatar :src="user.avatar" size="medium" />
    </div>
    <div class="user-preview__body">
      <div class="user-preview__name">
        {{ user.name }}
        <span v-if="type === 'score' && matchId" class="user-preview__reward text--small text--gray-20 text--center nowrap">&nbsp;{{ getUserBetOutcome(matchId) }}</span>
        <span v-if="type === 'score' && getUserSuperBet()">
          &nbsp;<super-bet :correct="true" />
        </span>
        <span v-if="type !== 'score'" class="user-preview__reward text--small text--gray-20 text--center nowrap">&nbsp;{{ user.reward.toFixed(2) }} &euro;</span>
      </div>
      <div v-if="user.paid">
        <ul class="user-preview__ranks">
          <li v-for="(score, index) in user.scores" :class="parseFloat(getScore(score, index)) === 0 ? 'user-preview__rank user-preview__rank--zero' : 'user-preview__rank'">
            <img :src="getURL(index)" class="user-preview__icon" />
            {{ parseFloat(getScore(score, index)) || "0" }}
          </li>
        </ul>
      </div>
      <div v-else class="text--red text--small">
        You haven't paid yet
      </div>
    </div>
    <div class="user-preview__chevron">
      <img src="../assets/img/icons/i--chevron-right.svg" />
    </div>
  </router-link>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from '@/components/Avatar.vue'
  import SuperBet from '@/components/SuperBet'

  export default {
    name: 'user-preview',
    props: {
      user: Object,
      type: String,
      matchId: Number
    },
    components: {
      Avatar,
      SuperBet
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'iconPaths'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      },
      getScore (score, id) {

        // This UserPreview is related to a specific matches
        // hence there is a matchId and it is considered a score user preview
        if (this.matchId) {

          let userBet = this.getUserBet()

          if(!userBet) return 0

          if(userBet && userBet.bet) {
            return userBet.bet.points[id].points > 0 ? `+${userBet.bet.points[id].points.toFixed(2)}` : '0'
          }
        }
        // There is no matchId hence this is considered a rank user preview
        else {
          return score.rank + '.'
        }
      },
      getUserBet() {
        return this.user.public_bets.find(bet => bet.match_id === this.matchId)
      },
      getUserBetOutcome() {
        if(!this.user || !this.user.public_bets) return false
        let bet = this.user.public_bets.find(bet => bet.match_id === this.matchId)

        if(!bet) return 'No bet'

        let betOutcome = bet.bet.outcome

        if(betOutcome === '1') return bet.team1_name
        if(betOutcome === 'X') return 'Draw'
        if(betOutcome === '2') return bet.team2_name
      },
      getUserSuperBet() {
        if(((!this.user || !this.user.public_bets) || !this.user.public_bets.length) || !this.matchId) return false
        return this.user.public_bets.find(bet => bet.match_id === this.matchId).bet.superbet
      }
    }
  }
</script>
