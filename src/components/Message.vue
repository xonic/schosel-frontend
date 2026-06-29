<template>
  <component :is="to ? 'router-link' : 'div'" :to="to" :class="['msg', `msg--${type}`, position && `msg--${position}`, to && 'msg--link']">
    <slot></slot>
  </component>
</template>

<script>
  export default {
    name: 'message',
    props: {
      type: String,
      position: String,
      to: [String, Object]
    }
  }
</script>
