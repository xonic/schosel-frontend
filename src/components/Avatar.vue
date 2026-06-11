<template>
  <img :src="src" :class="size ? 'avatar ' + 'avatar--' + size : 'avatar'" @error="onError">
</template>

<script>
  const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%233A353B'/%3E%3Ccircle cx='32' cy='26' r='11' fill='%23625964'/%3E%3Cellipse cx='32' cy='58' rx='20' ry='14' fill='%23625964'/%3E%3C/svg%3E"

  export default {
    name: "avatar",
    props: {
      src: String,
      size: String
    },
    methods: {
      onError(e) {
        if (e.target.src !== FALLBACK) e.target.src = FALLBACK
      }
    }
  }
</script>
