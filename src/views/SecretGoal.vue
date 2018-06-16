<template>
  <div class="secret">
    <div class="wrapper">
      <div class="hero hero--13">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Secret Goal</h1>
            <div class="hero__info">To be revealed after the tournament</div>
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
  name: 'secret',
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
            rank: user.achievements.secret.rank,
            name: user.name,
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
      gridColumns: ['rank', 'name'],
    }
  }
}
</script>
