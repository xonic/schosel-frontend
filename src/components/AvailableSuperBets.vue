<template>
  <div class="available-superbets">
    <div class="text--small text--gray-20 text--center">Available Superbets</div>
    <ul v-if="loggedInUser" class="available-superbets__items">
      <li v-for="n in (maxSuperbets - loggedInUser.superbets_placed)" class="available-superbets__item">
        <super-bet :correct="true" />
      </li>
      <li v-for="n in this.loggedInUser.superbets_placed" class="available-superbets__item">
        <super-bet :correct="false" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SuperBet from '@/components/SuperBet'

  export default {
    name: 'available-superbets',
    components: {
      SuperBet
    },
    data () {
      return {
      }
    },
    mounted () {

      // Set current user
      // If allUsers hasn't been loaded from server,
      // do an async dispatch first
      if(!this.loggedInUser) {
        this.$store
        .dispatch('LOAD_STATUS')
        .then((response) => {
          this.availableSuperbets = this.maxSuperbets - this.loggedInUser.visible_superbets
        })
      }
      // Else it has already loaded and current user
      // still needs to be found and set
      else {
        this.availableSuperbets = this.maxSuperbets - this.loggedInUser.visible_superbets
      }
    },
    computed: {
      ...mapGetters([
        'maxSuperbets',
        'loggedInUser'
      ])
    }
  }
</script>
