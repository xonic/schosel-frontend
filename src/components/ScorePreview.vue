<template>
  <router-link :to="{ name: score.challenge_route, params: { id: score.challenge_id + '' } }" :class="'score-preview ' + score.challenge_route" v-if="score">

    <div class="score-preview__header">
      <img v-if="iconPaths.length":src="getURL(score.challenge_id - 1)" class="score-preview__icon" />
      <div class="score-preview__title">
        <div class="score-preview__name h3">
          {{ score.name }}
          <div class="score-preview__description">
            {{ score.description }}
          </div>
        </div>
      </div>
      <div class="score-preview__chevron">
        <img src="../assets/img/icons/i--chevron-right.svg" />
      </div>
    </div>
    <ul v-if="(liveMatches && liveMatches.length) || (overMatches && overMatches.length)" class="score-preview__users">
      <li v-if="score && score.users" v-for="(user, i) in score.users"
        :class="i === 1 ? 'score-preview__user score-preview__user--current' : 'score-preview__user'">
        <div v-if="user && user.scores" class="score-preview__rank">
          {{ user.scores[challengeId].rank }}.
        </div>
        <div v-if="user && user.avatar" class="score-preview__avatar">
          <avatar :src="user.avatar" size="tiny" />
        </div>
        <div v-if="user && user.name" class="score-preview__user-name">
          {{ user.name }}
          <span v-if="i === 1" class="text--gray-20 text--tiny">(You)</span>
        </div>
        <div v-if="user && user.scores" class="score-preview__score">
          {{ user.scores[challengeId].points.toFixed(2) }} pts
        </div>
      </li>
    </ul>
  </router-link>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Avatar from '@/components/Avatar.vue'

  export default {
    name: 'score-preview',
    props: {
      score: Object,
      challengeId: Number
    },
    components: {
      Avatar
    },
    computed: {
      ...mapGetters([
        'iconPaths',
        'loggedInUser',
        'liveMatches',
        'overMatches'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
