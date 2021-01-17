<template>
  <div :class="type ? `msg msg--${type}` : 'msg'">
    {{ msg }}
  </div>
</template>

<script>
  export default {
    name: 'message',
    props: {
      msg: String,
      type: String
    }
  }
</script>
