<template>
  <main>
    <h1>Users</h1>
    <ul v-if="allUsers.length">
      <li v-for="user in allUsers">
        <router-link :to="{ name: 'user', params: { id: user.user_id + '' } }">
          <div>
            <img :src="user.avatar" width="48"/>
          </div>
          <div>
            <div>
              {{ user.name }}
            </div>
            <ul>
              <li v-for="(score, index) in user.scores">
                <img :src="getURL(index)" />
                <div>
                  {{ score.name }}
                </div>
                <div>
                  {{ score.score }}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img src="../assets/img/icons/i--chevron-right.svg" />
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'users',
  computed: {
    ...mapGetters([
      'allUsers',
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
