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
      gridColumns: ['rank', 'name'],
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
            rank: user.achievements.secret.rank,
            name: user.name
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
