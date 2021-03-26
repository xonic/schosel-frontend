<template>
  <div :class="`msg msg--${type} msg--${position}`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'message',
    props: {
      type: String,
      position: String
    }
  }
</script>
