<template>
  <router-link :to="{ name: 'home' }" class="logo">
    <h1 class="logo__name">
      <span>S</span>
      <span>c</span>
      <span>h</span>
      <span>o</span>
      <span>s</span>
      <span>e</span>
      <span>l</span>
    </h1>
    <h2 class="logo__tournament">EM 2020</h2>
  </router-link>
</template>

<script>
  export default {
    name: 'logo'
  }
</script>
