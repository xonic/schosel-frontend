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
  name: 'hustler',
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
      gridColumns: ['rank', 'name', 'times_correct', 'score'],
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
            rank: user.achievements.hustler.rank,
            name: user.name,
            score: user.achievements.hustler.score.toFixed(2),
            times_correct: user.achievements.hustler.times_correct
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
