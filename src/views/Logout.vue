<template></template>

<script>

  export default {
    name: 'logout',
    mounted () {
      this.$store.dispatch('LOGOUT')
    }
  }
</script>
