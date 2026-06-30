<template>
  <component :is="to ? 'router-link' : 'div'" :to="to" class="champion-bet-card">
    <flag :iso="champion.short_name" />
    <div class="champion-bet-card__info">
      <div class="champion-bet-card__label">Champion Bet</div>
      <div class="champion-bet-card__name">
        {{ champion.name }}<span v-if="champion.odds" class="champion-bet-card__pts"> {{ champion.odds.toFixed(1) }} pts</span><span v-if="correct" class="champion-bet-card__correct"> ✓</span>
      </div>
    </div>
    <div v-if="to" class="champion-bet-card__chevron">
      <img src="../assets/img/icons/i--chevron-right.svg" />
    </div>
  </component>
</template>

<script>
import Flag from '@/components/Flag'

export default {
  name: 'champion-bet-card',
  components: { Flag },
  props: {
    champion: { type: Object, required: true },
    to: { type: [String, Object], default: null },
    correct: { type: Boolean, default: false }
  }
}
</script>
