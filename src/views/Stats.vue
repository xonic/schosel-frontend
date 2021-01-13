<template>
  <div class="stats">
    <tabs>
      <tab name="Players" :selected="true">
        <h1>Gamblers</h1>
        <h2>Most bets on highest odds</h2>
        <grid
          :data="gridData"
          :columns="gridColumns">
        </grid>
      </tab>

      <tab name="Teams">
        <h1>Teams</h1>
      </tab>

      <tab name="Matches">
        <h1>Matches</h1>
      </tab>
    </tabs>
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
