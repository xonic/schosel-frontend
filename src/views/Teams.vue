<template>
  <div class="score">
    <div class="wrapper">
      <div class="hero hero--2">
        <transition name="hero" appear>
          <div>
            <h1 class="hero__heading">Teams</h1>
          </div>
        </transition>
      </div>
      <clip-loader :loading="loading.status" :color="loading.color" :size="loading.size"></clip-loader>
        <div v-if="!loading.status">
          <transition name="content" appear>
            <div>
            <div class="island" v-if="status.teams">
              <grid
                :data="gridData"
                :columns="gridColumns">
              </grid>
            </div>
            <h2 v-else class="blankslate">There are no teams.</h2>
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
  name: 'teams',
  computed: {
    ...mapGetters([
      'status',
      'loading'
    ]),
    gridData () {
      if(this.status.teams) {
        return this.status.teams.sort((a, b) => {
          return b.odds - a.odds
        })
      }
    }
  },
  components: {
    Grid,
    ClipLoader
  },
  data () {
    return {
      gridColumns: ['name', 'group', 'odds']
    }
  }
}
</script>
