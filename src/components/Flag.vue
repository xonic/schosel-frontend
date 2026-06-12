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
      size: String // Accepted: 'tiny', 'small', 'medium', 'large', 'xlarge'
    },
    computed: {
      flagClass() {
        // List of valid ISO codes that have corresponding flag files
        const validIsos = [
          'arg', 'aus', 'aut', 'bel', 'bih', 'bra', 'can', 'civ', 'cod', 'col', 'cpv',
          'cro', 'cuw', 'cze', 'den', 'alg', 'ecu', 'egy', 'eng', 'esp', 'fin', 'fra',
          'ger', 'gha', 'hai', 'hun', 'irn', 'irq', 'ita', 'jor', 'jpn', 'kor', 'mar',
          'mex', 'mkd', 'ned', 'nor', 'nzl', 'pan', 'pol', 'por', 'par', 'qat', 'rus',
          'ksa', 'sco', 'sen', 'sui', 'svk', 'swe', 'tun', 'tur', 'uru', 'usa', 'uzb',
          'wal', 'rsa', 'drw'
        ]
        
        // Convert ISO to lowercase for comparison
        const isoLower = this.iso ? this.iso.toLowerCase() : ''
        
        // Return the lowercase ISO if it's valid, otherwise return 'default'
        return validIsos.includes(isoLower) ? isoLower : 'default'
      }
    }
  }
</script>
