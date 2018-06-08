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
      <div class="island">
        <grid
          :data="gridData"
          :columns="gridColumns"
          v-if="allUsers.length">
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'gambler',
  components: {
    Grid,
    Tabs,
    Tab
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser'
    ])
  },
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['rank', 'name', 'score'],
      gridData: []
    }
  },
  methods: {
    getGridData: function() {

      if(this.allUsers.length > 0) {
        this.gridData = []
        var self = this
        this.allUsers.forEach((user) => {

          self.gridData.push({
            rank: user.achievements.gambler.rank,
            name: user.name,
            score: user.achievements.gambler.score.toFixed(2)
          })
        })
      }
    }
  },
  mounted () {
    this.getGridData();
  }
}
</script>
