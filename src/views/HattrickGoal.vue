<template>
  <div class="hattrick">
    <div class="wrapper">
      <div class="hero hero--10">
        <h1 class="hero__heading">Chief Hattrick</h1>
      </div>
      <div class="island">
        <h2>Most points from 3+ consecutive correct bets.</h2>
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
  name: 'hattrick',
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
            rank: user.achievements.hattrick.rank,
            name: user.name,
            score: user.achievements.hattrick.score.toFixed(2)
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
