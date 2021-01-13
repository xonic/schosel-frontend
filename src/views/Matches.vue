<template>
  <div class="matches">
    <HelloWorld msg="Matches"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'matches',
  components: {
    HelloWorld
  }
}
</script>
