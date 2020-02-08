<template>
  <div class="expert">
    <div class="wrapper">
      <div class="hero hero--11">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Expert</h1>
            <div class="hero__info">Most correct bets for one nation</div>
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
            user_id: user.user_id,
            rank: user.achievements.expert.rank,
            avatar: user.avatar,
            name: user.name,
            team_name: user.achievements.expert.team.name,
            score: user.achievements.expert.score.toFixed(2)
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
      gridColumns: ['rank', 'name', 'team_name', 'score'],
    }
  }
}
</script>
