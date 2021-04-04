<template>
  <main>
    <div id="profile" class="wrapper">
      <h1 class="h2 main__title">Profile</h1>
      <div v-if="loggedInUser" class="profile-form">
        <form @submit.prevent="onSubmit">
          <div class="avatar-selection">
            <div class="avatar-selection__inputs">
              <div class="input">
                <input type="text" id="firstName" v-model="firstName" placeholder="First Name">
              </div>
              <div class="input">
                <input type="text" id="lastName" v-model="lastName" placeholder="Last Name">
              </div>
            </div>
            <div class="avatar-selection__avatar">
              <img :src="avatar" size="large" />
            </div>
          </div>
          <div class="input">
            <input
                    type="email"
                    id="email"
                    v-model="email"
                     placeholder="Email">
          </div>
          <div class="submit">
            <button class="btn btn--primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../store'

  export default {
    name: 'profile',
    data () {
      return {
        error: null,
        firstName: '',
        lastName: '',
        email: '',
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUser',
        'avatarUrl',
        'allUsers'
      ]),
      avatar () {
        if(!this.loggedInUser.name.length) return
        return store.state.avatarUrl + this.firstName + " " + this.lastName.substring(0,1) + "."
      },
    },
    mounted () {

      // Set current user
      // If allUsers hasn't been loaded from server,
      // do an async dispatch first
      if(!this.loggedInUser) {
        this.$store
        .dispatch('LOAD_STATUS')
        .then((response) => {
          this.firstName = this.loggedInUser.first_name
          this.lastName = this.loggedInUser.last_name
          this.email = this.loggedInUser.email
        })
      }
      // Else it has already loaded and current user
      // still needs to be found and set
      else {
        this.firstName = this.loggedInUser.name.split(' ')[0]
        this.lastName = this.loggedInUser.name.split(' ')[1]
        this.email = this.loggedInUser.email
      }
    },
    methods: {
      onSubmit () {

      }
    }
  }
</script>
