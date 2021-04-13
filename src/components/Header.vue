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
        // menuItems: [
        //   {
        //     name: 'Logout',
        //     route: 'logout'
        //   }
        // ]
      }
    },
    // mounted () {
    //
    //   // Set current user
    //   // If allUsers hasn't been loaded from server,
    //   // do an async dispatch first
    //   if(!this.loggedInUser) {
    //     this.$store
    //     .dispatch('LOAD_STATUS')
    //     .then((response) => {
    //       this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
    //     })
    //   }
    //   // Else it has already loaded and current user
    //   // still needs to be found and set
    //   else {
    //     this.user = this.allUsers.find(user => user.user_id === parseInt(this.id, 10))
    //   }
    // },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'authenticated'
      ]),
      userMenuItems () {

        if(this.loggedInUser && this.loggedInUser.admin) {
          return [
            {
              name: 'UserAdmin',
              route: 'user-admin'
            },
            {
              name: 'Logout',
              route: 'logout'
            }
          ]
        }
        else {
          return [
            {
              name: 'Logout',
              route: 'logout'
            }
          ]
        }
      }
    }
  }
</script>
