<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Balanced</h1>
      <rank-grid v-if="balancedScore.length" :data="balancedScore" />
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
    name: 'balanced',
    components: {
      RankGrid,
      Avatar
    },
    computed: {
      ...mapGetters([
        'balancedScore',
        'avatarUrl'
      ])
    }
  }
</script>
