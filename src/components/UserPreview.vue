<template>
  <router-link :to="{ name: 'user', params: { id: user.user_id + '' } }" class="user-preview">
    <div class="user-preview__avatar">
      <avatar :src="user.avatar" size="large" />
    </div>
    <div class="user-preview__body">
      <div class="user-preview__name">
        {{ user.name }}
        <span v-if="loggedInUser && user.user_id === loggedInUser.user_id" class="text--small text--gray-20">(You)</span>
      </div>
      <ul class="user-preview__ranks">
        <li v-for="(score, index) in user.scores" :class="parseFloat(getScore(score, index)) === 0 ? 'user-preview__rank user-preview__rank--zero' : 'user-preview__rank'">
          <img :src="getURL(index)" class="user-preview__icon" />
          {{ getScore(score, index) }}
        </li>
      </ul>
    </div>
    <div class="user-preview__chevron">
      <img src="../assets/img/icons/i--chevron-right.svg" />
    </div>
  </router-link>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from '@/components/Avatar.vue'

  export default {
    name: 'user-preview',
    props: {
      user: Object,
      type: String,
      matchId: Number
    },
    components: {
      Avatar
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
        if (this.matchId) {
          let userBet = this.user.public_bets.find(bet => bet.match_id === this.matchId)

          // console.log('userbet', userBet)

          if(userBet && userBet.bet) {
            return userBet.bet.points[id].points.toFixed(2)
          }
          else {
            return "0.00"
          }
        }
        if (this.type === 'score') {
          return score.points.toFixed(2)
        }
        else {
          return score.rank + '.'
        }
      }
    }
  }
</script>
