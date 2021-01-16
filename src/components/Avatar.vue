<template>
  <img :src="src" :class="size ? 'avatar ' + 'avatar--' + size : 'avatar'">
</template>

<script>
  export default {
    name: "avatar",
    props: {
      src: String,
      size: String
    }
  }
</script>
