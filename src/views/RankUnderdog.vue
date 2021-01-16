<template>
  <div class="score">
    <h1>Underdog</h1>
    <rank-grid :data="rankedUsers" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'kings-game',
    data () {
      return {

      }
    },
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'allUsers'
      ]),
      rankedUsers() {
        return this.allUsers.map(user => {
          return {
            id: user.user_id,
            name: user.name,
            rank: user.scores[2].rank,
            score: user.scores[2].score,
            avatar: user.avatar
          }
        }).sort((a, b) => (a.rank > b.rank) ? 1 : -1)
      }
    },
  }
</script>
