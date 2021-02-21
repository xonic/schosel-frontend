<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Oldfashioned</h1>
      <rank-grid :data="oldfashionedScore" />
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'oldfashioned',
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'oldfashionedScore'
      ])
    },
  }
</script>
