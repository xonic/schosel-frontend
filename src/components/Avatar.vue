<template>
  <img :src="src" style="width: 32px; border-radius: 999em; margin-right:12px;">
</template>

<script>
  export default {
    name: "avatar",
    props: {
      src: String
    }
  }
</script>
