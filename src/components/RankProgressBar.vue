<template>
  <div v-if="switchLayout">
    <svg class="rank-progress-bar" viewBox="0 0 200 24">
      <mask id="roundedBar">
        <rect rx="12" width="200" height="24" fill="#fff" />
      </mask>
      <rect width="200" height="24" fill="#bada55" mask="url(#roundedBar)" />
      <rect :width="relativeRank * 2" height="24" fill="#444" mask="url(#roundedBar)" />
    </svg>
  </div>
  <div v-else>
    <svg class="rank-progress-bar" viewBox="0 0 24 200">
      <mask id="roundedBar">
        <rect rx="12" width="24" height="200" fill="#fff" />
      </mask>
      <rect width="24" height="200" fill="#bada55" mask="url(#roundedBar)" />
      <rect width="24" :height="relativeRank * 2" fill="#444" mask="url(#roundedBar)" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'rank-progress-bar',
    props: {
      rank: Number,
      maxRank: Number, // Equals allUsers.length,
      switchLayout: Boolean // Determines whether we render vertically or horizontally
    },
    computed: {
      relativeRank() {
        // Calculate relative rank e. g. 5th of 20 players === 5 / 20 === 0,25
        return (this.rank - 1) / (this.maxRank - 1) * 100
        // * 100 to get full percentages, rank - 1 to normalize to 0
      }
    },
  }
</script>
