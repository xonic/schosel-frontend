<template>
  <router-link :to="{ name: score.challenge_route, params: { id: score.challenge_id + '' } }" :class="'score-preview ' + score.challenge_route">

    <div class="score-preview__header">
      <img :src="getURL(score.challenge_id - 1)" class="score-preview__icon" />
      <div class="score-preview__title">
        <div class="score-preview__name">
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
    <ul class="score-preview__users">
      <li v-for="user in score.users"
        :class="user.logged_in ? 'score-preview__user score-preview__user--current' : 'score-preview__user'">
        <div class="score-preview__rank">
          {{ user.rank }}.
        </div>
        <div class="score-preview__avatar">
          <avatar :src="user.avatar" size="tiny" />
        </div>
        <div class="score-preview__user-name">
          {{ user.name }}
          <span v-if="user.logged_in" class="text--gray-20 text--tiny">(You)</span>
        </div>
        <div class="score-preview__score">
          {{ user.score.toFixed(2) }} pts
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
      score: Object
    },
    components: {
      Avatar
    },
    computed: {
      ...mapGetters([
        'iconPaths'
      ])
    },
    methods: {
      getURL(index) {
        return require(`../assets/img/icons/${this.iconPaths[index]}`)
      }
    }
  }
</script>
