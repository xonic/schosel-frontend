<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Users</h1>
      <ul v-if="allUsers.length">
        <li v-for="user in allUsers">
          <router-link :to="{ name: 'user', params: { id: user.user_id + '' } }" class="user-preview">
            <div class="user-preview__avatar">
              <avatar :src="user.avatar" size="large" />
            </div>
            <div class="user-preview__body">
              <div class="user-preview__name">
                {{ user.name }}
                <span v-if="user.user_id === loggedInUser.user_id" class="text--small text--gray-20">(You)</span>
              </div>
              <ul class="user-preview__ranks">
                <li v-for="(score, index) in user.scores" class="user-preview__rank">
                  <img :src="getURL(index)" class="user-preview__icon" />
                  {{ score.rank }}.
                </li>
              </ul>
            </div>
            <div class="user-preview__chevron">
              <img src="../assets/img/icons/i--chevron-right.svg" />
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar.vue'

export default {
  name: 'users',
  components: {
    Avatar
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
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
