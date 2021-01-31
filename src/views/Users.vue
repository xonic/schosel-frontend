<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Users</h1>
      <ul v-if="allUsers.length">
        <li v-if="loggedInUser">
          <user-preview :user="loggedInUser" />
        </li>
        <li v-for="user in allUsers">
          <user-preview v-if="user.user_id !== loggedInUser.user_id" :user="user" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import UserPreview from '@/components/UserPreview.vue'

export default {
  name: 'users',
  components: {
    Avatar,
    UserPreview
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'loggedInUser'
    ])
  }
}
</script>
