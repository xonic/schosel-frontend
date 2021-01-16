<template>
  <router-link :to="{ name: 'home' }" class="logo">
    <h1 class="logo__name">
      <span class="text--cyan">S</span>
      <span class="text--blue">c</span>
      <span class="text--purple">h</span>
      <span class="text--magenta">o</span>
      <span class="text--red">s</span>
      <span class="text--orange">e</span>
      <span class="text--yellow">l</span>
    </h1>
    <h2 class="logo__tournament">Euro 2021</h2>
  </router-link>
</template>

<script>
  export default {
    name: 'logo'
  }
</script>
