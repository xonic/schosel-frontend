<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Schosel</h1>
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
        'avatarUrl'
      ])
    }
  }
</script>
