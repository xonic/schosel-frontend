<template>
  <div class="score">
    <h1>Secret</h1>
    <rank-grid :data="rankedUsers" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'secret',
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
            rank: user.scores[4].rank,
            score: user.scores[4].score,
            avatar: user.avatar
          }
        }).sort((a, b) => (a.rank > b.rank) ? 1 : -1)
      }
    },
  }
</script>
