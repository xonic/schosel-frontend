<template>
  <div
    :class="isBet ?
      `flag flag--${iso} flag--${size} flag--is-bet` :
      `flag flag--${iso} flag--${size}`">
  {{ iso === 'drw' ? 'X' : '' }}
  </div>
</template>

<script>
  export default {
    name: 'flag',
    props: {
      iso: String,
      isBet: Boolean,
      size: String // Accepted: 'tiny', 'small', 'medium', 'large'
    }
  }
</script>
