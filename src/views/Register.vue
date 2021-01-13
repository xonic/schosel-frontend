<template>
  <div id="register">
    <h1>Register</h1>
    <div class="register-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName">
        </div>
        <div class="input">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName">
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
          <router-link :to="{ name: 'login' }">Login</router-link>
          <p v-if="error">{{ error }}</p>
        </div>
        <img :src="avatar" />
      </form>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import store from '../store'

  export default {
    name: 'register',
    data() {
      return {
        error: null,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    },
    computed: {
      avatar() {
        if (!this.firstName.length && !this.lastName.length) return
        return store.state.avatarUrl + this.firstName + " " + this.lastName
      }
    },
    methods: {
      onSubmit() {

        if (!this.firstName || !this.lastName || !this.email || !this.password) {
          this.error = 'Please fill all fields.'
          return
        }

        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('REGISTER', formData)
      }
    }
  }
</script>
