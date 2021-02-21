<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">King's Game</h1>
      <rank-grid :data="kingsScore" />
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'kings-game',
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'kingsScore'
      ])
    }
  }
</script>
