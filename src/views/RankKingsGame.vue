<template>
  <main>
    <div class="wrapper">
      <div class="text--center"><img v-if="iconPaths.length" :src="getURL(0)" /></div>
      <h1 class="h2 text--center text--cyan">Schosel</h1>
      <div class="text--small text--gray-20 main__title">Most correct bets with odds</div>
      <rank-grid v-if="kingsScore.length" :data="kingsScore" />
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
    name: 'kings-game',
    components: {
      RankGrid,
      Avatar
    },
    computed: {
      ...mapGetters([
        'kingsScore',
        'iconPaths',
        'avatarUrl'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
