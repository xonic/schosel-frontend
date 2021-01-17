<template>
  <main>
    <div class="wrapper">
      <h1 class="h2 main__title">Users</h1>
      <ul v-if="allUsers.length">
        <li v-for="user in allUsers">
          <user-preview :user="user" />
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
