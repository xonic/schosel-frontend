<template>
  <div class="matches">
    <tabs>
      <tab name="Played">
        <h1>Played</h1>
      </tab>

      <tab name="Now Playing" :selected="true">
        <h1>Now Playing</h1>
      </tab>

      <tab name="Upcoming">
        <h1>Upcoming</h1>
      </tab>
    </tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

export default {
  name: 'matches',
  components: {
    Tabs,
    Tab
  }
}
</script>
