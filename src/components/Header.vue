<template>
  <header class="header">
    <div class="wrapper header__grid">
      <logo />
      <nav-main v-if="authenticated" />
      <div v-if="loggedInUser" class="player-info">
        <div v-if='loggedInUser.name' class="player-info__name">
          {{ loggedInUser.name }}
        </div>
        <popover :items="userMenuItems">
          <avatar :src="loggedInUser.avatar" />
        </popover>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from '@/components/Logo.vue'
  import NavMain from '@/components/NavMain.vue'
  import Popover from '@/components/Popover.vue'
  import Avatar from '@/components/Avatar.vue'

  export default {
    name: 'schosel-header',
    components: {
      Logo,
      NavMain,
      Popover,
      Avatar
    },
    data () {
      return {
        showMorePopover: false,
        userMenuItems: [
          {
            name: 'Profile',
            route: 'profile'
          },
          {
            name: 'Help',
            route: 'help'
          },
          {
            name: 'Logout',
            route: 'logout'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'authenticated',
      ])
    },
  }
</script>
