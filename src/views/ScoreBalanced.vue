<template>
  <div class="score">
    <h1>Balanced</h1>
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
            rank: user.achievements.hustler.rank,
            score: user.achievements.hustler.score,
            avatar: user.avatar
          }
        })
      }
    },
  }
</script>
