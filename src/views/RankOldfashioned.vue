<template>
  <main>
    <div class="wrapper">
      <div class="text--center"><img v-if="iconPaths.length" :src="getURL(1)" /></div>
      <h1 class="h2 text--center text--blue">Loser</h1>
      <div class="text--small text--gray-20 main__title">Most wrong bets with odds</div>
      <rank-grid v-if="oldfashionedScore.length" :data="oldfashionedScore" :show-champion="false" />
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + getRandomSeed()" size="xlarge" />
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
  import { getRandomSeed } from '@/utils'

  export default {
    name: 'oldfashioned',
    components: {
      RankGrid,
      Avatar
    },
    computed: {
      ...mapGetters([
        'oldfashionedScore',
        'iconPaths',
        'avatarUrl'
      ])
    },
    methods: {
      getRandomSeed,
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
