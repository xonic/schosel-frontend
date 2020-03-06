<template>
  <ul class="rank-chart">
    <li class="rank-chart__item" v-for="rank in relativeRanking">
      <div class="rank-chart__title">
        {{ rank.name }}
      </div>
      <svg class="rank-chart__img" viewBox="0 0 24 200">
        <mask id="roundedBar">
          <rect rx="12" width="24" height="200" fill="#fff" />
        </mask>

        <rect width="24" height="200" fill="#bada55" mask="url(#roundedBar)" />
        <rect width="24" :height="rank.relativeRank * 2" fill="#444" mask="url(#roundedBar)" />
      </svg>
      {{ rank.rank }}.
    </li>
  </ul>
</template>

<script>

export default {
  name: 'rank-chart',
  props: {
    ranking: Array,
    /*
    ranking: [
      {
        name: String,
        rank: Number,
        points: Number,
      },
      // remaining rankings...
    ]
    */
    maxRank: Number // Equals allUsers.length
  },
  computed: {
    relativeRanking() {
      return this.ranking.map(ranking => {
        return {
          name: ranking.name,
          rank: ranking.rank,
          // Calculate relative rank e. g. 5th of 20 players === 5 / 20 === 0,25
          relativeRank: (ranking.rank - 1) / (this.maxRank - 1) * 100, // * 100 to get full percentages, rank - 1 to normalize to 0
        }
      })
    }
  }
}
</script>
