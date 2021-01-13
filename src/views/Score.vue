<template>
  <div class="score">
    <HelloWorld msg="Score"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'score',
  components: {
    HelloWorld
  }
}
</script>
