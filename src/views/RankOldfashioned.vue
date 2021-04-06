<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 text--center text--blue">Loser</h1>
      <div class="text--small text--gray-20 main__title">Most wrong bets with odds</div>
      <rank-grid v-if="oldfashionedScore.length" :data="oldfashionedScore" />
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">No one scored any points yet</div>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'
  import Avatar from '@/components/Avatar'

  export default {
    name: 'oldfashioned',
    components: {
      RankGrid,
      Avatar
    },
    computed: {
      ...mapGetters([
        'oldfashionedScore',
        'avatarUrl'
      ])
    },
  }
</script>
