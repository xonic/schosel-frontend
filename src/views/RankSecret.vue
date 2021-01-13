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
            rank: user.achievements.secret.rank,
            score: user.achievements.secret.score,
            avatar: user.avatar
          }
        })
      }
    },
  }
</script>
