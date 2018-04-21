<template>
  <div class="stats">
    <div class="wrapper">
      <tabs>
        <tab name="Players" :selected="true">
          <div class="hero hero--6">
            <h1 class="hero__heading">Players</h1>
          </div>
          <h2>Most bets on highest odds</h2>
          <grid
            :data="gridData"
            :columns="gridColumns">
          </grid>
        </tab>

        <tab name="Teams">
          <div class="hero hero--3">
            <h1 class="hero__heading">Teams</h1>
          </div>
        </tab>

        <tab name="Matches">
          <div class="hero hero--1">
            <h1 class="hero__heading">Matches</h1>
          </div>
        </tab>
      </tabs>
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
