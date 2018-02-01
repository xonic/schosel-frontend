<template>
  <div class="account">
    <HelloWorld msg="Account"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'account',
  components: {
    HelloWorld
  }
}
</script>
