<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Oldfashioned</h1>
      <rank-grid :data="rankedUsers" />
    </div>
  </main>
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
            rank: user.scores[1].rank,
            score: user.scores[1].score,
            avatar: user.avatar
          }
        }).sort((a, b) => (a.rank > b.rank) ? 1 : -1)
      }
    },
  }
</script>
