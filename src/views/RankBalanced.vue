<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Balanced</h1>
      <rank-grid :data="balancedScore" />
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'balanced',
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'balancedScore'
      ])
    }
  }
</script>
