<template>
  <header :class="loggedInUser ? 'header' : 'header header--external'">
    <div class="wrapper">
      <logo />
      <nav-main v-if="authenticated" />
      <div v-if="loggedInUser" class="player-menu">
        <popover :items="userMenuItems">
          <avatar :src="loggedInUser.avatar" />
          <!-- <div class="player-menu__name">
            {{ loggedInUser.name }}
          </div> -->
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
        'authenticated'
      ])
    },
  }
</script>
