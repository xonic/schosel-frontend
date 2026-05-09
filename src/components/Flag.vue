<template>
  <div
    :class="isBet ?
      `flag flag--${flagClass} flag--${size} flag--is-bet` :
      `flag flag--${flagClass} flag--${size}`">
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
    },
    computed: {
      flagClass() {
        // List of valid ISO codes that have corresponding flag files
        const validIsos = [
          'aut', 'bel', 'cro', 'cze', 'den', 'eng', 'fin', 'fra', 'ger',
          'hun', 'ita', 'mkd', 'ned', 'pol', 'por', 'rus', 'sco', 'svk',
          'esp', 'swe', 'sui', 'tur', 'ukr', 'wal', 'drw'
        ]
        
        // Return the ISO if it's valid, otherwise return 'default'
        return validIsos.includes(this.iso) ? this.iso : 'default'
      }
    }
  }
</script>
