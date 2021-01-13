<template>
  <div class="stats">
    <div class="wrapper">
      <div class="hero hero--1">
        <h1 class="hero__heading">Matches</h1>
      </div>
      <h2>Most bets on highest odds</h2>
      <grid
        :data="gridData"
        :columns="gridColumns">
      </grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

export default {
  name: 'stats',
  components: {
    Grid,
    Tabs,
    Tab
  },
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['name', 'bets'],
      gridData: [
        { name: 'Chuck Norris', bets: '18' },
        { name: 'Bruce Lee', bets: 15 },
        { name: 'Jackie Chan', bets: 10 },
        { name: 'Jet Li', bets: 4 }
      ]
    }
  }
}
</script>
