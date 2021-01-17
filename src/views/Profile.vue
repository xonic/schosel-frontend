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

  export default {
    name: 'profile',
    data () {
      return {
        error: null,
        email: 'TODO: Implement this'
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
        return this.avatarUrl + this.loggedInUser.firstName + " " + this.loggedInUser.lastName
      },
      firstName () {
        return this.loggedInUser.name.split(' ')[0]
      },
      lastName () {
        return this.loggedInUser.name.split(' ')[1]
      }
    },
    mounted () {
      // setTimeout(() => {
      //   this.email = this.allUsers.find(user => user.user_id === this.loggedInUser.user_id).email
      // }, 3000)
    },
    methods: {
      onSubmit () {
        console.log(this.allUsers)

        // if(!this.firstName || !this.lastName || !this.email || !this.password) {
        //   this.error = 'Please fill all fields.'
        //   return
        // }
        //
        // const formData = {
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   email: this.email,
        //   password: this.password,
        // }
        // this.$store.dispatch('REGISTER', formData)
      }
    }
  }
</script>
