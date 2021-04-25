<template>
  <main class="users">
    <div class="wrapper">
      <h1 class="h2 main__title">You</h1>
      <user-preview :user="loggedInUser" v-if="loggedInUser" />
      <h2 class="h3 main__title">Everybody else</h2>
      <ul v-if="allUsers.length && loggedInUser">
        <li v-for="user in usersByReward">
          <user-preview v-if="user.user_id !== loggedInUser.user_id" :user="user" />
        </li>
      </ul>
      <div v-else class="blankslate">
        <div class="blankslate__avatar">
          <avatar :src="avatarUrl + Math.random()" size="xlarge" />
        </div>
        <div class="blankslate__text">No users have paid yet</div>
      </div>
    </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import UserPreview from '@/components/UserPreview'

export default {
  name: 'users',
  components: {
    Avatar,
    UserPreview
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser',
      'avatarUrl'
    ]),
    usersByReward() {
      if(!this.allUsers) return []

      return this.allUsers.sort((a, b) => {

        if(a.reward === b.reward) {
          return a.name.localeCompare(b.name)
        }
        else {
          return (a.reward > b.reward) ? 1 : -1
        }
      })
    }
  }
}
</script>
