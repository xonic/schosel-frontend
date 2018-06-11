<template>
  <div class="gambler">
    <div class="wrapper">
      <div class="hero hero--6">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Gambler</h1>
            <div class="hero__info">Most correct bets on highest odds</div>
          </div>
        </transition>
      </div>
      <clip-loader :loading="loading.users" :color="loading.color" :size="loading.size"></clip-loader>
      <div v-if="!loading.users">
        <transition name="content" appear>
          <div class="island">
            <grid
              :data="gridData"
              :columns="gridColumns"
              v-if="allUsers.length">
            </grid>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'gambler',
  components: {
    Grid,
    ClipLoader
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
      'loading'
    ]),
    gridData: function() {

      if(this.allUsers.length > 0) {
        var gridData = []

        this.allUsers.forEach((user) => {

          gridData.push({
            rank: user.achievements.gambler.rank,
            name: user.name,
            score: user.achievements.gambler.score.toFixed(2)
          })
        })
      }
      return gridData.sort((a, b) => {
        return a.rank - b.rank
      });
    }
  },
  data () {
    return {
      gridColumns: ['rank', 'name', 'score']
    }
  }
}
</script>
