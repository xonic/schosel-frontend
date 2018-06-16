<template>
  <div class="hustler">
    <div class="wrapper">
      <div class="hero hero--12">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Hustler</h1>
            <div class="hero__info">Most points from superbets</div>
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
              :hasLinks="true"
              :linkToComponent="'user'"
              :idKey="'user_id'"
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
  name: 'hustler',
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
            user_id: user.user_id,
            rank: user.achievements.hustler.rank,
            name: user.name,
            score: user.achievements.hustler.score.toFixed(2),
            times_correct: user.achievements.hustler.times_correct
          })
        })
      }
      return gridData.sort((a, b) => {
        return a.rank - b.rank
      });
    }
  },
  data: function () {
    return {
      gridColumns: ['rank', 'name', 'times_correct', 'score'],
    }
  }
}
</script>
