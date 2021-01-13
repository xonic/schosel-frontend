<template>
  <div class="stats">
    <tabs>
      <tab name="Players" :selected="true">
        <h1>Players</h1>
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
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

export default {
  name: 'stats',
  components: {
    Tabs,
    Tab
  }
}
</script>
