<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Secret</h1>
      <rank-grid :data="secretScore" />
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RankGrid from '@/components/RankGrid'

  export default {
    name: 'secret',
    components: {
      RankGrid
    },
    computed: {
      ...mapGetters([
        'secretScore'
      ])
    }
  }
</script>
