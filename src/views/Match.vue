<template>
  <div class='match'>
    <a href="javascript:history.go(-1)">&lt; Back</a>
    This is a match
  </div>
</template>

<script>

export default {
  name: 'match',
  mounted () {
    console.warn("TODO: fetch match data from https://www.schosel.net/worlds2018/api/v1" + this.$route.fullPath)
    console.warn("TODO: fetch bet data from https://www.schosel.net/worlds2018/api/v1" + this.$route.fullPath + "/bets")
  }
}
</script>
