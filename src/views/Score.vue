<template>
  <div class="score">
    <div class="wrapper">
      <div class="hero hero--2">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Score</h1>
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
import Grid from '@/components/Grid.vue'
import { mapGetters } from 'vuex'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'score',
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
      'loading'
    ]),
    gridData () {
      if(this.allUsers) {
        this.allUsers.forEach((el) => {
          el.points = parseFloat(el.points).toFixed(2)
        })
        return this.allUsers
      }
    }
  },
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      gridColumns: ['rank', 'name', 'extras', 'points']
    }
  }
}
</script>
