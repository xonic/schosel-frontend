<template>
  <main>
    <div class="wrapper">
      <div class="text--center"><img v-if="iconPaths.length" :src="getURL(4)" /></div>
      <h1 class="h2 text--center text--orange">Comeback</h1>
      <div class="text--small text--gray-20 main__title">Bets on teams who were behind but won</div>
      <rank-grid v-if="secretScore.length" :data="secretScore" />
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
    name: 'comeback',
    components: {
      RankGrid,
      Avatar
    },
    computed: {
      ...mapGetters([
        'secretScore',
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
