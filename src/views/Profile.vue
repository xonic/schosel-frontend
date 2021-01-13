<template>
  <div id="profile" class="profile">
    <h1>Profile</h1>
<<<<<<< HEAD
    <div class="profile-form">
=======
    <div v-if="loggedInUser" class="profile-form">
>>>>>>> style
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="firstName">First Name</label>
          <input
                  type="text"
                  id="firstName"
                  v-model="firstName">
        </div>
        <div class="input">
          <label for="lastName">Last Name</label>
          <input
                  type="text"
                  id="lastName"
                  v-model="lastName">
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="submit">
          <button type="submit">Save</button>
          <p v-if="error">{{ error }}</p>
        </div>
        <img :src="avatar" />
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile',
    data () {
      return {
        error: null,
<<<<<<< HEAD
<<<<<<< HEAD
        email: ''
=======
        email: 'TODO: Implement this'
>>>>>>> style
=======
        email: 'TODO: Implement this'
>>>>>>> style
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
<<<<<<< HEAD
      setTimeout(() => {
        this.email = this.allUsers.find(user => user.user_id === this.loggedInUser.user_id).email
      }, 300)
=======
      // setTimeout(() => {
      //   this.email = this.allUsers.find(user => user.user_id === this.loggedInUser.user_id).email
      // }, 3000)
>>>>>>> style
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
