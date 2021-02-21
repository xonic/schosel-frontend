<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Underdog</h1>
      <rank-grid :data="underdogScore" />
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'underdog',
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'underdogScore'
      ])
    }
  }
</script>
