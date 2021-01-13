<template>
  <div class="schosel">
    <div class="wrapper">
      <div class="hero hero--2">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">The Schosel</h1>
            <div class="hero__info" v-if='loggedInUser && loggedInUser.points'>{{ loggedInUser.points.toFixed(2) }} pts</div>
          </div>
        </transition>
      </div>
      <clip-loader :loading="loading.users" :color="loading.color" :size="loading.size"></clip-loader>
        <div v-if="!loading.users">
          <transition name="content" appear>
            <div>
            <div class="island" v-if="allUsers && allUsers.length">
              <grid
                :data="gridData"
                :columns="gridColumns"
                :hasLinks="true"
                :linkToComponent="'user'"
                :idKey="'user_id'">
              </grid>
            </div>
            <h2 v-else class="blankslate">There is no score ranking yet</h2>
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
            rank: user.achievements.gambler.rank,
            avatar: user.avatar,
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
