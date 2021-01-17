<template>
  <router-link :to="{ name: 'home' }" class="logo">
    <h1 class="logo__name">
      <span class="text--cyan">S</span>
      <span class="text--blue">c</span>
      <span class="text--purple">h</span>
      <avatar :src="avatarUrl + Math.random()" class="logo__avatar" />
      <!-- <span v-else class="text--magenta">o</span> -->
      <span class="text--red">s</span>
      <span class="text--orange">e</span>
      <span class="text--yellow">l</span>
    </h1>
    <h2 class="logo__tournament">Euro 2021</h2>
  </router-link>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from '@/components/Avatar.vue'

  export default {
    name: 'logo',
    components: {
      Avatar
    },
    computed: {
      ...mapGetters([
        'avatarUrl'
      ])
    }
  }
</script>
